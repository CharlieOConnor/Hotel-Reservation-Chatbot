var current_date = new Date();
var today = current_date.toISOString().split('T')[0];
var pastYear = new Date().getFullYear() + 1;
current_date.setFullYear(pastYear);
oneYearFuture = current_date.toISOString().split('T')[0];

var calendar = document.createElement("INPUT");
calendar.setAttribute("type", "date");
calendar.setAttribute("min", today);
calendar.setAttribute("max", oneYearFuture);
calendar.setAttribute("id" , "fromDate");


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
	document.getElementById("textInput").disabled = true;	
	$("#chatbox").append('<p class="userText"><span>' + a + '</span></p>');	
	showUserTime();
	scrollView();
	botThinking();
	removeBotThoughts();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>Please select a rating between 1 and 5 stars.</span></p>'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	setTimeout( () => { document.getElementById("rate").style.display = "block"; }, 1100);
	scrollView();
	$("#textInput").val('').focus();
	setTimeout(() => { 	document.getElementById("textInput").disabled = false; }, 1100);
	setTimeout(() => { 	document.getElementById("textInput").focus(); }, 1100);
}

function botRateChatResponse() {
	setTimeout(() => { document.getElementById("rate").style.display = "none"; }, 500);
	botThinking();
	removeBotThoughts();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>Thank you for submitting your rating.</span></p>'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
}

function reportChat(a) {
	document.getElementById("textInput").disabled = true;	
	$("#chatbox").append('<p class="userText"><span>' + a + '</span></p>');	
	showUserTime();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>If you have taken issue with how our chatbot has conducted itself, please send your complaint through to complaintsdepartment@donvalleyhotel.co.uk</span></p>'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	botThinking();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	//$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
	$("#textInput").val('').focus();
	setTimeout(() => { 	document.getElementById("textInput").disabled = false; }, 1100);
	setTimeout(() => { 	document.getElementById("textInput").focus(); }, 1100);
}

function bookingRelatedIssue(a) {
	$("#chatbox").append('<p class="userText"><span>' + a.innerHTML + '</span></p>');	
	showUserTime();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>If you have an issue with your booking, you can call us on 01426 11178 or email us at customerservice@donvalleyhotel.co.uk</span></p>'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	botThinking();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
}

function travelOptions(a) {
	$("#chatbox").append('<p class="userText"><span>' + a.innerHTML + '</span></p>');	
	showUserTime();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5671.128691959641!2d-0.08917902132260014!3d51.52505312433105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca6040c11cd%3A0x73bae2a6535adb4f!2sOld%20Street!5e0!3m2!1sen!2suk!4v1649541470737!5m2!1sen!2suk" width="300" height="225" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText">Our hotel is located within the Finsbury area of London and can be accessed by tube and bus links.</p>'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	botThinking();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
}

function offersAndDeals(a) {
	$("#chatbox").append('<p class="userText"><span>' + a.innerHTML + '</span></p>');	
	showUserTime();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"></image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText">The following is a list of our offers.</p>'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	setTimeout(() => { $("#chatbox").append('<p id="images" class="botText"><span id="room_title_text">Triple Room</span><image id="room_image" src="../static/images/triple_room.jpg"></image><button type="button" onclick="">Book Now!</button>Book this room in the next 7 days to get 20% off!</p>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p id="images" class="botText"><span id="room_title_text">Twin Room</span><image id="room_image" src="../static/images/twin_room.jpg"></image><button type="button" onclick="">Book Now!</button>Book this room in the next 3 days to get 15% off!</p>'); }, 1100);
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	botThinking();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
}

function bookARoom(a) {
	$("#chatbox").append('<p class="userText"><span>' + a.innerHTML + '</span></p>');	
	showUserTime();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>Please enter your information below ->'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	botThinking();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollView();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
	removeBotThoughts();
	//setTimeout(() => { $("#chatbox").append(calendar); }, 1100);
	setTimeout(() => { $("#chatbox").append('<form action="action_to_perform_after_submission" method = "POST"><p>Field1 <input type = "text" name = "Field1_name" /></p><p>Field2 <input type = "text" name = "Field2_name" /></p><p>Field3 <input type = "text" name = "Field3_name" /></p><p><input type = "submit" value = "submit" /></p></form>'); }, 1100);
}
