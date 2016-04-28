import {env} from '../environment'
import {ICounter} from '../interfaces/interfaces'

function dumpCounters(){
	var counters = env().metrics().counters;
	if (!counters){
		return;
	}
	
	counters.interate(function(counter:ICounter, name:string ){
		if(counter.changed()){
			counter.fixate();
			env().logger().info(JSON.stringify(counter.toJSON(name)));
		}
	})
}

export {dumpCounters}