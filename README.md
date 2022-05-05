# Hotel reservation chatbot

This a proof of concept web-based chatbot for making hotel bookings. 
It uses Python as its backend and a sequential Keras AI model to handle user queries and provide appropriate responses.

# Installation

1) Install Python if you don't have it already https://www.python.org/downloads/
   This project was built using 3.9.1 for reference
   
2) Go to https://pip.pypa.io/en/latest/user_guide/#requirements-files and open your terminal.

3) cd to whichever directory you downloaded the project to.

4) Use the command appropriate for your system and install everything in the included requirements.txt file

5) Run main.py to start the chatbot and navigate to the web address specified in your terminal e.g. http://10.6.12.127:5000

NOTE: The chatbot relies on the included hotel_bookings_dataset.csv file to check for available rooms. In the event you run out of rooms, just run data_generator.py to generate a new bookings dataset file.

# Features

- Make hotel reservations
- Ask hotel booking questions in natural english
- Hamburger menu for navigation
