'use strict';

/**
 * Memcached store
 * https://github.com/3rd-Eden/node-memcached
 */
var Memcached = require('memcached');

var debug = require('../debug').log;

module.exports = function(store) {
  var host = store.host || '127.0.0.1';
  var port = store.port || 11211;
  
  var memcached = new Memcached(host + ':' + port, store.options || {});
  memcached.on('issue', issue);
  memcached.on('failure', failure);

  return {
    set: function(key, value, lifetime, fn) {
      memcached.set(key, value, lifetime, fn);
    },
    get: function(key, fn) {
      memcached.get(key, fn);
    }
  }
};

function failure(details) {
  debug('Memcached: ' + details.server + ' went down due to: ' + details.messages.join(' '));
}
function issue(details) {
  debug('Memcached: ' + details.server + ' issue: ' + details.messages.join(' '));
}
