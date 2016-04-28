/// <reference path='../../../typings/tsd.d.ts' />
import * as winston from 'winston' 
import {ILogger} from '../interfaces/interfaces'

var util    = require('util');

var winston_logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 52428800, //50MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
})

function logHttpRequests() {
    return function(req, res, next) {
      req.profileInfo = util.format('HTTP %s %s', req.method, req.originalUrl);
      winston_logger.info(req.profileInfo);

      next();
    };
}

class Logger implements ILogger{
	public info(message:string){
		winston_logger.info(message);
	}
	
	public debug(message:string){
		winston_logger.debug(message);
	}
    
    public error(message:string){
        winston_logger.error(message);
    }
    public messages():string[]{
        return undefined;
    }
    public clear(){
    }
}

var logger = new Logger();

export {logger,logHttpRequests}