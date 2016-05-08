/// <reference path='../../../typings/tsd.d.ts' />
import {Application,Request,Response,NextFunction} from 'express'

import {getBoards} from '../db/board'
import {getSections} from '../db/section'
import {tokenGuard} from '../auth/authFunctions'
import {env} from '../environment'

import {IBoard, ISection} from '../interfaces/interfaces'

function setupApiRoutes(app: Application){
	app.get('/api/boards', function(req:Request, res:Response){
		tokenGuard(req).then(function(token:string){
			return getBoards(token)
		}).then(function (boards:IBoard[]){
			res.json({ success:true, message:'', boards: boards });
		})
		.catch( function(error:string){
			env().logger().error(error);
			res.json({ success:false, message:'failed to get boards' });
		})
	});  
	
	/*
	app.get('/api/recent', function(req:Request, res:Response){
		apiGuard(req,res, function(req:Request, res:Response, token:any){
			getRecent(token.id, function(success:boolean, message:string, boards?:IBoard[]) {
				res.json({ success:true, message:'', boards: boards });
			})	
		}
	});*/

	app.get('/api/board:id', function(req:Request, res:Response){
		tokenGuard(req)
		.then( function(decodedToken:any){
			return getSections(decodedToken.id, req.params.guid) 
		})
		.then( function(sections:ISection[]){
			res.json({ success:true, message:'', sections: sections });
		})
		.catch( function(error:string){
			env().logger().error(error);
			res.json({ success:false, message:'failed to get board' });
		})
	});  

}

export {setupApiRoutes}