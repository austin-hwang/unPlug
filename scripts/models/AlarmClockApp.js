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

//Clock.js must be loaded prior to callign this constructor
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

<<<<<<< HEAD
AlarmClockApp.prototype.deleteAlarm = function(button) {
	for (var i = 0; i < this.alarms.length; i++) {
		if (this.alarms[i].key == button) {
			this.alarms.splice(i, 1);
		}
=======
AlarmClockApp.prototype.snooze = function(date, alarms) {
	song.pause();
	song.currentTime = 0;
	let hour = date.getHours();
	let min = date.getMinutes() + 5;
	let period = 'pm';
	var newAlarm = new Alarm(hour, min, period);
	if(newAlarm.isValid()) {
		this.app.addAlarm(newAlarm);
		this.view.setAlarmView(this.app.alarms);
	} else {
		this.view.showAlert('Could not snooze.');
>>>>>>> ae203cd63a7027b052c29160ea4d4db392982e3c
	}
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