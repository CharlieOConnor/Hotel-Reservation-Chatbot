var counter = "1";

var room_list = {
"single" : 45,
"double" : 55,
"twin" : 55,
"triple" : 65,
"quad" : 70
};

var bot_function_dict = {
"1" : "/have_booking",
"2" : "/room_availability",
"3" : "/complaint",
"4" : "/available_rooms",
"5" : "/enter_dates",
"6" : "/no_available_rooms",
"7" : "/already_staying",
"8" : "/extend_stay",
"9" : "/enter_complaint",
"10" : "/pick_room"
};

var bot_message_dict = {
	"1" : "Do you have a booking with one of our hotels?",
	"2" : "Would you like to check room availability?",
	"3" : "Do you have a complaint?",
	"4" : "There are available rooms. Would you like to book one?",
	"5" : "Please enter your dates: ",
	"6" : "No rooms are available for these dates. Would you like to try a different set?",
	"7" : "Are you already staying with us?",
	"8" : "Would you like to extend your stay?",
	"9" : "Please enter your complaint here and we\'ll pass you on to a human operator.",
	"10" : "Please pick a room from the list below.",
	"11" : "Thank you for using our service. We hope to see you again soon."
};

function getBotResponse() {
	var rawText = $("#textInput").val();
	var userHtml = '<p class="userText"><span>' + rawText + '</span></p>';
	var botThinking1 = '<span id="wave"><span class="dot one"></span></span>';
	var botThinking2 = '<span id="wave"><span class="dot two"></span></span>';
	var botThinking3 = '<span id="wave"><span class="dot three"></span></span>';
	$("#textInput").val(""); 																			//Reset the text input field contents
	$("#chatbox").append(userHtml);
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});			//Keeps the user field in view
	$.get(bot_function_dict[counter], { user_input: rawText }).done(function(data) {
		$("#chatbox").append(botThinking1, botThinking2, botThinking3);										
		setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);
		setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);
		setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);
		var botHtml = '<p class="botText"><span>' + bot_message_dict[data] + '</span></p>';
		setTimeout(() => { $("#chatbox").append(botHtml); }, 1100);
		
		if (data == "5") {
			document.getElementById('userInput').style.display = "none";
			document.getElementById('booking_calendar').style.display = "block";
			$(function() {
				$('input[name="user_calendar"]').daterangepicker();
				$('input[name="user_calendar"]').on('apply.daterangepicker', function(ev, picker) {
					getBotResponse();
				});
			});
		}
		else {
			document.getElementById('userInput').style.display = "block";
			document.getElementById('booking_calendar').style.display = "none";
		}

		if (data == "10") {
			document.getElementById('userInput').style.display = "none";
			document.getElementById('rooms').style.display = "block";
			let option = document.getElementById("rooms");
			option.addEventListener('change', function() {
				data = "11";
			  //$('#rooms :selected').text();
				getBotResponse();
			});
		}
		else {
			document.getElementById('rooms').style.display = "none";
		}

		document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});			// A second instance to prevent glitching
		counter = data;
	}
	);
}

$("#textInput").keypress(function(event) {
	if(event.which == 13) {
		getBotResponse();
	}
});

function check() {
	getBotResponse();
}

$(function() {
	var availableSubjects = [
		"What time is check-in/check-out?",
		"Is there room service?",
		"Is there a minimum age requirement to book a room?",
		"How do I submit a complaint?",
		"Can I extend my stay?",
		"Where is this hotel located?",
		"Why does the pricing change daily?",
		"What do I do in the event of a fire?",
		"My stay was unsatisfactory, can I request a refund?",
		"How many people to a room?",
		"What methods of payment do you accept?",
		"Will I receive confirmation of my booking?",
		"What amenities are included with your rooms?",
		"Do you have onsite parking?",
		"How close are the nearest shops?",
		"Can I amend/cancel my booking?",
		"Is the reception desk 24hrs?",
		"Are children welcome at the hotel?",
		"Are pets welcome at the hotel?",
		"Is this hotel wheelchair accessible?",
		"Do an rooms provide en-suite bathrooms?",
		"What is a single room?",
		"What is a double room?",
		"What is a twin room?",
		"What is a triple room?",
		"What is a quad room?",
		"Does the hotel have its own bar or restaurant?",
		"How can I contact the hotel directly?",
		"Can I leave my luggage with the hotel before check-in time?",
		"Can I make a booking on behalf of another person?"
	];
	$("#textInput").autocomplete({
		source: availableSubjects,
		minLength: 2,
		delay: 300,
		position: { my : "left bottom", at: "left top" }
	});
});

var xlsxRows = require('xlsx-rows');
var rows = xlsxRows('user-questions.xlsx');
console.dir(rows);