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
var jsonObjects = new Array(2); 
var canvas = "";

Dropzone.options.myId = {
	acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
	createImageThumbnails: false,
	parallelUploads: 1,
	previewsContainer: false,
	init: function() {
		
	this.hiddenFileInput.setAttribute("capture", "camera");

		this.on("success", function(file, res) {
	
			canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');
			var img = new Image();
			img.onload = function(){
					ctx.drawImage(img,0,0, img.width, img.height, 0, 0, 260, canvas.height);
				
			};
			img.src = res.data.link;
			processImage(res.data.link);
		});

		this.on("reset", function(){
		});
	},
	paramName: "image",
	url : "https://api.imgur.com/3/upload",
	addRemoveLinks: true,
	headers: { "Authorization" : "Client-ID 3d0295885297563",  "Cache-Control": null, "X-Requested-With": null} 
};

Dropzone.options.myId2 = {
	acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
	createImageThumbnails: false,
	parallelUploads: 1,
	previewsContainer: false,
	init: function() {
		
	this.hiddenFileInput.setAttribute("capture", "camera");

		this.on("success", function(file, res) {
			canvas = document.getElementById('canvas2');
			processImage(res.data.link);
		});

		this.on("reset", function(){
		});
	},
	paramName: "image",
	url : "https://api.imgur.com/3/upload",
	addRemoveLinks: true,
	headers: { "Authorization" : "Client-ID 3d0295885297563",  "Cache-Control": null, "X-Requested-With": null} 
};
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
					console.log(hour);
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
					$("#myId2").get(0).click();
					//$("#myId").get(0).hiddenFileInput.click();
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

function processImage(link) {
	// **********************************************
	// *** Update or verify the following values. ***
	// **********************************************

	// Replace the subscriptionKey string value with your valid subscription key.
	var subscriptionKey = "a20bbb45a4c745e9af453b51acb954b6";

	// Replace or verify the region.
	//
	// You must use the same region in your REST API call as you used to obtain your subscription keys.
	// For example, if you obtained your subscription keys from the westus region, replace
	// "westcentralus" in the URI below with "westus".
	//
	// NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
	// a free trial subscription key, you should not need to change this region.
	var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

	// Request parameters.
	var params = {
		"visualFeatures": "Categories,Description,Color",
		"details": "",
		"language": "en",
	};

	// Display the image.
	var sourceImageUrl = link;
	// document.querySelector("#sourceImage").src = sourceImageUrl;

	// Perform the REST API call.
	$.ajax({
		url: uriBase + "?" + $.param(params),

		// Request headers.
		beforeSend: function(xhrObj){
			xhrObj.setRequestHeader("Content-Type","application/json");
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
		},

		type: "POST",

		// Request body.
		data: '{"url": ' + '"' + sourceImageUrl + '"}',
	})

	.done(function(data) {
		console.log(data);
		// Show formatted JSON on webpage.
		$("#responseTextArea").val(JSON.stringify(data, null, 2));

		if (canvas == document.getElementById('canvas')){
			jsonObjects[0] = data.description.tags;
		} else {
			jsonObjects[1] = data.description.tags;
		}
		console.log(jsonObjects);
	})

	.fail(function(jqXHR, textStatus, errorThrown) {
		// Display error message.
		var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
		errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
		alert(errorString);
	});
};