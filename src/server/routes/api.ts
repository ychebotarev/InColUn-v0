/// <reference path='../../../typings/tsd.d.ts' />
import {Application,Request,Response,NextFunction} from 'express'
import {IBoardInfo} from '../../common/interfaces'

import FlakeId = require('flake-idgen');

import {server_config} from '../config'
import * as authFunction from '../auth/authFunctions'
import * as mysql from 'mysql'
import {env} from '../environment'

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
 	env().db().query(query).then( function(results:any[]){
		var boards = createBoardsFromDB(results);
		res.json({ success:true, message:'', boards: boards });
	}).catch(function(error:mysql.IError){
		env().metrics().counterCollection().inc('dbfail');
		res.json({ success: false, message: 'Failed to add new user. '+error.code});
	}) 
}

function setupApiRoutes(app: Application){
    app.get('/api/boards', function(req:Request, res:Response){
		authFunction.apiGuard(req,res,getBoards)
	});  
}

export {setupApiRoutes}