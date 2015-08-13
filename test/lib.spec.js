/*globals describe it*/
'use strict';

var should = require('should');

var blacklist = require('../lib');

var JWT_USER = {
  iat: 1439336202,
  exp: 1439412707,
  sub: '9007F3DA-4081-11E5-9E31-A62DD5902334'
};

describe('Blacklist middleware', function() {
  it('should expose functions', function() {
    (typeof blacklist.configure).should.be.eql('function');
    (typeof blacklist.isRevoked).should.be.eql('function');
    (typeof blacklist.revoke).should.be.eql('function');
    (typeof blacklist.purge).should.be.eql('function');
  });
  
  it('should expose TYPE', function() {
    blacklist.TYPE.should.have.properties({
      revoke: 'revoke',
      purge: 'purge'
    });
  });
});

describe('Blacklist configuration', function() {
  it('should throw error on invalid store configuration', function() {
    try {
      blacklist.configure({
        store: {          
          type: 'foo'
        }
      });
    } catch(e) {
      should.exist(e);
    }
  });
  
  it('should throw error on invalid tokenId configuration', function() {
    try {
      blacklist.configure({
        tokenId: 123
      });
    } catch(e) {
      should.exist(e);
    }
  });
  
  it('should throw error on invalid keyPrefix configuration', function() {
    try {
      blacklist.configure({
        store: {
          keyPrefix: true
        }
      });
    } catch(e) {
      should.exist(e);
    }
  });
  
  it('should throw error on invalid strict configuration', function() {
    try {
      blacklist.configure({
        strict: 'foo'
      });
    } catch(e) {
      should.exist(e);
    }
  });
});

describe('Blacklist operations', function() {  
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
  
  it('revoke should revoke another JWT token', function(done) {
    JWT_USER.iat += 10;
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
