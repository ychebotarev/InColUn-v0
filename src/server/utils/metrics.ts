import {rateCollection} from './metrics/rateCollection'
import {intervalCollection} from './metrics/intervalCollection'
import {counterCollection}  from './metrics/counterCollection'
import {Meter} from './metrics/measure/meter'
import {Counter} from './metrics/measure/counter'
import {Interval} from './metrics/measure/interval'

import {ICounterCollection, IIntervalCollection, rateInterval, IRateCollection, IMetrics, IInterval} from '../interfaces/interfaces'

class Metrics implements IMetrics{
	public counters:ICounterCollection;
	public intervals:IIntervalCollection;
	public rates:IRateCollection;
	
	constructor(){
		this.counters = counterCollection;
		this.intervals = intervalCollection;
		this.rates = rateCollection;
	}
	public createInterval():IInterval { return new Interval(); };
}

var metrics = new Metrics();

export {metrics}