'use strict';

var debug = require('./debug').log;

exports.optionalCallback = function(err) {
  if (err) debug('optionalCallback:', err);
}

exports.checkString = function(val, key) {
  if (typeof val !== 'string' || val.length < 1) throw new Error('Invalid configuration [' + key + '] should be String');
}

exports.checkBoolean = function(val, key) {
  if (typeof val !== 'boolean') throw new Error('Invalid configuration [' + key + '] should be Boolean');
}

exports.nowInSeconds = function() {
  return Math.round(new Date().getTime() / 1000);
}
