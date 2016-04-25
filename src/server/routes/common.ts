/// <reference path='../../../typings/tsd.d.ts' />
import {Application, Router} from 'express'
import {webGuard} from '../auth/authFunctions'
	
function setupCommonRoute(app: Application){
    app.get('/boards', webGuard)
    app.get('/boards', function(req, res){
		res.render("boards");
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
