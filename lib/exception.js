"use strict";




var Err = function Err(message) {
	this.message = message;
	return this;
};

var Fatal = function Fatal(message) {
	this.message = message;
	return this;
};


module.exports = {
	Fatal : Fatal,
	Error : Err
};