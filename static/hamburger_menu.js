// These variables place a 1 year limit on the daterangepicker element starting from today
var current_date = new Date();
var today = current_date.toISOString().split('T')[0];
var pastYear = new Date().getFullYear() + 1;
current_date.setFullYear(pastYear);
var oneYearFuture = current_date.toISOString().split('T')[0];
today_temp = today.split("-");
today = today_temp[1] + "/" + today_temp[2] + "/" + today_temp[0];
oneYearFuture_temp = oneYearFuture.split("-");
oneYearFuture = oneYearFuture_temp[1] + "/" + oneYearFuture_temp[2] + "/" + oneYearFuture_temp[0];

function openMenu() 
{
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

function closeMenu() 
{
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
}
	
function mainMenuSelect() 
{
	document.getElementById("mainMenu").style.display = "grid";
}

function rateThisChat() 
{
	$('input[type=radio]').prop('checked',false); 
	setTimeout( () => { document.getElementById("rate").style.display = "block"; }, 1100);
}

function botRateChatResponse() 
{
	setTimeout(() => { document.getElementById("rate").style.display = "none"; }, 500);
	botThinking();
	removeBotThoughts();
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>Thank you for submitting your rating.</span></p>'); }, 1100);
	setTimeout(() => { playMessageSent(); }, 500);
	showBotTime();
	document.getElementById('userInput').scrollIntoView({block: 'start', behavior: 'smooth'});
	scrollViewBot();
	$("#chatbox").stop().animate({ scrollTop: $("#chatbox")[0].scrollHeight}, 1100);
}

function bookingRelatedIssue() 
{
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
}

function travelOptions() 
{
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	setTimeout(() => { $("#chatbox").append('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5671.128691959641!2d-0.08917902132260014!3d51.52505312433105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca6040c11cd%3A0x73bae2a6535adb4f!2sOld%20Street!5e0!3m2!1sen!2suk!4v1649541470737!5m2!1sen!2suk" id="hotel_location" width="300" height="225" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'); }, 1100);
}