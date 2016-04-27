/// <reference path='../../../typings/tsd.d.ts' />
import {Application,Request,Response,NextFunction} from 'express'

import {IBoard, getBoards} from '../db/board'
import {apiGuard} from '../auth/authFunctions'

function setupApiRoutes(app: Application){
    app.get('/api/boards', function(req:Request, res:Response){
		apiGuard(req,res, function(req:Request, res:Response, token:any){
			getBoards(token.id, function(success:boolean, message:string, boards?:IBoard[]) {
				res.json({ success:true, message:'', boards: boards });
			})	
		})
	});  
}

export {setupApiRoutes}