'use strict';

/**
 * Redis store
 * https://github.com/NodeRedis/node_redis
 */
var redis = require('redis');

var blacklist = require('../');
var debug = require('../debug').log;

module.exports = function(store) {
  var host = store.host || '127.0.0.1';
  var port = store.port || 6379;
  
  var client = redis.createClient(port, host, store.options || {});
  client.on('error', error);
  
  return {
    set: function(key, value, lifetime, fn) {
      client.hmset(key, value, fn);
      if (lifetime) client.expire(key, lifetime);
    },
    get: function(key, fn) {
      client.hgetall(key, function(err, res) {
        // De-serialize comma separated value to iat numbers
        if (res && res[blacklist.TYPE.revoke]) {
          res[blacklist.TYPE.revoke] = res[blacklist.TYPE.revoke].split(',').map(function(i) {
            return parseInt(i, 10);
          });
        }
        fn(err, res);
      });
    }
  }
};

function error(err) {
  debug('Redis: ' + err);
}
