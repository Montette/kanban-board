var clockDate = $('<p>').appendTo("#clock");
var clockTime = $('<p>').appendTo("#clock");
    

function getDate(){

	var date = new Date();
	
	var day = date.getDate();
	var month = date.getMonth() < 10 ? "0" + (date.getMonth() +1) : date.getMonth();
	var year = date.getFullYear();
	var hour = date.getHours();
	var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	
	var todayDate = day + "/" + month + "/" + year;
	var todayTime = hour + ":" + minute + ":" + second;	

	clockDate.text(todayDate);
	clockTime.text(todayTime); 
	setTimeout(function(){getDate()}, 1000);	
}
getDate();