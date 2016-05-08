/// <reference path='../../../typings/tsd.d.ts' />
import {Application,Request,Response,NextFunction} from 'express'
import {tokenGuard} from '../auth/authFunctions'
import {env} from '../environment'

function setupCommonRoute(app: Application){
	app.get('/boards', function(req:Request, res:Response){
		tokenGuard(req).then(function(token:string){
			res.render("boards");
		})
		.catch( function(error:string){
			env().logger().error(error);
			//res.render("index");
			 res.redirect('/');
		})
	});  
	
	app.get('/', function(req, res){
		res.render("index");
	});

	app.use((req, res, next) => {
		var err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});
}

export {setupCommonRoute}
