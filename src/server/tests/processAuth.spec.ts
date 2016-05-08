/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
import * as chai from 'chai';

import {IAuthResponse} from '../interfaces/interfaces'
import {murmurhash3_32_gc} from '../utils/murmurhash3_gc'
import {processLocalLogin, processExternalLogin, processLocalSignup} from '../auth/processAuth'
import {setupMockEnvironment} from './mocks/mockEnvironment'
import {mockedQueries} from './mocks/mockDb'
import {env} from '../environment'

var assert = chai.assert;

function prepareEnvironment(){
	setupMockEnvironment();
	mockedQueries.clear();
	var profile_id_1:number = murmurhash3_32_gc("a@a", 1001);
	mockedQueries.addMockQuery("SELECT * from users WHERE profile_id="+profile_id_1,
	[{
		id:0,
		profile_id:profile_id_1,
		username:'a',
		email:'a@a',
		password:'2ebb8efcaa00598520e7b4fdc7d3a6630bcb13f0'
	}]);
	
	var profile_id_2:number = murmurhash3_32_gc("a@a", 1001);
	mockedQueries.addMockQuery("SELECT * from users WHERE profile_id="+profile_id_2, null);
}

describe('Local login', function () {
	beforeEach(function(){
    	prepareEnvironment();
  	})
	  	
	it('should fail because password is wrong', function (done) {
		processLocalLogin("a@a", "b").then((unused:string)=>{
			assert.isTrue(false, 'Login user passed. But it should not');	
			done()
		}).catch((unused:string)=>{
			done();
		})
	});
	
	it("should fails user doesn't exist", function (done) {
		processLocalLogin("a@b", "a").then((unused:string)=>{
			assert.isTrue(false, 'Login passed. But it should not');	
			done()
		}).catch((unused:string)=>{
			done();
		})
	});

	it("should succeseed for proper user", function (done) {
		processLocalLogin("a@a", "a").then( (unused:string) =>{
			done();
		} )
		.catch((error:string)=>{
			assert.isTrue(false, error);
			done();
		})
	});
	
	afterEach(function(){
    	var messages:string[] = env().logger().messages();
		messages.forEach(message => console.log(message))
		env().logger().clear();
  	})
})
/*
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
			done();
		});
	});	
})*/ 
