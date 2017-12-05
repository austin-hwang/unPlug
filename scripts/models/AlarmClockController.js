/*
AlarmClockController Class
	
	Attributes:
		- app: AlarmClockApp Object
		- view: AlarmClockView Object
	Method:
		- setPeriodBtnListener
		- setAlarmFormListener
		- setClockWorkerListener
*/
function AlarmClockController(app, view){
	this.app = app;
	this.view = view;
	this.counter = 0;
}

//Consumes: DOM element containing periodBtns
AlarmClockController.prototype.setPeriodBtnListener = function(el) {
	el.addEventListener('click',function(event) {
		event.preventDefault();
		this.view.setSelectedPeriodBtn(event.target);
		this.app.selectedPeriod = event.target.value;
	}.bind(this));
}

AlarmClockController.prototype.setButtonListener = function() {
	$('.buttons').on('click', 'button', function(button){
		console.log(button.target)
		this.app.deleteAlarm(button.target);
		this.view.setAlarmView(this.app.alarms);
	}.bind(this));
}

//Consumes: Alarm form DOM element
AlarmClockController.prototype.setAlarmFormListener = function(el) {
	el.addEventListener('submit', function(event) {
		event.preventDefault();
		var hour = parseInt(event.target.alarmHour.value);
		var min = parseInt(event.target.alarmMinute.value);
		var period = this.app.selectedPeriod;
		var newAlarm = new Alarm(hour, min, period);
		var newBtn = document.createElement("button");
		var id = "deleteBtn" +  this.counter;
		newBtn.setAttribute("id", id);
		newBtn.innerHTML = "Delete Alarm";
		if(newAlarm.isValid()) {
			this.app.addAlarm(newAlarm, newBtn);
			this.view.setAlarmView(this.app.alarms);
			this.counter ++;
		} else {
			this.view.showAlert('Please Enter Valid Inputs');
		}
	}.bind(this));
}

// Consumes: clockWorker 
AlarmClockController.prototype.setClockWorkerListener = function(worker, snoozed) {
	worker.addEventListener('message', function(event){
		this.app.setClock(event.data);
		this.view.setClockView(this.app.clock);
		if(this.app.clock.date.getSeconds() === 0 && this.app.checkAlarms()) {
			var audElem = document.getElementsByTagName('audio')[0].getAttribute('id');
			var song = document.getElementById(audElem);
			song.play();
			var isSnoozed = false;
			this.snoozed(song);
		}
	}.bind(this))
}

AlarmClockController.prototype.snoozed = async function(song) {
		await confirm(song);
		let hour = this.app.clock.date.getHours();
		let min = this.app.clock.date.getMinutes() + 5;
		if (min > 60) {
			min = min % 60;
			hour ++;
		}
		var period;
		if (hour > 12) {
			period = 'pm';
		} else {
			period = 'am';
		}
		var newAlarm = new Alarm(hour, min, period);
		var newBtn = document.createElement("button");
		var id = "deleteBtn" +  (this.counter + 1);
		newBtn.setAttribute("id", id);
		newBtn.innerHTML = "Delete Alarm";
		this.app.addAlarm(newAlarm, newBtn);
		this.view.setAlarmView(this.app.alarms);
}

function confirm (song) {
	return new Promise(resolve => {
		alertify.confirm("RING! Your alarm just went off!", function (e) {
			if (e) {
				alertify.success("SNOOZED");
				song.pause();
				song.currentTime = 0;
				isSnoozed = true;
			} else {
				alertify.error("TURNED OFF");
				song.pause();
				song.currentTime = 0;
			}
			resolve();
		});
	})
}
