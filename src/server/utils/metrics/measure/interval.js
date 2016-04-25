"use strict";
class Interval {
    constructor() {
    }
    start() {
        this.startTime = Date.now();
    }
    stop() {
        this.endTime = Date.now();
    }
    value() {
        if (!this.startTime || !this.endTime) {
            return 0;
        }
        return this.endTime - this.startTime;
    }
    toJSON(name) {
        return {
            name: name,
            interval: this.value()
        };
    }
}
exports.Interval = Interval;
//# sourceMappingURL=interval.js.map