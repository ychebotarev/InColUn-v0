/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import * as chai from 'chai';

import {Person} from "../source/Person";
import {Greeter} from "../source/Greeter";

var expect = chai.expect;

/**
 * Unit tests
 */

describe("Testing greetings", () => {
    var p = new Person("John");
    var g = new Greeter(p);

    it("Basic Test", () =>
    {
        var greeting = g.getGreeting();
        chai.assert(greeting == g.getPrefix() + p.getName(), "Check if basic greeting work");
    });

    it("Changing greeting prefix", () => {
        var new_prefix = "Hi from";
        g.setPrefix(new_prefix);
        chai.assert(new_prefix == g.getPrefix(), "Check if basic prefix was changed");

        var greeting = g.getGreeting();
        chai.assert(greeting == new_prefix + p.getName(), "Check if greeting still work");   
    });
});
