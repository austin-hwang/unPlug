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
	alarms.forEach(function(item) {
		var alarm = item.value;
		var alarmEl = document.createElement('div');
		alarmEl.classList.add('alarm-item');
		alarmEl.textContent = alarm.toString();
		var button = item.key;
		button.classList.add('alarm-btn');
		button.classList.add('delete-btn');
		this.alarmBox.appendChild(alarmEl);
		this.alarmBox.appendChild(button);
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