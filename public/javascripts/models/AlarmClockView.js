/* Started with code from https://github.com/wkashdan/alarm-clock , Changed to match our specifications
AlarmClockView Class
	
	Attributes:
		- timeBox: DOM Element for time
		- alarmBox: DOM Element for alarms
		- selectedPeriodBtn: current selected period button (am/pm)
*/
function AlarmClockView(timeBox, alarmBox, selectedPeriodBtn) {
	this.timeBox = timeBox;
	this.alarmBox = alarmBox;
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