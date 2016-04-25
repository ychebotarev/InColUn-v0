"use strict";
const counter_1 = require('./measure/counter');
class CounterCollection {
    constructor() {
        this.counters = {};
    }
    add(name) {
        if (this.counters[name] != undefined) {
            return false;
        }
        this.counters[name] = new counter_1.Counter();
        return true;
    }
    inc(name, n) {
        if (this.counters[name] === undefined) {
            this.add(name);
        }
        this.counters[name].inc(n);
    }
    dec(name, n) {
        if (this.counters[name] != undefined) {
            this.counters[name].dec(n);
            return true;
        }
        return false;
    }
    value(name) {
        if (this.counters[name] != undefined) {
            return this.counters[name].value();
        }
        return undefined;
    }
    reset(name) {
        if (this.counters[name] != undefined) {
            return this.counters[name].reset();
        }
    }
    toJSON(name) {
        if (this.counters[name] != undefined) {
            return this.counters[name].toJSON(name);
        }
        return undefined;
    }
}
var counterCollection = new CounterCollection();
exports.counterCollection = counterCollection;
//# sourceMappingURL=counterCollection.js.map