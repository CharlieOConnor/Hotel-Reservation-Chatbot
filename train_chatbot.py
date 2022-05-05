from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import gradient_descent_v2
import nltk
import json
import pickle
import numpy as np
import random

words = []
tags = []
pattern_intent = []
training = []
lemmatizer = nltk.stem.WordNetLemmatizer()

with open('intents.json') as file:
    intents = json.load(file)

# split each 'pattern' into its individual words and build a corpus from it
def tokenize():
    for intent in intents['intents']:
        for pattern in intent['patterns']:

            # Tokenize the words in each pattern
            word = nltk.word_tokenize(pattern)          
            # Gradually combine the individual arrays (build a corpus)
            words.extend(word)
            # Create a tuple out of each pattern element and its registered intent
            pattern_intent.append((word, intent['tag']))
            # Add the tags in the json file to an array
            if intent['tag'] not in tags:
                tags.append(intent['tag'])

# Reduce each word to its base dictionary form
def lemmatize():
    global words
    global tags
    
    words = [lemmatizer.lemmatize(word.lower()) for word in words]
    words = sorted(list(set(words)))
    tags = sorted(list(set(tags)))

# Generate training data 
def trainingDataBuild():
    for patInt in pattern_intent:
        bag = []
        pattern_words = [lemmatizer.lemmatize(word.lower()) for word in patInt[0]]

        for word in words:
            if word in pattern_words:
                bag.append(1)
            else:
                bag.append(0)

        output_row = list(output)
        output_row[tags.index(patInt[1])] = 1
        training.append([bag, output_row])

# Train model on generated training data
def trainModel():
    global training
    
    random.shuffle(training)
    training = np.array(training, dtype=object)
    train_patterns = list(training[:,0])
    train_intents = list(training[:,1])

    # 3 layered model. First layer 128 neurons, second layer 96 and third equal to
    # the number of intents. Dropout present to prevent neurons from overfitting on data
    neuralNet = Sequential()
    neuralNet.add(Dense(128, input_shape=(len(train_patterns[0]),), activation='relu'))
    neuralNet.add(Dropout(0.6))
    neuralNet.add(Dense(96, activation='relu'))
    neuralNet.add(Dropout(0.5))
    neuralNet.add(Dense(len(train_intents[0]), activation='softmax'))

    # Model compiled with gradient descent for maximum accuracy for this use case
    neuralNet.compile(loss='categorical_crossentropy', optimizer="adam", metrics=['accuracy'])

    # Fitting and saving the model 
    fitting_model = neuralNet.fit(np.array(train_patterns), np.array(train_intents), shuffle=True, epochs=150, batch_size=16, verbose=1)
    neuralNet.save('chatbot_model.h5', fitting_model)

    # Print the final accuracy of the model
    scores = neuralNet.evaluate(train_patterns, train_intents)
    print("\n%s: %.2f%%" % ('Hotel Reservation Enquiry Accuracy: ', scores[1]*100))

tokenize()
lemmatize()

pickle.dump(words,open('words.pkl','wb'))
pickle.dump(tags,open('tags.pkl','wb'))
output = [0] * len(tags)

trainingDataBuild()
trainModel()
