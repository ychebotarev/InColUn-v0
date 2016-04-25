"use strict";
/* JavaScript uses double-precision FP for all numeric types.
 * Perhaps someday we'll have native 64-bit integers that can safely be
 * transported via JSON without additional code, but not today. */
var MAX_COUNTER_VALUE = Math.pow(2, 32); // 4294967296
class Counter {
    constructor() {
        this.count = 0;
        this.prevCount = 0;
    }
    fixate() {
        this.prevCount = this.count;
    }
    changed() {
        return this.prevCount != this.count;
    }
    value() {
        return this.count;
    }
    inc(val) {
        if (!val) {
            val = 1;
        }
        this.count += val;
        // Wrap counter if necessary.
        if (this.count > MAX_COUNTER_VALUE) {
            this.count -= (MAX_COUNTER_VALUE + 1);
        }
    }
    dec(val) {
        if (!val) {
            val = 1;
        }
        this.count -= val;
        if (this.count < 0) {
            this.count = 0;
        }
    }
    reset() {
        this.count = 0;
    }
    toJSON(name) {
        return {
            name: name,
            count: this.value()
        };
    }
}
exports.Counter = Counter;
//# sourceMappingURL=counter.js.map