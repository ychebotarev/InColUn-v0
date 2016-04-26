/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import * as express  from 'express'
import * as chai from 'chai';
import * as mysql from 'mysql'
import * as jwt from 'jsonwebtoken';

import {processLocalLogin, processExternalLogin, processLocalSignup} from '../../src/server/auth/localStrategy'
import * as aI from '../../src/server/auth/interfaces'
import * as db from '../../src/server/db/db';
import {server_config} from '../../src/server/config'

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

describe('Local Signup', function () {
	
	it('fails if user already exist', function () {
		processLocalSignup("a@a", "a", "a",function( res:aI.localLoginResponse){
			if(!res.success){
				console.log("*************************************");
				console.log(res.message);
				console.log("*************************************");
			}
			assert.isFalse(res.success);	
		});
	});
	
	it("succesful for new user", function (done) {
		processLocalSignup("test@test", "test", "test", function(res:aI.localLoginResponse){
			if(!res.success){
				console.log("*************************************");
				console.log(res.message);
				console.log("*************************************");
			}
			assert.isTrue(res.success);
			var deleteQuery = "DELETE from users WHERE user_id_key=834624741";
			db.connectioPool.query(deleteQuery, function(error: mysql.IError, results){
				assert.isTrue(!error);
			})
			done();
		});
	});	
}) 
