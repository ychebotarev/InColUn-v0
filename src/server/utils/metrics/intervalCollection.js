"use strict";
const interval_1 = require('./measure/interval');
class IntervalCollection {
    constructor() {
        this.intervals = {};
    }
    add(name) {
        if (this.intervals[name] != undefined) {
            return false;
        }
        this.intervals[name] = new interval_1.Interval();
        return true;
    }
    start(name) {
        if (this.intervals[name] != undefined) {
            this.intervals[name].start();
            return true;
        }
        return false;
    }
    stop(name) {
        if (this.intervals[name] != undefined) {
            this.intervals[name].stop();
            return true;
        }
        return false;
    }
    value(name) {
        if (this.intervals[name] != undefined) {
            return this.intervals[name].value();
        }
        return undefined;
    }
    toJSON(name) {
        if (this.intervals[name] != undefined) {
            return this.intervals[name].toJSON(name);
        }
        return undefined;
    }
}
var intervalCollection = new IntervalCollection();
exports.intervalCollection = intervalCollection;
//# sourceMappingURL=intervalCollection.js.map