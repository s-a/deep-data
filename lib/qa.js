"use strict";

var inquirer = require('inquirer');

var QA = function(client, questions) {
	this.client = client;
	this.questions = questions;
	return this;
};

QA.prototype.start = function(done) {
	inquirer.prompt(this.questions).then(done.bind(this.client));
};

module.exports = QA;