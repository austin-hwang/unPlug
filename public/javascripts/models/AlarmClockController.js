/* Started with foundation from https://github.com/wkashdan/alarm-clock but changed almost everything

AlarmClockController Class
	
	Attributes:
		- app: AlarmClockApp Object
		- view: AlarmClockView Object
*/

// Create global variables
var fs = require('fs');
var jsonObjects = new Array(2); 
var canvas = "";
var matches = false;
// Get alarm sound
var audElem = document.getElementsByTagName('audio')[0].getAttribute('id');
var song = document.getElementById(audElem);

// Upolad file for first image
Dropzone.options.myId = {
	// Accepts these file types
	acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
	createImageThumbnails: false,
	parallelUploads: 1,
	previewsContainer: false,
	init: function() {
		// Capture using camera
		this.hiddenFileInput.setAttribute("capture", "camera");
		this.on("success", function(file, res) {
			// Set up canvas to show first image on page
			canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');
			var img = new Image();
			// Fix Securities issue with Google Chrome
			img.setAttribute('crossOrigin', 'anonymous');
			// Show image on home screen
			img.onload = function(){
					ctx.drawImage(img,0,0, img.width, img.height, 0, 0, 260, canvas.height);
			};
			// Image source is given by Imgur link
			img.src = res.data.link;
			// Process image 1 using Microsoft API
			processImage(res.data.link, 1);
		});

		this.on("reset", function(){
		});
	},
	paramName: "image",
	url : "https://api.imgur.com/3/upload",
	addRemoveLinks: true,
	headers: { "Authorization" : "Client-ID 3d0295885297563",  "Cache-Control": null, "X-Requested-With": null} 
};

// Upload file for second image
Dropzone.options.myId2 = {
	// Accepts these file types
	acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
	createImageThumbnails: false,
	parallelUploads: 1,
	previewsContainer: false,
	init: function() {
	// Capture using camera
	this.hiddenFileInput.setAttribute("capture", "camera");
		this.on("success", function(file, res) {
			// Set up canvas to show first image on page
			canvas = document.getElementById('canvas2');
			// Process image 2 given by Imgur link using Microsoft API
			processImage(res.data.link, 2);
		});
		this.on("reset", function(){
		});
	},
	paramName: "image",
	url : "https://api.imgur.com/3/upload",
	addRemoveLinks: true,
	headers: { "Authorization" : "Client-ID 3d0295885297563",  "Cache-Control": null, "X-Requested-With": null} 
};

// Create controller
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

// Confirmation alerts for deleting alarm
AlarmClockController.prototype.setButtonListener = function() {
	// When delete button clicked
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
			  // Delete alarm, update alarms view on page
			  this.app.deleteAlarm(button.target);
			  this.view.setAlarmView(this.app.alarms);
			  // Notify user about deletion
			  swal(
				'Deleted!',
				'Your alarm has been deleted.',
				'success'
			  )
			}
		  })
		// Update alarms view on page
		this.view.setAlarmView(this.app.alarms);
	}.bind(this));
}

// Alarm form DOM element for user-inputted alarm
AlarmClockController.prototype.setAlarmFormListener = function(el) {
	// When new alarm submitted
	el.addEventListener('submit', function(event) {
		event.preventDefault();
		// Set variables to user-chosen conditions
		var hour = parseInt(event.target.alarmHour.value);
		var min = parseInt(event.target.alarmMinute.value);
		var period = this.app.selectedPeriod;
		// Create new alarm
		var newAlarm = new Alarm(hour, min, period);
		// Create delete button for new alarm
		var newBtn = document.createElement("button");
		var id = "deleteBtn" +  this.counter;
		newBtn.setAttribute("id", id);
		newBtn.innerHTML = "Delete Alarm";
		// If new alarm is valid, add to alarms list and update home view
		if(newAlarm.isValid()) {
			this.app.addAlarm(newAlarm, newBtn);
			this.view.setAlarmView(this.app.alarms);
			this.counter ++;
		// If not valid alarm, error message
		} else {
			swal(
				'Oops...',
				"Please enter valid inputs! (Don't forget to choose a nonprofit and upload first image!)",
				'error'
			);
		}
	}.bind(this));
}

// Event listener for alarm
AlarmClockController.prototype.setClockWorkerListener = function(worker, snoozed) {
	worker.addEventListener('message', function(event){
		// Update clock
		this.app.setClock(event.data);
		this.view.setClockView(this.app.clock);
		// If alarm matches current time, ring until snoozed
		if(this.app.clock.date.getSeconds() === 0 && this.app.checkAlarms()) {
			song.play();
			this.isSnoozed(song);
		}
	}.bind(this))
}

// Snooze function
AlarmClockController.prototype.isSnoozed = function (song) {
	// Confirm modal if alarm goes off, can snooze or turn off
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
		// if Snoozed
		if (result.value) {
			// Turn off sound
			song.pause();
			song.currentTime = 0;
			// Set new alarm to 5 minutes from now
			let hour = this.app.clock.date.getHours();
			let min = this.app.clock.date.getMinutes() + 5;
			// If rolls over to new hour
			if (min > 60) {
				min = min % 60;
				hour ++;
			}
			// AM or PM depending on if new alarm goes past 12
			var period;
			if (hour > 12) {
				period = 'pm';
			} else {
				period = 'am';
			}
			hour = hour % 12;
			// Create new alarm
			var newAlarm = new Alarm(hour, min, period);
			// Create new delete button for new alarm
			var newBtn = document.createElement("button");
			var id = "deleteBtn" +  (this.counter + 1);
			newBtn.setAttribute("id", id);
			newBtn.innerHTML = "Delete Alarm";
			// Add new alarm and update view
			this.app.addAlarm(newAlarm, newBtn);
			this.view.setAlarmView(this.app.alarms);
			// Notify user that snooze happened
			swal(
			'Snoozed!',
			'Your alarm has been snoozed.',
			'success'
			)
		
			// Selected nonprofit
			var selected = document.getElementById("nonprofit");
			var nonprofit = selected.options[selected.selectedIndex].text;
			// Get transaction info whenever snoozed
			var transactionInfo = Date() + ": Donated $" + document.getElementById("money").value + " to " + nonprofit + "!\n"; 
			console.log(transactionInfo);
			fs.appendFile('/transactions.txt', transactionInfo, function(err) {
			});

			// Connect with Stripe API to charge the user the amount they chose
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "/charge", true);
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr.send(JSON.stringify({ amount: (document.getElementById("money").value)*100, description: transactionInfo }));

		// If alarm turned off
		} else if (result.dismiss === 'cancel') {
			// On click of turn off, compare images
			$("#myId2").get(0).click();
			// If pictures don't match, keep playing alarm
			if (matches == false) {
				this.isSnoozed(song);
			} 
		}
		})
}

// From Microsoft Azure Computer Vision API
function processImage(link, counter) {
	// **********************************************
	// *** Update or verify the following values. ***
	// **********************************************

	// Replace the subscriptionKey string value with your valid subscription key.
	// 30-day API Key expires on 
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

	// Set imageUrl to link provided in parameters
	var sourceImageUrl = link;
	
	// Notify user that image is processing
	alertify.set({ delay: 3000 });
	alertify.log("Image processing...");
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

	// On completion
	.done(function(data) {
		// For first image, add descriptive tags to jsonObjects array at index 0
		if (canvas == document.getElementById('canvas')){
			jsonObjects[0] = data.description.tags;
		} else {
		// For second image, add descriptive tags to jsonObjects array at index 1
			jsonObjects[1] = data.description.tags;
		}
		console.log(jsonObjects);

		// On second image processing
		if(counter == 2){
			var img1Tags = jsonObjects[0];
			var img2Tags = jsonObjects[1];
			// Number of common tags between images
			var sharedTags = 0;
			// Compare the tags of each image
			for (var i = 0; i < img1Tags.length; i++){
				for (var j = 0; j < img2Tags.length; j++){
					if (img1Tags[i] == img2Tags[j]){
						sharedTags++;
					}
				}
			}
			// Average number of tags in both images
			var avgTags = (img1Tags.length + img2Tags.length) / 2;
			console.log("sharedTags: ", sharedTags, "\navgTags: ", avgTags, "\nratio: ", sharedTags / avgTags);
			// If more than 50% tags share, images match
			if (sharedTags / avgTags > .5){
				alertify.success("Images matched!");
				matches = true;
				// Alarm turns off
				song.pause();
				song.currentTime = 0;
				// Reset alarm to initial unmatched setting
				matches = false;
				swal.close();
			// If images don't match, alert user to try again
			} else {
				alertify.error("Images do not match, please try again!");
				matches = false;
			}		
		}
	})

	// If API request fails
	.fail(function(jqXHR, textStatus, errorThrown) {
		// Display error message.
		var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
		errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
		swal(
			'Oops...', 
			errorString,
			'error'
		);
	});
};