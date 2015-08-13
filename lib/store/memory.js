'use strict';

/**
 * Simple in-memory cache
 * NOTE: Not recommended for production
 */

var cache = {};

module.exports = function() {
  return {
    set: function(key, value, lifetime, fn) {
      fn(null, cache[key] = value);
      if (lifetime) setTimeout(expire.bind(null, key), lifetime * 1000);
    },
    get: function(key, fn) {
      fn(null, cache[key]);
    }
  };
};

function expire(key) {
  delete cache[key];
}
