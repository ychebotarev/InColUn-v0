/// <reference path='../../../typings/tsd.d.ts' />
import {Application, Router} from 'express'
import {webGuard} from '../auth/authFunctions'
	
function setupBoardsRoute(app: Application){
    app.get('/boards', webGuard)
    app.get('/boards', function(req, res){
		res.render("boards");
	});
}

export {setupBoardsRoute}
