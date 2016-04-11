"use strict";

var inquirer = require('inquirer');

var QA = function() {
	return this;
};

QA.prototype.newConnection = function(defaultNewConnectionName, done) {
	var self = this;

	inquirer.prompt([{
		type: "input",
		message: "What' s the connection name?",
		name: "key",
		default : defaultNewConnectionName || "new connection"
	}], function( name ) {

		inquirer.prompt([{
			type: "list",
			message: "Choose a connection type",
			name: "key",
			choices: self.getInstalledProviders()
		}], function( type ) {
			inquirer.prompt([{
				type: "input",
				message: "server?",
				default : "127.0.0.1",
				name: "key"
			}], function( server ) {
				inquirer.prompt([{
					type: "input",
					message: "port?",
					name: "key",
					default : "1433"
				}], function( port ) {
					inquirer.prompt([{
						type: "input",
						message: "username?",
						default : "dba",
						name: "key"
					}], function( username ) {
						inquirer.prompt([{
							type: "password",
							message: "password?",
							name: "key"
						}], function( password ) {
							self.writeConfigurationsToFilesystem({name:name.key, type:type.key, server:server.key, port:port.key, username:username.key, password:password.key});
							var config = self.openConfig(name.key);
							done(config);
						});
					});
				});
			});
		});
	});
};


module.exports = QA;