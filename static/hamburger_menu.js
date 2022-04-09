function openMenu() {
	document.getElementById("hamburgerMenu").src = "../static/images/hamburger_menu_click.png";
	setTimeout(() => { 	document.getElementById("hamburgerMenu").src = "../static/images/hamburger_menu.png";}, 200);
	if (document.getElementById("myDropDown").style.display === "none") {
		document.getElementById("myDropDown").style.display = "grid";
	}
	else {
		document.getElementById("myDropDown").style.display = "none";
		document.getElementById("mainMenu").style.display = "none";
	}
}

function mainMenuSelect() {
	document.getElementById("mainMenu").style.display = "grid";
}

function submitSelection(a) {
	$("#textInput").val(a.innerHTML);
	getBotResponse();
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
}

function rateThisChat(a) {
	$('input[type=radio]').prop('checked',false); 
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	
	$("#chatbox").append('<p class="userText"><span>' + a.innerHTML + '</span></p>');	
	showUserTime();
	scrollView();
	botThinking();
	removeBotThoughts();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>Please select a rating between 1 and 5 stars.</span></p>'); }, 1100);
	showBotTime();
	setTimeout( () => { document.getElementById("rate").style.display = "block"; }, 1100);
	scrollView();
	setTimeout(() => { 	document.getElementById("textInput").focus();}, 1000);
}

function botRateChatResponse() {
	setTimeout(() => { document.getElementById("rate").style.display = "none"; }, 500);
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>Thank you for submitting your rating.</span></p>'); }, 1100);
	showBotTime();
	botThinking();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
}

function reportChat(a) {
	$("#chatbox").append('<p class="userText"><span>' + a.innerHTML + '</span></p>');	
	showUserTime();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>If you have taken issue with how our chatbot has conducted itself, please leave your comments below and they will be reported to the nearest available supervisor for inspection.</span></p>'); }, 1100);
	showBotTime();
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	botThinking();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
}