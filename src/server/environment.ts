import {ILogger, IDb, IMetrics} from './interfaces/interfaces' 

interface IEnvironment{
	logger():ILogger
	db():IDb,
	metrics():IMetrics

	setLogger(logger:ILogger);
	setDb(db:IDb);
	setMetrics(metrics:IMetrics);
};

class Environment implements IEnvironment{
	private loggerImpl:ILogger;
	private dbImpl:IDb;
	private metricsImpl:IMetrics;
	
	constructor(logger:ILogger, db:IDb, metrics:IMetrics){
		this.loggerImpl = logger;
		this.dbImpl = db;
		this.metricsImpl = metrics;
	}
	
	public setLogger(logger:ILogger){
		this.loggerImpl = logger;
	}
	public setDb(db:IDb){
		this.dbImpl = db;
	}
	public setMetrics(metrics:IMetrics){
		this.metricsImpl = metrics;
	}
	
	public logger():ILogger{
		return this.loggerImpl;
	}	
	public db():IDb{
		return this.dbImpl;
	}	
	public metrics():IMetrics{
		return this.metricsImpl;
	}	
}

var environment:IEnvironment = new Environment(null, null, null);

function setEnvironment(env:IEnvironment){
	environment = env;
}

function env(){
	return environment;
} 

export{env, setEnvironment}