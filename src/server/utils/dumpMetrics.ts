import {env} from '../environment'
import {ICounter} from '../interfaces/interfaces'

function dumpCounters(){
	var counterCollection = env().metrics().counterCollection();
	if (!counterCollection){
		return;
	}
	
	counterCollection.interate(function(counter:ICounter, name:string ){
		if(counter.changed()){
			counter.fixate();
			env().logger().info(JSON.stringify(counter.toJSON(name)));
		}
		
	})
}

export {dumpCounters}