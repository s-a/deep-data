"use strict"

var glob  = require("glob");
var path  = require("path");


var ClientCommands = function(){
	return this;
};

ClientCommands.prototype.extend = function(config) {
	this.config = config;

	this.config.client._argvIndex = 0;
	if (!this.config.client._commands) {
	 	this.config.client._commands = {};
	}
	this.getCommands();
	this.config.client._execute = this.execute.bind(this.config.client);
};


ClientCommands.prototype.getCommands = function() {
	//var result = {};
	var namespaceDeepnes = this.config.prefix.match(/\./g).length; //logs 3
	console.log("x", namespaceDeepnes);
	var filemask = path.join(this.config.dir, this.config.prefix + "*.js");
	var files = glob.sync( filemask );
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var name = path.basename(file).replace(this.config.prefix, "").replace(".js","");

		if ((name.match(/\./g) || []).length === namespaceDeepnes - 1){
			var Mod = require(file);
			this.config.client._commands[name] = new Mod();
		}
	}
};

ClientCommands.prototype.execute = function() {
	if (this.argv._.length === 0){
		throw new this.Exception.Error("No argument given");
	}

	if (this._commands[this.argv._[this._argvIndex]] && this._commands[this.argv._[this._argvIndex]].run){
		this._argvIndex = this._argvIndex + 1;
		this._commands[this.argv._[this._argvIndex-1]].run.bind(this)();
	} else {
		throw new this.Exception.Error("Command not found");
	}
};

module.exports = new ClientCommands();