/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import * as express  from 'express'
import * as chai from 'chai';

import {processLocalLogin, processExternalLogin, processLocalSignup} from '../src/server/auth/localStrategy'
import * as aI from './../src/server/auth/interfaces'

var assert = chai.assert;

describe('localLogin', function () {
	it('fails if have wrong password', function () {
		processLocalLogin("a@a", "b", function( res:aI.localLoginResponse){
			assert.isFalse(res.success);	
		});
	});
	
	it("fails if user doesn't exist", function () {
		processLocalLogin("a@b", "a", function(res:aI.localLoginResponse){
			assert.isFalse(res.success);	
		});
	});

	it("succesful for proper user", function () {
		processLocalLogin("a@a", "a", function(res:aI.localLoginResponse){
			assert.isTrue(res.success);	
		});
	});
})
