/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import * as express  from 'express'
import * as chai from 'chai';

import {processLocalLogin, processExternalLogin, processLocalSignup} from '../../src/server/auth/localStrategy'
import * as aI from '../../src/server/auth/interfaces'

var assert = chai.assert;

describe('Local login', function () {
	it('should fail if password is wrong', function (done) {
		processLocalLogin("a@a", "b", function( res:aI.localLoginResponse){
			assert.isFalse(res.success);	
			done();
		});
	});
	
	it("should fails user doesn't exist", function (done) {
		processLocalLogin("a@b", "a", function(res:aI.localLoginResponse){
			assert.isFalse(res.success);
			done();	
		});
	});

	it("should succeseed for proper user", function (done) {
		processLocalLogin("a@a", "a", function(res:aI.localLoginResponse){
			assert.isTrue(res.success);
			done();	
		});
	});
})

describe('Local signup', function () {
})