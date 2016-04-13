"use strict"


var CMD = function () {
	this.description = "List available commands"
	return this;
};

CMD.prototype.run = function() {
	for (var key in this._commands) {
		if (this._commands.hasOwnProperty(key)){
			var cmd = this._commands[key];
			console.log(key, " - ", cmd.description || "no description available");
		}
	}

	console.log(this.argv, this._argvIndex);
};

module.exports = CMD;