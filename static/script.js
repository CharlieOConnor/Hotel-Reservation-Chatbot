var room_list = {
"single" : 45,
"double" : 55,
"twin" : 55,
"triple" : 65,
"quad" : 70
};

// When a new message is sent to the chatbox element, scroll to the bottom
function scrollView() {
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	setTimeout(() => { $("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100); }, 1100);
}

// Display the time a bot message was sent
function showBotTime() {
	setTimeout(() => { $("#chatbox").append('<span id="time-bot">' + new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '</span>'); }, 1100);
}

// Display the time a user message was sent
function showUserTime() {
	$("#chatbox").append('<span id="time-user">' + new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '</span>');
}

// Display 'thinking' dots when bot is considering its response.
function botThinking() {
	var botThinking1 = '<span id="wave"><span class="dot one"></span></span>';
	var botThinking2 = '<span id="wave"><span class="dot two"></span></span>';
	var botThinking3 = '<span id="wave"><span class="dot three"></span></span>';
	$("#chatbox").append(botThinking1, botThinking2, botThinking3);		
}

// Remove 'thinking' dots when bot messaged is posted
function removeBotThoughts() {
	setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);			
	setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);
	setTimeout(() => { document.getElementById('wave').removeAttribute('id');}, 1000);
}

// Retrieve bot response from associated text file
function getBotResponse() {
	var rawText = $("#textInput").val();																// Get the user input from the textarea
	var userHtml = '<p class="userText"><span>' + rawText + '</span></p>';	//Assign that value to a new variable
	//var userHtml = '<p class="userText"><span>' + rawText + " " + $(window).height() + " " + $(window).width() +'</span></p>';
	
	if (rawText !== "") {
		document.getElementById("textInput").disabled = true;											// Temporarily disable text area until response is posted by bot
		$("#textInput").val("");																		// Reset the text input field contents
		$("#chatbox").append(userHtml);
		showUserTime(); 																				// Current time appended to each message
		scrollView();																					// Keeps the user field in view
		$.get("/main", { user_input: rawText }).done(function(data) {									// Make call to main.py, pass the user's response to the right function with bot_function_dict
			botThinking();						
			removeBotThoughts();
			setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
			var botHtml = '<p class="botText"><span>' + data + '</span></p>';
			setTimeout(() => { $("#chatbox").append(botHtml); }, 1100);
			setTimeout(() => { playMessageSent(); }, 400);
			showBotTime();
			scrollView();
			document.getElementById("textInput").disabled = false;												// Enable the text field and put the user's cursor inside for the next input
			setTimeout(() => { 	document.getElementById("textInput").focus();}, 1000);
		}
		);
	}
}

// Activate the getBotResponse() function if the send message button is selected
$("#textInput").keypress(function(event) {
	if(event.which == 13) { 
		getBotResponse()
		$(this).val('').focus();  
		return false;
	}
});

function submitInput() {
	document.getElementById("buttonInput").style.backgroundColor = "#6bbf6b";
	setTimeout(() => { document.getElementById("buttonInput").style.backgroundColor = "#90EE90";}, 150);
	getBotResponse();
}

// A list of the auto-complete questions in stock, retieved from the main.py as a list
$(function() {
	var questions = "";
	$.get("/questions").done(function(data) {
		questions = data;
		$("#textInput").autocomplete({
			source: questions,
			minLength: 2,
			delay: 300,
			position: { my : "left bottom", at: "left top" }
		});
	});
});