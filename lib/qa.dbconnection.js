"use strict";

var questions = 
[
	{
		"type": "input",
		"message": "What' s the connection name?",
		"name": "name",
		"default" : "new connection"
	},
	{
		"type": "list",
		"message": "Choose a connection type",
		"name": "type",
		"choices": ["MSSQL"]
	},
	{
		"type": "input",
		"message": "server?",
		"default": "127.0.0.1",
		"name": "server"
	},
	{
		"type": "input",
		"message": "port?",
		"default": "1433",
		"name": "port"
	},
	{
		"type": "input",
		"message": "username?",
		"default": "dba",
		"name": "username"
	},
	{
		"type": "password",
		"message": "password?",
		"default": "sql",
		"name": "password"
	}
];

module.exports = questions;