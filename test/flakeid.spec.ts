/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import * as chai from 'chai';
import {flakeIdGenerator} from "../src/server/utils/flakeid";

var assert = chai.assert;

describe('classNames', function () {
	it('generates non empty id', function () {
		assert.isTrue(flakeIdGenerator.nextStr(1).length > 0);
	});

})
