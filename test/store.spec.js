/*globals describe it*/
'use strict';

var should = require('should');

var blacklist = require('../lib');

var JWT_USER = {
  iat: 1439336202,
  exp: 1439412707,
  sub: '9007F3DA-4081-11E5-9E31-A62DD5902334'
};

var cache = {};

describe('Blacklist custom store', function() {  
  beforeEach(function() {
    blacklist.configure({
      store: {
        get: function(key, callback) {
          callback(null, cache[key]);
        },
        set: function(key, data, lifetime, callback) {
          callback(null, cache[key] = data);
        }
      }
    });
  });
  
  it('isRevoked should return false', function(done) {
    blacklist.isRevoked({}, JWT_USER, function(err, revoked) {
      should.not.exist(err);
      revoked.should.be.false();
      done();
    });
  });
  
  it('revoke should revoke JWT token', function(done) {
    blacklist.revoke(JWT_USER, function(err, revoked) {
      should.not.exist(err);
      done();
    });
  });
  
  it('isRevoked should return true', function(done) {
    blacklist.isRevoked({}, JWT_USER, function(err, revoked) {
      should.not.exist(err);
      revoked.should.be.true();
      done();
    });
  });
});