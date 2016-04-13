"use strict"

var QA = require("./qa");
var crypt  = require("./crypt.js");

var CMD = function () {
	this.description = "create a new database connection";
	return this;
};

CMD.prototype.run = function() {
	var questions = require("./qa.dbconnection");
	var qa = new QA(this, questions);

	var done = function(answers) {

		var conn = this.getdbconnection(answers.name);
		if (conn === null){
			if (!this.config.settings.dbconnections){
				this.config.settings.dbconnections = [];
			}

			answers.password = crypt.encrypt(answers.password, answers.username);
			this.config.settings.dbconnections.push(answers);
			this.config.save();
		} else {
			this.log.error("Connection name already exists");
			process.exit(1);
		}
	};

	qa.start(done);
};

module.exports = CMD;