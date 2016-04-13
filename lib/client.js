"use strict";

var LOG  = require("./log");
var Config = require("user-appdata");
var minimist = require('minimist');
var Exception = require("./exception");
var clientCommands = require("./client-commands");

var Client = function() {
	this.argv = minimist(process.argv.slice(2));
	this.config = new Config({appname : "deep-data"});
	this.log = new LOG(this);

	this.Exception = Exception;

	clientCommands.extend({
		dir : __dirname,
		prefix : "cmd.",
		client : this
	});

	console.log(this);

	return this;
};


Client.prototype.getdbconnection = function(name) {
	var result = null;
	for (var i = 0; i < this.config.settings.dbconnections.length; i++) {
		var conn = this.config.settings.dbconnections[i];
		if (conn.name.toLowerCase() === name.toLowerCase()){
			result = conn;
			break;
		}
	}

	return result;
};

Client.prototype.error = function(msg) {
	console.log("Client.prototype.error obsolete");
	throw new Exception.Error(msg);
};

Client.prototype.fatal = function(msg) {
	console.log("Client.prototype.fatal obsolete");
	throw new Exception.Fatal(msg);
};

module.exports = Client;