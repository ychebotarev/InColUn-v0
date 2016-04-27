import {ICounterCollection, IIntervalCollection, rateInterval, IRateCollection, IMetrics, IInterval, ICounter} from '../../../src/server/interfaces/interfaces'

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
	public toJSON(name:string):Object{return undefined};
}

class MockMetrics implements IMetrics{
	mockCounterCollection:MockCounterCollection;
	mockIntervalCollection:MockIntervalCollection;
	mockRateCollection:MockRateCollection;
	
	constructor(){
		this.mockCounterCollection = new MockCounterCollection();	
		this.mockIntervalCollection = new MockIntervalCollection();
		this.mockRateCollection = new MockRateCollection();
	}
	public counterCollection():ICounterCollection { return this.mockCounterCollection;}
	public intervalCollection():IIntervalCollection { return this.mockIntervalCollection;};
	public rateCollection():IRateCollection { return this.mockRateCollection;};
	public createInterval():IInterval { return new MockInterval(); };
}

export {MockMetrics}