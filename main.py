import nltk
import numpy as np
import random
import string # to process standard python strings
from sklearn.feature_extraction.text import TfidfVectorizer # Generate response
from sklearn.metrics.pairwise import cosine_similarity
#from nltk.chat.util import Chat, reflections
import warnings
warnings.filterwarnings("ignore")
from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
from nltk.tokenize import word_tokenize

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("main.html")

@app.route("/main")
def main():
# Reading in the data
    f=open('chatbot.txt','r',errors = 'ignore')
    raw=f.read()
    #print(raw)
    raw=raw.lower()# converts to lowercase
    sent_tokens = [p for p in raw.split('\n')]# converts to list of sentences 
    word_tokens = nltk.word_tokenize(raw)# converts to list of words

    # Pre-processing the raw text to turn similar words into their base stem form that can be looked up in a dictionary
    lemmer = nltk.stem.WordNetLemmatizer()
    # WordNet is a semantically-oriented dictionary of English included in NLTK.
    def LemTokens(tokens):
        return [lemmer.lemmatize(token) for token in tokens]
    remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
    def LemNormalize(text):
        return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

    # Keyword matching
    GREETING_INPUTS = ["hello", "hi", "greetings", "sup", "what's up","hey",]
    GREETING_RESPONSES = ["Hello! I'm your hotel assistant. Ask me a question."]
    def greeting(sentence):
     
        for word in sentence.split():
            if word.lower() in GREETING_INPUTS:
                return random.choice(GREETING_RESPONSES)

    # Generate response
    def response(message):
        robo_response=''
        
        TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
        tfidf = TfidfVec.fit_transform(sent_tokens)
        vals = cosine_similarity(tfidf[-1], tfidf)
        idx=vals.argsort()[0][-2]
        flat = vals.flatten()
        flat.sort()
        req_tfidf = flat[-2]
        if(req_tfidf==0):
            robo_response=robo_response+"I am sorry, I didn't understand you. Please retry your query with a little more detail."
            return robo_response
        else:
            final_message = '. '.join(map(lambda s: s.strip().capitalize(), sent_tokens[idx].split('.')))
            robo_response = robo_response+final_message
            return robo_response
    
    message = request.args["user_input"]
    
    # Feed lines to bot based on user input
    flag=True
    while(flag == True):
        message = message.lower()
        if('bye' not in message):
            if(message == 'thanks' or message == 'thank you' ):
                flag=False
                return "You are welcome."
            else:
                if(greeting(message)!= None):
                    return greeting(message)
                else:
                    sent_tokens.append(message)
                    word_tokens = word_tokens+nltk.word_tokenize(message)
                    final_words = list(set(word_tokens))
                    return response(message)
        else:
            flag=False
            return "Bye! take care."

# Open the questions file and return it as a json file
@app.route("/questions")
def questions():
    f=open('questions.txt','r',errors = 'ignore')
    raw=f.read()
    sent_tokens = [p for p in raw.split('\n')]
    return jsonify(sent_tokens)

if __name__ == "__main__":
    app.run(use_reloader=True, debug=True)
    
