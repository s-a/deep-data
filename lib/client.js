"use strict";

var minimist = require('minimist');
var Config = require("user-appdata");
var LOG  = require("./log");
var Exception = require("./exception");


var Client = function() {
	this.argv = minimist(process.argv.slice(2));
	this.config = new Config({appname : "deep-data"});
	this.log = new LOG(this);
	return this;
};

Client.prototype.dbconnection = function() {
	console.log(this.argv, this.config.dataFolder);
};

Client.prototype.error = function() {
	throw new Error("done")
};

Client.prototype.execute = function() {
	if (this.argv._.length === 0){
		throw new Exception.Fatal("No argument given");
	}

	if (this[this.argv._[0]]){
		this[this.argv._[0]]();
	} else {
		throw new Exception.Fatal("Command not found");
	}
};

module.exports = Client;