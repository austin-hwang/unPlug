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

var fs = require('fs');

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
		swal({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.value) {
			  this.app.deleteAlarm(button.target);
			  this.view.setAlarmView(this.app.alarms);
			  swal(
				'Deleted!',
				'Your alarm has been deleted.',
				'success'
			  )
			}
		  })
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
			swal(
				'Oops...',
				"Please enter valid inputs! (Don't forget to choose a nonprofit!)",
				'error'
			);
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
			//this.snoozed(song);
			swal({
				title: 'Your alarm went off!',
				text: "Would you like to snooze or turn off your alarm?",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Snooze!',
				cancelButtonText: 'Turn Off!',
				confirmButtonClass: 'btn btn-success',
				cancelButtonClass: 'btn btn-danger',
				buttonsStyling: false,
				reverseButtons: true
			  }).then((result) => {
				if (result.value) {
					song.pause();
					song.currentTime = 0;
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
					hour = hour % 12;
					var newAlarm = new Alarm(hour, min, period);
					var newBtn = document.createElement("button");
					var id = "deleteBtn" +  (this.counter + 1);
					newBtn.setAttribute("id", id);
					newBtn.innerHTML = "Delete Alarm";
					this.app.addAlarm(newAlarm, newBtn);
					this.view.setAlarmView(this.app.alarms);
				  swal(
					'Snoozed!',
					'Your alarm has been snoozed.',
					'success'
					)
				
					var selected = document.getElementById("nonprofit");
					var nonprofit = selected.options[selected.selectedIndex].text;
					var transactionInfo = Date() + ": Donated $" + document.getElementById("money").value + " to " + nonprofit + "!\n"; 
					console.log(transactionInfo);
					fs.appendFile('/transactions.txt', transactionInfo, function(err) {
					});

					var xhr = new XMLHttpRequest();
					xhr.open("POST", "http://localhost:1337/charge", true);
					xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					xhr.send(JSON.stringify({ amount: (document.getElementById("money").value)*100 }));
				// result.dismiss can be 'cancel', 'overlay',
				// 'close', and 'timer'
				} else if (result.dismiss === 'cancel') {
					song.pause();
					song.currentTime = 0;
				  swal(
					'Turned Off!',
					'Your alarm has been turned off!',
					'error'
				  )
				}
			  })
		}
	}.bind(this))
}
/*
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

		fs.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
			fs.readFile('/test.txt', function(err, contents) {
			  console.log(contents.toString());
			});
		});
}

function confirm (song) {
	return new Promise(resolve => {
		alertify.confirm("RING! Your alarm just went off!", function (e) {
			if (e) {
				alertify.success("SNOOZED");
				song.pause();
				song.currentTime = 0;
				isSnoozed = true;
				resolve();
			} else {
				alertify.error("TURNED OFF");
				song.pause();
				song.currentTime = 0;
			}
		});
	})
}
*/