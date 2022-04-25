var slider;

function bookARoom(response) 
{
	var botHtml = '<p class="botText"><span>' + response + '</span><input type="text" class="daterange"/></p>';
	
	document.getElementById("myDropDown").style.display = "none";
	document.getElementById("mainMenu").style.display = "none";
	setTimeout(() => { $("#chatbox").append(botHtml); }, 1100);
	setTimeout(() => { $('.daterange').daterangepicker({"minDate": today, "maxDate": oneYearFuture}, function(start, end, label) {
		startDate = start.format("MM/DD/YYYY");
		endDate = end.format("MM/DD/YYYY");
  
		// To calculate the time difference of two dates
		var Difference_In_Time = new Date(endDate).getTime() - new Date(startDate).getTime();
  
		// To calculate the no. of days between two dates
		length_of_stay = Math.trunc(Difference_In_Time / (1000 * 3600 * 24));	
		var day_s = day_name(startDate);
		var day_n = start.format('D');
		var month = month_name(startDate);
		var year  = start.format('YYYY');	
		
		[...document.getElementsByClassName('daterange')].forEach(e => e.remove());
		
		var datearray1 = startDate.split("/");
		var datearray2 = endDate.split("/");

		startDate = datearray1[1] + '/' + datearray1[0] + '/' + datearray1[2];
		endDate = datearray2[1] + '/' + datearray2[0] + '/' + datearray2[2];
		
		confirmDates(day_s, day_n, month, year, length_of_stay);

	}).show();	}, 1200);
}

function confirmDates(day_string, day_number, month, year, length_of_stay) {
	botThinking();
	removeBotThoughts();
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>So just to confirm, you\'re looking for a room on:\n\n' + day_string + " " + day_number + " " + month + " " + year + " for " + length_of_stay + " days." + "\n\nIs that okay?" +'</span></p>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<button id="yes_button" class="confirmationButtons" type="button">Yes</button>'); }, 1200);
	setTimeout(() => { $("#chatbox").append('<button id="no_button" class="confirmationButtons" type="button">No</button>'); }, 1200);
	setTimeout(() => { playMessageSent() }, 1200);
	
	setTimeout(() => { document.getElementById('yes_button').addEventListener("click", function() { botThinking(); removeBotThoughts(); chooseNumberOfPeople(); [...document.getElementsByClassName('confirmationButtons')].forEach(e => e.remove()); }, false); }, 1200);
	setTimeout(() => { document.getElementById('no_button').addEventListener("click", function() { getBotResponse('Book a room'); [...document.getElementsByClassName('confirmationButtons')].forEach(e => e.remove());}, false); }, 1200);
	showBotTime(); 
	scrollView();
}

function chooseNumberOfPeople()
{
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>How many people?</span></p>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<select size="4" id="length_of_stay"><option class="nights" value="1">1</option><option class="nights" value="2">2</option><option class="nights" value="3">3</option><option class="nights" value="4">4</option><option class="nights" value="5">5</option><option class="nights" value="6">6</option></select>'); }, 1200);
	setTimeout(() => { document.getElementById('length_of_stay').addEventListener("click", function() { checkAvailableRooms(this); }, false); }, 1200);
	showBotTime(); 
	scrollView();
}

function checkAvailableRooms(people) 
{
	var people_value = people.selectedOptions[0].text;
	document.getElementById("length_of_stay").remove();
	[...document.getElementsByClassName('nights')].forEach(e => e.remove());
	$("#chatbox").append('<p id="searching" class="botText"><span>Okay, looking for available rooms now...</span></p>');
	playMessageSent();
	botThinking();
	removeBotThoughts();
	setTimeout(() => { document.getElementById('searching').remove(); }, 1100);
	
	$.get("/room_availability", { people_value }).done(function(data) {
		slider = '<div id="slides"></div>';
		
		for (let i = 0; i < data.length; i++)
		{
			viewRooms(data[i]);
		}
	});
	setTimeout(() => { $("#chatbox").append(slider); }, 1100);
	scrollView();
}

function day_name(custom_date) 
{
     var myDate=custom_date;
     myDate=myDate.split("-");
     var newDate=myDate[2]+"-"+myDate[1]+"-"+myDate[0];
     var my_ddate=new Date(newDate).getTime();
     var currentDate = new Date(newDate);
     var day_name = currentDate.getDay();
     var days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
     return days[day_name];
}

function month_name(custom_date) 
{
     var myDate=custom_date;
     myDate=myDate.split("-");
     var newDate=myDate[2]+"-"+myDate[1]+"-"+myDate[0];
     var my_ddate=new Date(newDate).getTime();
     var currentDate = new Date(newDate);
     var month_name = currentDate.getMonth();
     var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
     return months[month_name];
}

function viewRooms(room_info) 
{	
	if(room_info[0] == "Single") 
	{
		setTimeout(() => { $("#slides").append('<p id="images" class="botText_for_rooms"><image class="room_image" src="../static/images/single_room.jpg"></image><span id="room_title_text">Single Room</span><span id="room_title_text">' + room_info[2] + ".00 GBP" + '</span><button id="Single" class="room_button" type="button">Book Now!</button>Book this room in the next 3 days to get 15% off!</p>'); }, 1100);
		setTimeout(() => { document.getElementById('Single').addEventListener("click", function() { completeBooking(room_info); }, false); }, 1100);
	}
	else if (room_info[0] == "Double")
	{
		setTimeout(() => { $("#slides").append('<p id="images" class="botText_for_rooms"><image class="room_image" src="../static/images/double_room.jpg"></image><span id="room_title_text">Double Room</span><span id="room_title_text">' + room_info[2] + ".00 GBP" + '</span><button id="Double" class="room_button" type="button">Book Now!</button>Book this room in the next 3 days to get 15% off!</p>'); }, 1100);
		setTimeout(() => { document.getElementById('Double').addEventListener("click", function() { completeBooking(room_info); }, false); }, 1100);
	}
	else if (room_info[0] == "Twin")
	{
		setTimeout(() => { $("#slides").append('<p id="images" class="botText_for_rooms"><image class="room_image" src="../static/images/twin_room.jpg"></image><span id="room_title_text">Twin Room</span><span id="room_title_text">' + room_info[2] + ".00 GBP" + '</span><button id="Twin" class="room_button" type="button">Book Now!</button>Book this room in the next 3 days to get 15% off!</p>'); }, 1100);
		setTimeout(() => { document.getElementById('Twin').addEventListener("click", function() { completeBooking(room_info); }, false); }, 1100);
	}
	else if (room_info[0] == "Triple")
	{
		setTimeout(() => { $("#slides").append('<p id="images" class="botText_for_rooms"><image class="room_image" src="../static/images/triple_room.jpg"></image><span id="room_title_text">Triple Room</span><span id="room_title_text">' + room_info[2] + ".00 GBP" + '</span><button id="Triple" class="room_button" type="button">Book Now!</button>Book this room in the next 3 days to get 15% off!</p>'); }, 1100);
		setTimeout(() => { document.getElementById('Triple').addEventListener("click", function() { completeBooking(room_info); }, false); }, 1100);
	}
	else if (room_info[0] == "Quad")
	{
		setTimeout(() => { $("#slides").append('<p id="images" class="botText_for_rooms"><image class="room_image" src="../static/images/quad_room.jpg"></image><span id="room_title_text">Quad Room</span><span id="room_title_text">' + room_info[2] + ".00 GBP" + '</span><button id="Quad" class="room_button" type="button">Book Now!</button>Book this room in the next 3 days to get 15% off!</p>'); }, 1100);
		setTimeout(() => { document.getElementById('Quad').addEventListener("click", function() { completeBooking(room_info); }, false); }, 1100);
	}
}

function completeBooking(room_info) 
{
	botThinking(); 
	removeBotThoughts();
	rowNum = room_info[3];
	[...document.querySelectorAll('.botText_for_rooms')].forEach(e => e.remove());	
	$.get("/generate_reference", { startDate: startDate, length_of_stay: length_of_stay, rowNum: rowNum }).done(function(data) {
		reference = data;
	});
	setTimeout(() => { $("#chatbox").append('<image id="hotel_porter_small" src="../static/images/hotel_porter_coquet_adrian.png" align="left"</image>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>' + "Total for the " + room_info[0] + " room is: " + length_of_stay * room_info[2] + ".00 GBP." + "\n\nStart Date: " + startDate + "\nEnd Date: " + endDate + "\nLength of stay: " + length_of_stay + " days" + "\n\nReference: " + reference + "\n\nPlease be ready to pay when you arrive." + '</span></p>'); }, 1100);
	setTimeout(() => { $("#chatbox").append('<p class="botText"><span>' + "Is there anything else I can help you with?" + '</span></p>'); }, 1100);
	playMessageSent();
	showBotTime();
	scrollView();
	
}