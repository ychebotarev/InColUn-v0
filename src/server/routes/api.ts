/// <reference path='../../../typings/tsd.d.ts' />
import {Application,Request,Response,NextFunction} from 'express'

import {IBoard, getBoards} from '../db/board'
import {ISection, getSections} from '../db/section'
import {apiGuard} from '../auth/authFunctions'
import {env} from '../environment'

function setupApiRoutes(app: Application){
    
	app.get('/api/boards', function(req:Request, res:Response){
		apiGuard(req,res, function(req:Request, res:Response, token:any){
			getBoards(token.id, function(success:boolean, message:string, boards?:IBoard[]) {
				res.json({ success:true, message:'', boards: boards });
			})	
		})
	});  

	app.get('/api/board:guid', function(req:Request, res:Response){
		apiGuard(req,res, function(req:Request, res:Response, token:any){
			getSections(token.id, req.params.guid).then(function(sections:ISection[]){
				res.json({ success:true, message:'', sections: sections });
			}).catch(function (message:string) {
				env().logger().error(message);
				res.json({ success:false, message:message});
			})
		})
	});  

}

export {setupApiRoutes}