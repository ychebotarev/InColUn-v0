/*
 *  Exponentially weighted moving average.
 *  Args:
 *  - alpha:
 */
"use strict";
/*
current rate will be measured per tick

If current rate is X, and target rate (real rate) is 100*X
it will take roughtly 60 iterations
for current rate to reach target rate for M1_ALPHA

*/
class EWMA {
    constructor(alpha) {
        this.alpha = alpha;
        this.currentRate = undefined;
        this.uncounted = 0;
    }
    update(n) {
        this.uncounted += (n || 1);
    }
    tick() {
        var tickRate = this.uncounted;
        this.uncounted = 0;
        if (this.currentRate) {
            this.currentRate += this.alpha * (tickRate - this.currentRate);
        }
        else {
            this.currentRate = tickRate;
        }
    }
    rate() {
        return this.currentRate * 1000;
    }
}
exports.EWMA = EWMA;
var M1_ALPHA = 1 - Math.exp(-5 / 60);
exports.M1_ALPHA = M1_ALPHA;
var M5_ALPHA = 1 - Math.exp(-5 / 60 / 5);
exports.M5_ALPHA = M5_ALPHA;
var M15_ALPHA = 1 - Math.exp(-5 / 60 / 15);
exports.M15_ALPHA = M15_ALPHA;
function createM1EWMA() {
    return new EWMA(M1_ALPHA);
}
exports.createM1EWMA = createM1EWMA;
function createM5EWMA() {
    return new EWMA(M15_ALPHA);
}
exports.createM5EWMA = createM5EWMA;
function createM15EWMA() {
    return new EWMA(M1_ALPHA);
}
exports.createM15EWMA = createM15EWMA;
//# sourceMappingURL=ewma.js.map