import {logger} from './logger'
import * as metrics from './metrics'

function dumpCounters(){
	for(var name in metrics.counterCollection.counters){
		var counter = metrics.counterCollection.counters[name]; 
		if(counter.changed()){
			counter.fixate();
			logger.info(JSON.stringify(counter.toJSON(name)));
		}
	}
}

export {dumpCounters}