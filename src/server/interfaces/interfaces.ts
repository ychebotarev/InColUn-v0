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
	error(message:string);
	messages():string[];
	clear();
}

export interface IMetrics{
	counters:ICounterCollection;
	intervals:IIntervalCollection;
	rates:IRateCollection;
	createInterval():IInterval;
}

export interface IDb{
	getConnection(callback: (err: mysql.IError, connection: mysql.IConnection) => void);
	pool():mysql.IPool;
	query(queryStr:string):Promise<any>;
}

export interface ISection{
    id:string,
    title:string,
    childs:ISection[]
}

export interface IBoard{
    id:string,
    title:string,
    created:Date,
    updated:Date,
    shared:number,
    saved:number,
    kudos:number,
	sections?:ISection[]
}