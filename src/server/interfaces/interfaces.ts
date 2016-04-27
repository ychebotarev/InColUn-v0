import * as mysql from 'mysql'

export interface ICounter{
	fixate();
	changed():boolean;
	value():number;
  
  	inc(val?:number);
	
	dec(val?:number);
	reset();
	toJSON(name:string):Object;
}

export interface ICounterCollection{
	add(name:string):boolean;
	inc(name:string,n?:number);
	dec(name:string,n?:number);
	value(name:string):number;
	reset(name:string);
	interate(callback:(counter:ICounter, name:string)=>void);
	toJSON(name:string):Object;
}

export interface IIntervalCollection{
	add(name:string):boolean;
	start(name:string):boolean;
	stop(name:string):boolean;
	value(name:string):number;
	toJSON(name:string):Object;
}

export enum rateInterval{
	onesec,
	fivesec,
	onemin
}

export interface IRateCollection{
	add(name:string, interval:rateInterval)
	update(name:string, n?:number):boolean;
}

export interface IInterval{
	start()
	stop()
	
	value():number;
	toJSON(name:string):Object;
}

export interface ILogger{
	info(message:string);
	debug(message:string);
}

export interface IMetrics{
	counterCollection():ICounterCollection;
	intervalCollection():IIntervalCollection;
	rateCollection():IRateCollection;
	createInterval():IInterval;
}

export interface IDb{
	getConnection(callback: (err: mysql.IError, connection: mysql.IConnection) => void);
	pool():mysql.IPool;
	query(queryStr:string):Promise<any>;
}