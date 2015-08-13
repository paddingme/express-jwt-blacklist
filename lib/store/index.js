'use strict';

/**
 * Supported store types
 */
var TYPE = ['memory', 'memcached', 'redis'];

module.exports = function(store) {
  if (TYPE.indexOf(store.type) === -1) throw new Error('Invalid configuration [store.type] ' + store.type);
  return require('./' + store.type)(store);
};
