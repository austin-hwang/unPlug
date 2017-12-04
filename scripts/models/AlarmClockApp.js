/*
AlarmClockApp Class

	Attributes:
		- clock: Clock Object
		- alarms: Array of Alarm Objects
		- selectedPeriod: 'am' or 'pm'
	Methods:
		- setClock: sets clock from Date object
		- addAlarm: adds an Alarm Object to array
		- checkAlarms: checks the alarm array for an alarm equal to clock time

*/

//Clock.js must be laoded prior to callign this constructor
function AlarmClockApp() {
	this.clock = new Clock();
	this.alarms = [];
	this.buttons = [];
	this.selectedPeriod = 'am';
}

// Consumes: Date Object
AlarmClockApp.prototype.setClock = function(date) {
	this.clock.date = date;
}

//Consumes: Alarm object
AlarmClockApp.prototype.addAlarm = function(alarm, btn) {
	this.alarms.push({
		key:   btn,
		value: alarm
	});
}
/*
AlarmClockApp.prototype.deleteAlarm = function(button) {
	for (var i = 0; i < alarms.length; i++) {
		for (var j = 0; j < alarms[i].length; j++) {
			if (alarms[i][j] == button) {
				var row = i;
			}
		}
	}
	alarms.splice(row - 1, 1);
}
/*
Purpose: to check alarms array for alarm equal to clock time
Returns: boolean
*/
AlarmClockApp.prototype.checkAlarms = function() {
	var ring = false;
	this.alarms.forEach(function(item) {
		alarm = item.value;
		if(alarm.equals(this.clock.date))
			ring = true;
	}, this);
	return ring;
}