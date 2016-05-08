/// <reference path="../../../typings/tsd.d.ts" />
import * as chai from 'chai';
import {flakeIdGenerator} from "../utils/flakeid";

var assert = chai.assert;

describe('flake ID generation', function () {
	it('generates non empty id', function () {
		assert.isTrue(flakeIdGenerator.nextStr(1).length > 0);
	});
	
	it('two consecutive ids', function () {
		var id1 = flakeIdGenerator.nextStr(1,1);
		var id2 = flakeIdGenerator.nextStr(1,1);
		
		assert.isTrue(id1 != id2);
	});
})