import {Interval} from './measure/interval'

class IntervalCollection{
	intervals:{[id:string]:Interval};
	
	constructor(){
		this.intervals = {};
	}
	
	public add(name:string):boolean{
		if(this.intervals[name] != undefined){
			return false;
		}
		
		this.intervals[name] = new Interval();
		
		return true;
	}
	
	public start(name:string):boolean{
		if(this.intervals[name] != undefined){
			this.intervals[name].start();
			return true;
		}
		return false;
	}
	
	public stop(name:string):boolean{
		if(this.intervals[name] != undefined){
			this.intervals[name].stop();
			return true;
		}
		return false;
	}
	
	public value(name:string):number{
		if(this.intervals[name] != undefined){
			return this.intervals[name].value();
		}
		return undefined;
	}
	
	public toJSON(name:string):Object{
		if(this.intervals[name] != undefined){
			return this.intervals[name].toJSON(name);
		}
		return undefined;
	}
}

var intervalCollection = new IntervalCollection();
export {intervalCollection}