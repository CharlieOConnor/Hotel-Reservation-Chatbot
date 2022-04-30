// Execute the getBotResponse() function if the user selects the enter key
$("#textInput").keypress(function(event) {
	if(event.which == 13) { 
		getBotResponse();
	}
});

// Execute the submitInput() function if the user selects the submit button
$('#buttonInput').click(function(){
    submitInput();
	playButtonClick();
});

// Close hamburger menu if user clicks away from it
$(document).on('click', function(event){
    var container = $("#hamburgerMenu");
    if (!container.is(event.target) && container.has(event.target).length === 0) 
    {
        closeMenu();
    }
});

// A list of the auto-complete questions in stock, retrieved from main.py as a list
$(function() {
	var questions = "";
	$.get("/questions").done(function(data) {
		questions = data;
		$("#textInput").autocomplete({
			source: questions,
			minLength: 1,
			delay: 300,
			position: { my : "left bottom", at: "left top" }
		});
	});
});

//Hamburger Menu Event Listenters
$('.menuContent').mouseover(function(){
    playMenuHover(); 
});

$('.mainMenuContent').mouseover(function(){
    playMenuHover(); 
});

$('#mainMenuButton').click(function(){
    closeMenu();
});

$('#mainMenuButton').mouseover(function(){
	mainMenuSelect();
});

$('#bookRoomButton').click(function(){
    closeMenu();
	getBotResponse($('#bookRoomButton').text());
});

$('#issueButton').click(function(){
    closeMenu();
	getBotResponse($('#issueButton').text());
});

$('#rateButton').click(function(){
    closeMenu();
	getBotResponse($('#rateButton').text());
});

$('#aboutUsButton').click(function(){
    closeMenu();
	getBotResponse($('#aboutUsButton').text());
});

$('#localAttractionsButton').click(function(){
    closeMenu();
	getBotResponse($('#localAttractionsButton').text());
});

$('#travelOptionsButton').click(function(){
    closeMenu();
	getBotResponse($('#travelOptionsButton').text());
});










