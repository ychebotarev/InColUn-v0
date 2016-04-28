/// <reference path="../../../typings/tsd.d.ts" />
import * as chai from 'chai';
import {ISection, getSections} from '../db/section'

import {setupMockEnvironment} from './mocks/mockEnvironment'
import {mockedQueries} from './mocks/mockDb'
import {env} from '../environment'
var assert = chai.assert;

function getSection(id:string, sections:ISection[]):ISection{
    for(var index in sections){
        if(sections[index].id == id){
            return sections[index];
        }
    }
    return undefined;
}

function getTotalSections(sections:ISection[]):number{
    if (!sections){
        return 0;
    }
    var result = 0;
    for(var index in sections){
        result+=1;
        result+=getTotalSections(sections[index].childs);
    }
    return result;
}

function prepareEnvironment(){
	setupMockEnvironment();
	mockedQueries.clear();
	mockedQueries.addMockQuery("select * from sections where boardid = 0",
	[
		{ id:'1', boardid:'0', parentid:'0', title: "section 1" },
		{ id:'2', boardid:'0', parentid:'0', title: "section 2" },
		{ id:'3', boardid:'0', parentid:'1', title: "section 3" },
		{ id:'4', boardid:'0', parentid:'2', title: "section 4" },
		{ id:'5', boardid:'0', parentid:'4', title: "section 5" },
        { id:'6', boardid:'0', parentid:'5', title: "section 5" },
        { id:'7', boardid:'0', parentid:'1', title: "section 5" },
        { id:'8', boardid:'0', parentid:'1', title: "section 5" }
	]);
}

describe('Load sections', function () {
	beforeEach(function(){
    	prepareEnvironment();
        env().logger().clear();
  	})
      
	it('simple acceptance test', function (done) {
		getSections("0","0")
            .then(function(sections:ISection[]){
                assert.isTrue(sections != null && sections != undefined, "sections are undefined");
                assert.equal(sections.length, 2, "wrong number of sections");
                assert.equal(getTotalSections(sections), 8, "wrong total number of sections")
                
                var section_1 = getSection('1', sections)
                assert.isNotNull(section_1);
                assert.equal(section_1.childs.length, 3, "wrong number of sections for id = 1");

                var section_2 = getSection('2', sections)
                assert.isNotNull(section_2);
                assert.equal(section_2.childs.length, 1, "wrong number of sections for id = 2");

                var section_4 = getSection('4', section_2.childs)
                assert.isNotNull(section_4);
                assert.equal(section_4.childs.length, 1, "wrong number of sections for id = 4");

                var section_5 = getSection('5', section_4.childs)
                assert.isNotNull(section_5);
                assert.equal(section_5.childs.length, 1, "wrong number of sections for id = 5");

                var section_6 = getSection('6', section_5.childs)
                assert.isNotNull(section_6);
                assert.equal(section_6.childs.length, 0, "wrong number of sections for id = 6");
                
                var section_N = getSection('N', sections)
                assert.isUndefined(section_N);

                done();
		    }).catch(function(message:string){
                console.log(message);
                assert.isTrue(false, message);
                done();
            });
	});
    
    it('simple negative test', function (done) {
        getSections("0","1")
            .then(function(sections:ISection[]){
                assert.isTrue(false, 'No failed');
                done();
            }).catch(function (message:string) {
                done();
            })
    });
    
	afterEach(function(){
    	var messages:string[] = env().logger().messages();
		messages.forEach(message => console.log(message))
		env().logger().clear();
  	})
    
})
