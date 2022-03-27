from flask import Flask, render_template, Response, request, redirect, url_for
import random

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("main.html")

# Do you have a booking with one of our hotels?
@app.route("/have_booking")
def have_booking():
    message = request.args["user_input"]
    if "no" in message.lower():
        return "2"
    elif "yes" in message.lower():
        return "7"
    else:
        return "1"

# Would you like to check room availability?
@app.route("/room_availability")
def room_availability():
    message = request.args["user_input"]
    if "no" in message.lower():
        return "3"
    elif "yes" in message.lower():
        return "5"
    else:
        return "2"

# Do you have a complaint?
@app.route("/complaint")
def complaint():
    message = request.args["user_input"]
    if "no" in message.lower():
        return "11"
    elif "yes" in message.lower():
        return "9"
    else:
        return "3"

# There are available rooms. Would you like to book one?
@app.route("/available_rooms")
def available_rooms():
    message = request.args["user_input"]
    if "no" in message.lower():
        return "11"
    elif "yes" in message.lower():
        return "5"
    else:
        return "4"

# Please enter your dates:
@app.route("/enter_dates")
def enter_dates():
    return "10"

# No rooms are available for these dates. Would you like to try a different set?
@app.route("/no_available_rooms")
def no_available_rooms():
    message = request.args["user_input"]
    if "no" in message.lower():
        return "11"
    elif "yes" in message.lower():
        return "5"
    else:
        return "6"

# Are you already staying with us?
@app.route("/already_staying")
def already_staying():
    message = request.args["user_input"]
    if "no" in message.lower():
        return "3"
    elif "yes" in message.lower():
        return "8"
    else:
        return "7"

# Would you like to extend your stay?
@app.route("/extend_stay")
def extend_stay():
    message = request.args["user_input"]
    if "no" in message.lower():
        return "3"
    elif "yes" in message.lower():
        return "5"
    else:
        return "8"

# Please enter your complaint and we'll pass you onto a human operator
@app.route("/enter_complaint")
def enter_complaint():
    return "11"

# Please pick a room from the list below.
@app.route("/pick_room")
def pick_room():
    types_of_rooms = ["single", "double", "twin", "triple", "quad"]

    return "11"

if __name__ == "__main__":
    app.run(use_reloader=True, debug=True)


