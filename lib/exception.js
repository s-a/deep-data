"use strict";



var Fatal = function Fatal(message) {
	this.message = message;
	return this;
};


module.exports = {
	Fatal : Fatal
};