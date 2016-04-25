"use strict";
const meter_1 = require('./measure/meter');
var rateInterval;
(function (rateInterval) {
    rateInterval[rateInterval["onesec"] = 0] = "onesec";
    rateInterval[rateInterval["fivesec"] = 1] = "fivesec";
    rateInterval[rateInterval["onemin"] = 2] = "onemin";
})(rateInterval || (rateInterval = {}));
exports.rateInterval = rateInterval;
class RateCollection {
    constructor() {
        this.rates = {};
        setInterval(() => { this.update1sRates(); }, 1000);
        setInterval(() => { this.update5sRates(); }, 5 * 1000);
        setInterval(() => { this.update60sRates(); }, 60 * 1000);
    }
    add(name, interval) {
        if (this.rates[name] != undefined) {
            return false;
        }
        this.rates[name] = { rate: interval, meter: new meter_1.Meter() };
        return true;
    }
    update(name, n) {
        if (this.rates[name] != undefined) {
            this.rates[name].meter.mark(n);
            return true;
        }
        return false;
    }
    update1sRates() {
        this.updateRates(rateInterval.onesec);
    }
    update5sRates() {
        this.updateRates(rateInterval.fivesec);
    }
    update60sRates() {
        this.updateRates(rateInterval.onemin);
    }
    updateRates(interval) {
        for (var name in this.rates) {
            if (this.rates[name].rate == interval) {
                this.rates[name].meter.tick();
            }
        }
    }
}
var rateCollection = new RateCollection();
exports.rateCollection = rateCollection;
//# sourceMappingURL=rateCollection.js.map