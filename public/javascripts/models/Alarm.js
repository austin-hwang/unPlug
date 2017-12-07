/* Code started from https://github.com/wkashdan/alarm-clock but changed
Sets up alarm and checks if valid
Alarm Class
*/
function Alarm(hour, min, period) {
	this.hour = hour;
	this.min = min;
	this.date = new Date();

	hour === 12 && period === 'am' ?
		this.date.setHours(0) :
	hour === 12 && period === 'pm' ?
		this.date.setHours(12) :
	period === 'pm' ? 
		this.date.setHours(hour + 12) : 
		this.date.setHours(hour);
	this.date.setMinutes(min);
	this.date.setSeconds(0);
}

/*
Consumes a Date Object
Returns boolean
*/
Alarm.prototype.equals = function(date) {
	return date.getHours() === this.date.getHours() && 
		date.getMinutes() === this.date.getMinutes();
}

//Returns time string
Alarm.prototype.toString = function() {
	return this.date.toLocaleTimeString('en-US');
}

//Returns true if hour, min are valid, nonprofit is selected and initial picture is uploaded
Alarm.prototype.isValid = function() {
	var selected = document.getElementById("nonprofit");
	var nonprofit = selected.options[selected.selectedIndex].text;
	if (nonprofit == "SELECT NONPROFITS") {
		return false;
	}
	if (document.getElementById("canvas").toDataURL() == document.getElementById("canvas2").toDataURL()) {
		return false;
	}
	return this.hour > 0 
		&& this.hour < 13 
		&& this.min > -1
		&& this.min < 60
}