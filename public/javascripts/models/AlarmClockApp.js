/* Started with code from https://github.com/wkashdan/alarm-clock for setClock, addAlarm, and checkAlarms 
	but changed a lot

AlarmClockApp Class

	Attributes:
		- clock: Clock Object
		- alarms: Array of Alarm Objects
		- selectedPeriod: 'am' or 'pm'
*/

//Clock.js must be loaded prior to calling this constructor
function AlarmClockApp() {
    this.clock = new Clock();
    this.alarms = [];
    this.selectedPeriod = 'am';
}

// Set Clock time to Date Object
AlarmClockApp.prototype.setClock = function(date) {
    this.clock.date = date;
}

// Add alarm to alarms list
AlarmClockApp.prototype.addAlarm = function(alarm, btn) {
    this.alarms.push({
        key: btn,
        value: alarm
    });
    // Show alert
    swal(
        'Adding alarm..',
        'Added!',
        'success'
    )
}

// Delete alarm from alarms list
AlarmClockApp.prototype.deleteAlarm = function(button) {
    for (var i = 0; i < this.alarms.length; i++) {
        if (this.alarms[i].key == button) {
            this.alarms.splice(i, 1);
        }
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
        if (alarm.equals(this.clock.date))
            ring = true;
    }, this);
    return ring;
}