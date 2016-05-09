/// <reference path='../../../typings/tsd.d.ts' />
import {Application,Request,Response,NextFunction} from 'express'

import {getBoards, getBoard} from '../db/board'
import {getSections} from '../db/section'
import {tokenGuard} from '../auth/authFunctions'
import {env} from '../environment'

import {IBoard, ISection} from '../../common/interfaces'

function setupApiRoutes(app: Application){
	app.get('/api/boards', function(req:Request, res:Response){
		tokenGuard(req).then(function(token:any){
			return getBoards(token.id)
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

	app.get('/api/board/:id', function(req:Request, res:Response){
		//TODO CHECK IF USER HAS ACCESS TO THIS SECTIONS
		tokenGuard(req)
		.then( function(decodedToken:any){
			
			var p1 = getSections(decodedToken.id, req.params.id);
			var p2 = getBoard(decodedToken.id, req.params.id);
			let p : [Promise<ISection[]>,Promise<IBoard>] = [p1,p2];
			
			return Promise.all(p);
			//return getSections(decodedToken.id, req.params.id) 
		})
		.then( function(results:any){
			var sections:ISection[]= results[0]
			var board:IBoard = results[1]
			res.json({ success:true, board:board, sections: sections });
		})
		.catch( function(error:string){
			env().logger().error(error);
			res.json({ success:false, message:'failed to get board' });
		})
	});  

}

export {setupApiRoutes}