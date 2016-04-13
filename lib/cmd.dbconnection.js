"use strict"



var CMD = function () {
	this.description = "Manage database connection";
	
	return this;
};

CMD.prototype.run = function() {

	console.log("foo")

};

module.exports = CMD;