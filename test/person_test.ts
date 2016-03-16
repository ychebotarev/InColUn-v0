/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import * as chai from 'chai';
import {Person} from "../source/Person";

var expect = chai.expect;

describe('Person tests:', () => {

    describe('Simple person test', () => {
        var p = new Person("John");
        it('should be John', (done) => {
            expect(p.getName()).to.equals("John");
            done();
        });

        it('should not be Mary', (done) => {
            expect(p.getName()).to.not.equals("Mary");
            done();
        });
    });
});
