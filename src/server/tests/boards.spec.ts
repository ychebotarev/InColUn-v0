/// <reference path="../../../typings/tsd.d.ts" />
import * as chai from 'chai';
import { getBoards} from '../db/board'
import {IBoard} from '../interfaces/interfaces'

import {setupMockEnvironment} from './mocks/mockEnvironment'
import {mockedQueries} from './mocks/mockDb'

var assert = chai.assert;

function prepareEnvironment(){
	setupMockEnvironment();
	mockedQueries.clear();
	mockedQueries.addMockQuery("select * from boards where userid = 0",
	[
		{ id:'0', title: "board 1", created: Date.now, updated: Date.now, shared: 0, saved: 0, kudos: 0 },
		{ id:'0', title: "board 2", created: Date.now, updated: Date.now, shared: 0, saved: 0, kudos: 0 },
		{ id:'0', title: "board 3", created: Date.now, updated: Date.now, shared: 0, saved: 0, kudos: 0 },
		{ id:'0', title: "board 4", created: Date.now, updated: Date.now, shared: 0, saved: 0, kudos: 0 },
		{ id:'0', title: "board 5", created: Date.now, updated: Date.now, shared: 0, saved: 0, kudos: 0 }
	]);
}

describe('Load boards', function () {
	beforeEach(function(){
    	prepareEnvironment();
  	})
      
	it('simple acceptance test', function (done) {
		getBoards("0").then( function(boards:IBoard[]){
            assert.isTrue(boards != null && boards != undefined, "boards are undefined");
			var b:IBoard = boards[0];
			//for i in boards:
			
            assert.equal(boards.length, 5, "wrong number of boards");
			done();
		}).catch( function(error:string){
			assert.isTrue(false, error);			
			done();	
		})
	});
    
    it('simple negative test', function (done) {
        getBoards("1").then( function(boards:IBoard[]){
			assert.isTrue(false, "doesn'e suppose to get boards for id 1");			
			done();	
		}).catch( function(error:string){
			done();	
		})
    });
})
