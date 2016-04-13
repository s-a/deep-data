#!/usr/bin/env node

"use strict";


var Client = require("./client");
var client = new Client();

var run = function run() {
	try{
		client.log.trace("done");
		client.log.debug("done");
		client.log.info("done");
		client.log.warn("done");

		client._execute();
	} catch(e){
		var exceptionType = e.constructor.name.toLowerCase();
		if (client.log[exceptionType]){
			client.log[exceptionType](e);
		} else {
			client.log.fatal(e);
		}
	}
};



process.on('exit', function(code){
	client.log.info("exit", code);
});

process.on('uncaughtException', function(e){
	console.log(e);
	client.log.error(new Error(e));
});

run();