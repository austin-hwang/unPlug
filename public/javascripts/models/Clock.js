/* Started with code from https://github.com/wkashdan/alarm-clock

Clock Class
	Preconditions: must pass in a valid JavaScript Date Object

	Attributes:
		- date: a JavaScript Date object

*/
function Clock(date) {
	date === undefined ? 
		this.date = new Date() : 
		this.date = date;
}

/*
Purpose: to get the formatted time string of the clock
Returns: a string representation of the US locale time
*/
Clock.prototype.getTimeString = function() {
	return this.date.toLocaleTimeString('en-US');
}