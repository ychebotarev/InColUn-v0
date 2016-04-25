"use strict";
const ewma_1 = require('../stats/ewma');
class Meter {
    constructor(alpha) {
        this.meanRate = function () {
            return this.count / ((new Date).getTime() - this.startTime) * 1000;
        };
        alpha = alpha || ewma_1.M1_ALPHA;
        this.rate = new ewma_1.EWMA(alpha);
        this.count = 0;
        this.startTime = Date.now();
    }
    mark(n) {
        if (!n) {
            n = 1;
        }
        this.count += n;
        this.rate.update(n);
    }
    rates() {
        return { rate: this.rate.rate(),
            mean: this.meanRate() };
    }
    toJSON(name) {
        return { name: name,
            type: 'meter',
            count: this.count,
            rate: this.rate.rate(),
            mean: this.meanRate(),
            unit: 'seconds' };
    }
    tick() {
        this.rate.tick();
    }
}
exports.Meter = Meter;
//# sourceMappingURL=meter.js.map