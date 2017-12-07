// Imported from https://github.com/wkashdan/alarm-clock
// Web Worker
// Posts new Date Object to main thread every second
function oneSecondTimer() {
	setTimeout(function() {
		postMessage(new Date());
		oneSecondTimer();
	}, 1000);
}

oneSecondTimer();