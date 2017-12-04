/*
AlarmClockView Class
	
	Attributes:
		- timeBox: DOM Element for time
		- alarmBox: DOM Elemetn for alarms
		- alertBox: DOM Element for alert
		- selectedPeriodBtn: current selected period button (am/pm)
	Method:
		- setClockView
		- setSelectedPeriodBtn
		- setAlarmView
		- showAlert
*/
function AlarmClockView(timeBox, alarmBox, alertBox, selectedPeriodBtn) {
	this.timeBox = timeBox;
	this.alarmBox = alarmBox;
	this.alertBox = alertBox;
	this.selectedPeriodBtn = selectedPeriodBtn;
}

// Consumes: Clock Object, displays time
AlarmClockView.prototype.setClockView = function(clock) {
	this.timeBox.textContent = clock.getTimeString();
}

// Consumes: selectedPeriodBtn DOM Element
AlarmClockView.prototype.setSelectedPeriodBtn = function(btn) {
	this.selectedPeriodBtn.classList.remove('active-period-btn');
	btn.classList.add('active-period-btn');
	this.selectedPeriodBtn = btn;
}

// Consumes: array of Alarms, display alarms
AlarmClockView.prototype.setAlarmView = function(alarms) {
	this.alarmBox.innerHTML = '';
	alarms.forEach(function(alarm) {
		var alarmEl = document.createElement('div');
		alarmEl.classList.add('alarm-item');
		alarmEl.textContent = alarm.toString();
		this.alarmBox.appendChild(alarmEl);
	}, this)
}

// Purpose: displays the alert for 5 seconds
AlarmClockView.prototype.showAlert = function(msg) {
	this.alertBox.textContent = msg;
	var snoozeBtn = document.createElement("button");
	snoozeBtn.setAttribute("id", "snoozeBtn");
	var offBtn = document.createElement("button");
	offBtn.setAttribute("id", "offBtn");
	snoozeBtn.innerHTML = "Snooze?";
	offBtn.innerHTML = "Turn Off?";
	this.alertBox.appendChild(snoozeBtn);
	this.alertBox.appendChild(offBtn);
	this.alertBox.style.display = 'block';
	document.getElementById("snoozeBtn").onclick = function() {snooze(this.clock.date)};
	setTimeout(function(){
		this.alertBox.style.display = 'none';
	}, 5000);
}

AlarmClockView.prototype.snooze = function(date, alarms) {
	song.pause();
	song.currentTime = 0;
	let hour = date.getHours();
	let min = date.getMinutes();
	let period = 'pm';
	var newAlarm = new Alarm(hour, min, period);
	if(newAlarm.isValid()) {
		this.app.addAlarm(newAlarm);
		this.view.setAlarmView(this.app.alarms);
	} else {
		this.view.showAlert('Could not snooze.');
	}
}