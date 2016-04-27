/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import * as express  from 'express'
import * as chai from 'chai';
import * as mysql from 'mysql'
import * as jwt from 'jsonwebtoken';


import {IAuthResponse} from '../../src/server/auth/IAuthResponse'
import * as db from '../../src/server/db/db';
import {server_config} from '../../src/server/config'
import {processLocalLogin, processExternalLogin, processLocalSignup} from '../../src/server/auth/processAuth'

var assert = chai.assert;

describe('Local login', function () {
	
	it('should fail if password is wrong', function (done) {
		processLocalLogin("a@a", "b", function(authResponse:IAuthResponse){
			assert.isFalse(authResponse.success);	
			done();
		});
	});
	
	it("should fails user doesn't exist", function (done) {
		processLocalLogin("a@b", "a", function(authResponse:IAuthResponse){
			assert.isFalse(authResponse.success);
			done();	
		});
	});

	it("should succeseed for proper user", function (done) {
		processLocalLogin("a@a", "a", function(authResponse:IAuthResponse){
			assert.isTrue(authResponse.success);
			done();	
		});
	});
})

describe('Local Signup', function () {
	
	it('fails if user already exist', function () {
		processLocalSignup("a@a", "a", "a",function(authResponse:IAuthResponse){
			if(!authResponse.success){
				console.log("*************************************");
				console.log(authResponse.message);
				console.log("*************************************");
			}
			assert.isFalse(authResponse.success);	
		});
	});
	
	it("succesful for new user", function (done) {
		processLocalSignup("test@test", "test", "test", function(authResponse:IAuthResponse){
			if(!authResponse.success){
				console.log("*************************************");
				console.log(authResponse.message);
				console.log("*************************************");
			}
			assert.isTrue(authResponse.success);
			var deleteQuery = "DELETE from users WHERE user_id_key=834624741";
			db.connectioPool.query(deleteQuery, function(error: mysql.IError, results){
				assert.isTrue(!error);
			})
			done();
		});
	});	
}) 
