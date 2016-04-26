/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {Application, Router} from 'express'
import {Request,Response,NextFunction} from 'express'
import {IBoardInfo} from '../../common/interfaces'

import FlakeId = require('flake-idgen');

import {server_config} from '../config'
import * as authFunction from '../auth/authFunctions'
import * as db from '../db/db'
import * as mysql from 'mysql'
import * as metrics from '../utils/metrics'

function getFakeBoards():any{
	var docInfo = [
		{
			title: 'Statistic and machine learning on server',
			guid: 'eec39f91-8ae2-4023-b3f8-694a9561b8d5',
			created: new Date(2016, 4, 4, 18, 31, 54),
			modified: new Date(2016, 4, 4, 18, 31, 54),
			timestamp: 'AAAA'
		},
		{
			title: 'Misc on server',
			guid: 'c3cb42ff-699b-499c-bbb7-9adc722cfbc9',
			created: new Date(2016, 4, 4, 18, 31, 54),
			modified: new Date(2016, 4, 4, 18, 32, 54),
			timestamp: 'BBBB'
		},
		{
			title: 'Javascript  on server',
			guid: '29147c3e-c190-450f-bdca-cff5077a08b4',
			created: new Date(2016, 4, 4, 18, 31, 54),
			modified: new Date(2016, 4, 4, 19, 31, 54),
			timestamp: 'CCC'
		},
		{
			title:'Really really really really really long long long tiiiiiiitle  on server', 
			guid:'29147c3e-c190-450f-bdca-cff5077a08b5',
			created: new Date(2016,4,4,12,31,54),
			modified: new Date(2016,4,4,13,31,54),
			timestamp:'DDD'
		},
		{
			title:'Another Javascript on server', 
			guid:'29147c3e-c190-450f-bdca-cff5077a08b6',
			created: new Date(2016,4,4,11,31,54),
			modified: new Date(2016,4,4,16,31,54),
			timestamp:'EEE'
		}
	]
	
	return docInfo;
}

function createBoardsFromDB(results:any[]):IBoardInfo[]{
	var boards:	IBoardInfo[] = [];
    for(var i=0; i< results.length;++i){
		boards.push({
			title:results[i].title, 
			created:results[i].created,
			updated:results[i].updated,
			shared:results[i].shared,	
			saved:results[i].saved,
			kudos:results[i].kudos
		});
    }
	
	return boards;
}

function getBoards(req:Request, res:Response, token:any){
	var query = "select * from boards where userid = "+token.id;
	db.connectioPool.query(query, function(error: mysql.IError, results){
        if(error){
            metrics.counterCollection.inc('dbfail');
            res.json({ success: false, message: 'Failed to add new user. '+error.code});
            return;
        }
		
		var boards = createBoardsFromDB(results);
		res.json({ success:true, message:'', boards: boards });

	})	
}

function setupApiRoutes(app: Application){
	
    app.get('/api/boards', function(req:Request, res:Response){
		authFunction.apiGuard(req,res,getBoards)
	});  
}

export {setupApiRoutes}