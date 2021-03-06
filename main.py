import nltk
import random
import string
import pickle
import numpy as np
import json
import random
import csv

from keras.models import load_model
from flask import Flask, render_template, request, jsonify
from nltk.tokenize import word_tokenize

nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')

probability = 0
intent = ''
model = load_model('chatbot_model.h5')
intents = json.loads(open('intents.json').read())
words = pickle.load(open('words.pkl','rb'))
tags = pickle.load(open('tags.pkl','rb'))

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("main.html")

# Predict the intent of the user's message and return the response 
@app.route("/main")
def main():
    
    # Convert user input into array of words and lemmatize them
    def sanitizeSentence(message):
        lem = nltk.stem.WordNetLemmatizer()
        list_of_words = nltk.word_tokenize(message)
        list_of_words = [lem.lemmatize(word.lower()) for word in list_of_words]
        return list_of_words

    # Return a bag of words array, 1 for each word in the bag that exists in the sentence, 0 otherwise
    def bagOfWords(message, words):
        bag = [0]*len(words)
        
        for list_word in list_of_words:
            for count, word in enumerate(words):
                if word == list_word: 
                    bag[count] = 1
        return(np.array(bag))

    # Predict responses and sort by probability
    def predictIntent(message, model):
        global probability
        global intent

        prediction = model.predict(np.array([bag_of_words]))[0]
        results = [[intent,probability] for intent, probability in enumerate(prediction)]
        results.sort(key=lambda intents: intents[1], reverse=True)
        return_list = []
        
        for result in results:
            return_list.append({"intent": tags[result[0]], "probability": str(result[1])})
            
        probability = float(return_list[0]['probability'])
        intent = return_list[0]['intent']
        return return_list

    # Return response based on level of probability
    def getResponse(ints_and_probs, intents_json):
        global intent
        tag = ints_and_probs[0]['intent']
        list_of_intents = intents_json['intents']
        print("Probability of correct intent is: " + str(probability))
        
        if probability < 0.7 or intent == "":
            intent = 'gibberish'
            return "I am sorry, I didn't understand you. Please retry your query with a little more detail."
        
        for i in list_of_intents:
            if(i['tag']== tag):
                result = random.choice(i['responses'])
                break
            
        return result

    message = request.args["rawText"]
    
    list_of_words = sanitizeSentence(message)
    bag_of_words = bagOfWords(message, words)
    intent_and_probability = predictIntent(message, model)
    response = getResponse(intent_and_probability, intents)
    return jsonify(response, intent)

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
    if len(rooms) == 0:
        return "Sorry there are no rooms for your party available for those dates. Please try some other dates."
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
    lengthOfStay = request.args['lengthOfStay']
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
    
