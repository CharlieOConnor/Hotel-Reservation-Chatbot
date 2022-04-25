var startDate;
var endDate;
var length_of_stay;
var rowNum;
var reference;

//Escape dangerous characters to prevent Html injection attacks
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

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

// Retrieve bot response
function getBotResponse(buttonName) {
	if ($("#textInput").val() !== "") {
		var rawText = escapeHTML($("#textInput").val());						// Get the user input from the textarea
	}
	else {
		var rawText = buttonName;												// Get the user input from the textarea
	}
	var userHtml = '<p class="userText"><span>' + rawText + '</span></p>';	//Assign that value to a new variable
	//var userHtml = '<p class="userText"><span>' + rawText + " " + window.innerHeight + " " + window.innerWidth +'</span></p>';
	
	document.getElementById("textInput").disabled = true;											// Temporarily disable text area until response is posted by bot
	$("#textInput").val("");																		// Reset the text input field contents
	$("#chatbox").append(userHtml);
	showUserTime(); 																				// Current time appended to each message
	scrollView();																					// Keeps the user field in view
	botThinking();	
	
	$.get("/main", { rawText }).done(function(data) {									// Make call to main.py, passing 'rawText' as the user's request and returning 'data' as the bot's answer
		removeBotThoughts();
		setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
		var botHtml = '<p class="botText"><span>' + data[0] + '</span></p>';
		
		if (data [1] !== "BookingEnquiry") {
			setTimeout(() => { $("#chatbox").append(botHtml); }, 1100);
		}
		
		if (data[1] === "rating") {															// data[1] is the intent, if the intent is of a certain category execute a specialized bot response function
			rateThisChat();
		}
		else if (data[1] === "issue") {
			bookingRelatedIssue();
		}
		else if (data[1] === "travel") {
			travelOptions();
		}
		else if (data[1] === "BookingEnquiry") {
			bookARoom(data[0]);
		}
		
		setTimeout(() => { playMessageSent(); }, 300);
		showBotTime();
	});
	scrollView();
	document.getElementById("textInput").disabled = false;												// Enable the text field and put the user's cursor inside for the next input
	setTimeout(() => { 	document.getElementById("textInput").focus();}, 1000);
}

// Activate the getBotResponse() function if the user selects the enter key
$("#textInput").keypress(function(event) {
	if(event.which == 13) { 
		getBotResponse();
	}
});

// Close hamburger menu if user clicks away from it
$(document).on('click', function(event){
    var container = $("#hamburgerMenu");
    if (!container.is(event.target) && 
        container.has(event.target).length === 0) 
    {
        closeMenu();
    }
});

// Activate the getBotResponse function if the send message button is selected
function submitInput() {
	document.getElementById("buttonInput").style.backgroundColor = "#6bbf6b";
	setTimeout(() => { document.getElementById("buttonInput").style.backgroundColor = "#90EE90";}, 150);
	if (rateChatStrings.includes($("#textInput").val().toLowerCase())) {
			rateThisChat($("#textInput").val());
			return;
	}
	else if (reportChatStrings.includes($("#textInput").val().toLowerCase())) {
			reportChat($("#textInput").val());
			return;
	}
	getBotResponse();
}

// A list of the auto-complete questions in stock, retrieved from main.py as a list
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