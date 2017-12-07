/*

This file defines a main method and 
runs it when the DOM loads

*/
var fs = require('fs');

// runs on document load
document.onreadystatechange = function () {

	// define main method
	function main() {

		// get required DOM elements
		var timeBox = document.getElementById('timeBox');
		var alarmBox = document.getElementById('alarmBox');
		var selectedPeriodBtn = document.getElementById('amBtn');
		var periodBtns = document.getElementById('periodBtns');
		var alarmForm = document.getElementById('alarmForm');
		var deleteBtn = document.getElementById('deleteBtn');

		// init Data Models
		var app = new AlarmClockApp();
		var view = new AlarmClockView(timeBox, alarmBox, selectedPeriodBtn);
		var controller = new AlarmClockController(app, view);
		
		// set initial view
		view.setClockView(app.clock);

		// set event listeners
		controller.setPeriodBtnListener(periodBtns);
		controller.setAlarmFormListener(alarmForm);
		controller.setButtonListener(deleteBtn)
		
		// initialize worker
		var clockWorker = new Worker('javascripts/util/clockWorker.js');
		controller.setClockWorkerListener(clockWorker);
		
		// empties transactions on page reload
		fs.writeFile('/transactions.txt', "", function(err) {
		});
	}

	// run main method when DOM loads
	if (document.readyState === "interactive") {
		main();
	}
}



