/// <reference path='../../../typings/tsd.d.ts' />

import {IDb} from '../../../src/server/interfaces/interfaces'
import * as mysql from 'mysql'

class MockDb implements IDb{
	public getConnection(callback: (err: mysql.IError, connection: mysql.IConnection) => void){};
	pool():mysql.IPool{ return undefined;};
	query(queryStr:string):Promise<any>
	{
		const p:Promise<any> = new Promise<any>((resolve,reject)=>{
			resolve(results)	
		})
		return p;
	};
}

export {MockDb}