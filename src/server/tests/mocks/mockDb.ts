/// <reference path='../../../../typings/tsd.d.ts' />

import {IDb} from '../..//interfaces/interfaces'
import * as mysql from 'mysql'
interface IMockResponse{
	query:string;
	results:any[]
}
class MockedQueries{
	private responses : IMockResponse[];
	constructor(){
		this.responses = []
	}
	
	public clear(){
		this.responses = []
	}
	
	public addMockQuery(query:string, results:any){
		this.responses.push({query:query, results:results})
	}
	
	public getMockResponse(query:string):any[]{
		for(var index in this.responses){
			if(this.responses[index].query.startsWith(query)){
				return this.responses[index].results;
			}
		}
		
		return undefined;
	}
}

var mockedQueries = new MockedQueries();

class MockDb implements IDb{
	public getConnection(callback: (err: mysql.IError, connection: mysql.IConnection) => void){};
	public pool():mysql.IPool{ return undefined;};
	public query(queryStr:string):Promise<any>
	{
		const p:Promise<any> = new Promise<any>((resolve,reject)=>{
			var result = this.getMockResponse(queryStr)
			if(result)
				resolve(result)
			else
				reject('no results for query: ' + queryStr);	
		})
		return p;
	};
	
	public getMockResponse(query:string):any[]{
		return mockedQueries.getMockResponse(query);
	}
}

export {MockDb, mockedQueries}