/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
import * as chai from 'chai';

import {IAuthResponse} from '../interfaces/interfaces'
import {processLocalLogin} from '../auth/processAuth'
import {env} from '../environment'
import {MockLogger} from './mocks/mockLogger'
import {MockMetrics} from './mocks/mockMetrics'
import {db} from '../db/db'

var assert = chai.assert;

function setupMockEnvironment(){
	var logger = new MockLogger();
	var metrics = new MockMetrics();
	env().setDb(db);
	env().setLogger(logger);
	env().setMetrics(metrics);
}

function prepareEnvironment(){
	setupMockEnvironment();
}

describe('Local login using DB', function () {
	beforeEach(function(){
    	prepareEnvironment();
  	})
	  
	
	it("should fails user doesn't exist", function (done) {
		processLocalLogin("a@b", "a").then((unused:string)=>{
			assert.isTrue(false, 'Login passed. But it should not');	
			done()
		}).catch((unused:string)=>{
			done();
		})
	});

	it("should fails - wrong password", function (done) {
		processLocalLogin("a@a", "b").then((unused:string)=>{
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
})