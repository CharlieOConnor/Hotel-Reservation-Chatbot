import nltk
import random
import string # to process standard python strings
from sklearn.feature_extraction.text import TfidfVectorizer # Generate response
from sklearn.metrics.pairwise import cosine_similarity
import warnings
from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
from nltk.tokenize import word_tokenize
import pickle
import numpy as np
from keras.models import load_model
import json
import random
import csv

model = load_model('chatbot_model.h5')

probability = 0
intent = ''

intents = json.loads(open('intents.json').read())
words = pickle.load(open('words.pkl','rb'))
classes = pickle.load(open('classes.pkl','rb'))

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("main.html")

@app.route("/main")
def main():
    # Reading in the data
    def clean_up_sentence(sentence):
        lemmer = nltk.stem.WordNetLemmatizer()
        # tokenize the pattern - split words into array
        sentence_words = nltk.word_tokenize(sentence)
        # stem each word - create short form for word
        sentence_words = [lemmer.lemmatize(word.lower()) for word in sentence_words]
        return sentence_words

    # return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
    def bow(sentence, words, show_details=True):
        # tokenize the pattern
        sentence_words = clean_up_sentence(sentence)
        # bag of words - matrix of N words, vocabulary matrix
        bag = [0]*len(words)  
        for s in sentence_words:
            for i,w in enumerate(words):
                if w == s: 
                    # assign 1 if current word is in the vocabulary position
                    bag[i] = 1
                    if show_details:
                        print ("found in bag: %s" % w)
        return(np.array(bag))

    def predict_class(sentence, model):
        global probability
        global intent

        p = bow(sentence, words,show_details=False)
        res = model.predict(np.array([p]))[0]
        results = [[i,r] for i,r in enumerate(res)]
        # sort by strength of probability
        results.sort(key=lambda x: x[1], reverse=True)
        return_list = []
        for r in results:
            return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
        probability = float(return_list[0]['probability'])
        intent = return_list[0]['intent']
        return return_list

    def getResponse(ints, intents_json):
        global intent
        tag = ints[0]['intent']
        list_of_intents = intents_json['intents']
        print(probability)
        if probability < 0.3 or intent == "":
            intent = 'gibberish'
            return "I am sorry, I didn't understand you. Please retry your query with a little more detail."
        for i in list_of_intents:
            if(i['tag']== tag):
                result = random.choice(i['responses'])
                break
        return result

    def chatbot_response(msg):
        ints = predict_class(msg, model)
        res = getResponse(ints, intents)
        return res

    message = request.args["rawText"]
    return jsonify(chatbot_response(message), intent)

# Open the questions file and return it as a json array
@app.route("/questions")
def questions():
    f=open('questions.txt','r',errors = 'ignore')
    raw=f.read()
    sent_tokens = [p for p in raw.split('\n')]
    return jsonify(sent_tokens)

# Check if a room is available
@app.route("/room_availability")
def room_availability():
    rooms = []
    rowNum = 0
    num_people = request.args["people_value"]
    with open('hotel_bookings_dataset.csv', mode='r', newline='') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            if row[0] == "Available" and not any(row[3] in sublst for sublst in rooms) and num_people <= row[4]:
                rooms.append([row[3], row[4], row[5], rowNum])
            rowNum += 1
    rooms.sort(key=lambda x: x[1])
    return jsonify(rooms)
                
# Generate reference for a room
@app.route("/generate_reference")
def generate_reference():
    lines = ""
    reference_list = []
    num_list = "".join([str(random.randint(0,9)) for i in range(3)])
    num_list2 = "".join([str(random.randint(0,9)) for i in range(3)])
    letter_list = "".join([random.choice(string.ascii_uppercase) for i in range(6)])
    pending_reference = num_list + "-" + letter_list + "-" + num_list2

    startDate = request.args['startDate']
    lengthOfStay = request.args['length_of_stay']
    rowNum = int(request.args['rowNum'])

    with open('hotel_bookings_dataset.csv', mode='r', newline='') as csv_file:
        csv_reader = csv.reader(csv_file)
        lines = list(csv_reader)
        for row in csv_reader:
            reference_list.append(row)
            
    if any(pending_reference in sublst for sublst in reference_list):
        generate_reference()
    else:
        lines[rowNum][0] = "Reserved"
        lines[rowNum][1] = startDate
        lines[rowNum][2] = lengthOfStay
        lines[rowNum][6] = pending_reference
        with open('hotel_bookings_dataset.csv', mode='w', newline='') as f:
            thewriter = csv.writer(f)
            thewriter.writerows(lines)
            
        return pending_reference

if __name__ == "__main__":
    app.run(use_reloader=False, debug=True, host="0.0.0.0")
    
