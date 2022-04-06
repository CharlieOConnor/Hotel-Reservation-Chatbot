var room_list = {
"single" : 45,
"double" : 55,
"twin" : 55,
"triple" : 65,
"quad" : 70
};

function getBotResponse() {
	var rawText = $("#textInput").val();																// Get the user input from the textarea
	var userHtml = '<p class="userText"><span>' + rawText + " " + $(window).height() + " " + $(window).width() +'</span></p>';	//Assign that value to a new variable
	var botThinking1 = '<span id="wave"><span class="dot one"></span></span>';
	var botThinking2 = '<span id="wave"><span class="dot two"></span></span>';
	var botThinking3 = '<span id="wave"><span class="dot three"></span></span>';
	
	if (rawText !== "") {
		document.getElementById("textInput").disabled = true;											// Temporarily disable text area until response is posted by bot
		$("#textInput").val("");																		// Reset the text input field contents
		$("#chatbox").append(userHtml);
		$("#chatbox").append('<span id="time-user">' + new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '</span>');
		document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});		// Keeps the user field in view
		$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
		/*$.get(bot_function_dict[counter], { user_input: rawText }).done(function(data) {	*/			// Make call to main.py, pass the user's response to the right function with bot_function_dict
			$.get("/main", { user_input: rawText }).done(function(data) {
			$("#chatbox").append(botThinking1, botThinking2, botThinking3);										
			setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);			// Remove 'thinking' dots when bot messaged is posted
			setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);
			setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);
			var botHtml = '<p class="botText"><span>' + data + '</span></p>';
			setTimeout(() => { $("#chatbox").append(botHtml); }, 1100);
			setTimeout(() => { $("#chatbox").append('<span id="time-bot">' + new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '</span>'); }, 1100);
			document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});			// A second instance to prevent glitching
			setTimeout(() => { $("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100); }, 1100);
			document.getElementById("textInput").disabled = false;												// Enable the text field and put the user's cursor inside for the next input
			setTimeout(() => { 	document.getElementById("textInput").focus();}, 1000);
		}
		);
	}
}

$("#textInput").keypress(function(event) {
	if(event.which == 13) { 
		getBotResponse()
		$(this).val('').focus();  
		return false;
	}
});

function submit_input() {
	document.getElementById("buttonInput").style.backgroundColor = "#6bbf6b";
	setTimeout(() => { document.getElementById("buttonInput").style.backgroundColor = "#90EE90";}, 150);
	getBotResponse();
}

function open_menu() {
	document.getElementById("hamburgerMenu").src = "../static/images/hamburger_menu_click.png";
	setTimeout(() => { 	document.getElementById("hamburgerMenu").src = "../static/images/hamburger_menu.png";}, 200);
	document.getElementById("myDropDown").classList.toggle("show");
}

function submit_selection(a) {
	$("#textInput").val(a.innerHTML);
	getBotResponse();
	document.getElementById("myDropDown").classList.toggle("show");
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