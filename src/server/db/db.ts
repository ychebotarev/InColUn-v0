/// <reference path='../../../typings/tsd.d.ts' />
import {server_config} from '../config'

import * as mysql from 'mysql'
import {} from '../interfaces/interfaces'

var connectioPool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '!qAzXsW2',
    database : 'incolun',
    debug    :  false
});

class Db{
	public getConnection(callback: (err: mysql.IError, connection: mysql.IConnection) => void) {
    	connectioPool.getConnection(callback);
	}

	public pool():mysql.IPool{
		return connectioPool;
	}

	public query(queryStr:string):Promise<any>{
		const p:Promise<any> = new Promise<any>((resolve,reject)=>{
			connectioPool.query(queryStr, function (error: mysql.IError, results) {
				if(error){
					reject(String(error.code));
				} else{
					resolve(results)	
				}
			})
		})
		return p;
	}
}

var db = new Db();

export {db}