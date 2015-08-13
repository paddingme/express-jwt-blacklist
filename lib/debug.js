'use strict';

var debug = false;

exports.__defineSetter__('debug', function(val) {
  debug = !!val;
});

exports.log = function(msg, meta) {
  if (!debug) return;

  meta = meta ? JSON.stringify(meta) : '';
  console.log('express-jwt-blacklist: ' + msg + ' ' + meta);
};
