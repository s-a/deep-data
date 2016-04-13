"use strict"

var crypto = require('crypto');


var Crypter = function () {
	return this;
};

Crypter.prototype.encrypt = function(text, pwd){
  var cipher = crypto.createCipher("aes-256-ctr", pwd);
  var crypted = cipher.update(text,"utf8","hex");
  crypted += cipher.final("hex");
  return crypted;
};

Crypter.prototype.decrypt = function(text, pwd){
  var decipher = crypto.createDecipher("aes-256-ctr", pwd);
  var dec = decipher.update(text,"hex","utf8");
  dec += decipher.final("utf8");
  return dec;
};

module.exports = new Crypter();