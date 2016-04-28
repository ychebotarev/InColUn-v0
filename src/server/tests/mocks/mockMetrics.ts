import {ICounterCollection, IIntervalCollection, rateInterval, IRateCollection, IMetrics, IInterval, ICounter} from '../../interfaces/interfaces'

class MockCounterCollection implements ICounterCollection{
	public add(name:string):boolean { return true};
	public inc(name:string,n?:number) {};
	public dec(name:string,n?:number) {};
	public value(name:string):number { return 0;};
	public reset(name:string) {};
	public interate(callback:(counter:ICounter, name:string)=>void){};
	public toJSON(name:string):Object{ return undefined;};
}

class MockIntervalCollection implements IIntervalCollection{
	public add(name:string):boolean { return false;};
	public start(name:string):boolean{ return false;};
	public stop(name:string):boolean{ return false;};
	public value(name:string):number{ return 0;};
	public toJSON(name:string):Object{ return undefined;};
}

class MockRateCollection implements IRateCollection{
	public add(name:string, interval:rateInterval){}
	public update(name:string, n?:number):boolean{ return false;};
}

class MockInterval{
	public start(){}
	public stop(){}
	
	public value():number{ return 0;}
	public toJSON(name:string):Object{return 'mockInterval'};
}

class MockMetrics implements IMetrics{
	counters:ICounterCollection;
	intervals:IIntervalCollection;
	rates:IRateCollection;
	
	constructor(){
		this.counters = new MockCounterCollection();	
		this.intervals = new MockIntervalCollection();
		this.rates = new MockRateCollection();
	}
	public createInterval():IInterval { return new MockInterval(); };
}

export {MockMetrics}