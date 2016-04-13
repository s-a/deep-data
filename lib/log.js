"use strict";

var path = require("path");
var bunyan = require("bunyan");
var colors = require("colors/safe");

var LOG = function(client) {


	this.log = bunyan.createLogger({
		name: 'deep-data',
		streams: [
			{
				level: 'debug',
				path: path.join(client.config.dataFolder, 'deep-data-client.log')
			},
			{
				level: 'error',
				path: path.join(client.config.dataFolder, 'deep-data-client-error.log')
			},
		],
		level : client.config.debuglevel || 'debug',
	});


	return this;
};

LOG.prototype.prependArgument = function(arg, args) {
 	var newArray = Array.prototype.slice.call(args);
  	newArray.unshift(arg);
  	return newArray;
};


LOG.prototype.consoleLog = function(color) {
	var arg = arguments[1];
	if (typeof arg === "string"){
		console.log(color(arg));
	} else {
		if (arguments.length > 2){
			arguments.splice(0, 2);
			console.log.apply(console.log, arguments);
		}
	}
};


LOG.prototype.trace = function() {
	this.consoleLog.apply(this.consoleLog, this.prependArgument(colors.grey, arguments));
	this.log.trace.apply(this.log, arguments);
};

LOG.prototype.debug = function() {
	this.consoleLog.apply(this.consoleLog, this.prependArgument(colors.blue, arguments));
	this.log.debug.apply(this.log, arguments);
};

LOG.prototype.info = function() {
	this.consoleLog.apply(this.consoleLog, this.prependArgument(colors.cyan, arguments));
	this.log.info.apply(this.log, arguments);
};

LOG.prototype.warn = function() {
	this.consoleLog.apply(this.consoleLog, this.prependArgument(colors.yellow, arguments));
	this.log.warn.apply(this.log, arguments);
};

LOG.prototype.prettyErrorLog = function(e) {
	var PrettyError = require('pretty-error');
	var prettyError = new PrettyError();
	prettyError.withoutColors();
	prettyError.skipNodeFiles();
	console.log(colors.red(prettyError.render(e)));
};

LOG.prototype.error = function(e) {
	this.prettyErrorLog(e);
	this.log.error.apply(this.log, arguments);
};

LOG.prototype.fatal = LOG.prototype.error;

module.exports = LOG;