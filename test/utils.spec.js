/*globals describe it*/
'use strict';

var should = require('should');

var utils = require('../lib/utils');

describe('Blacklist utils', function() {
  it('should expose functions', function() {
    (typeof utils.optionalCallback).should.be.eql('function');
    (typeof utils.checkString).should.be.eql('function');
    (typeof utils.checkBoolean).should.be.eql('function');
    (typeof utils.nowInSeconds).should.be.eql('function');
    
    utils.checkString('foo');
    utils.checkBoolean(true);
  });
  
  it('checkString should throw error for non string', function() {
    try {
      utils.checkString(123);
    } catch(e) {
      should.exist(e);
    }
  });
  
  it('checkBoolean should throw error for non boolean', function() {
    try {
      utils.checkBoolean('foo');
    } catch(e) {
      should.exist(e);
    }
  });
  
  it('nowInSeconds should return timestamp number in seconds', function() {
    utils.nowInSeconds().should.be.Number();
  });
});