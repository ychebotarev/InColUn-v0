import {ICounter, ICounterCollection} from '../../interfaces/interfaces'
import {Counter} from './measure/counter'

class CounterCollection implements ICounterCollection{
	private counters:{[id:string]:Counter};
	
	constructor(){
		this.counters = {};
	}
	
	public add(name:string):boolean{
		if(this.counters[name] != undefined){
			return false;
		}
		
		this.counters[name] = new Counter();
		
		return true;
	}
	
	public inc(name:string,n?:number){
		if(this.counters[name] === undefined){
			this.add(name);
		}
		this.counters[name].inc(n);
	}
	
	public dec(name:string,n?:number):boolean{
		if(this.counters[name] != undefined){
			this.counters[name].dec(n);
			return true;
		}
		return false;
	}
	
	public value(name:string):number{
		if(this.counters[name] != undefined){
			return this.counters[name].value();
		}
		return undefined;
	}
	
	public reset(name:string){
		if(this.counters[name] != undefined){
			return this.counters[name].reset();
		}
	}
	
	public toJSON(name:string):Object{
		if(this.counters[name] != undefined){
			return this.counters[name].toJSON(name);
		}
		return undefined;
	}
	
	public interate(callback:(counter:ICounter, name:string)=>void){
		for(var name in this.counters){
			var counter = this.counters[name]; 
			callback(counter, name);
		}
	}
}

var counterCollection = new CounterCollection();

export {counterCollection}