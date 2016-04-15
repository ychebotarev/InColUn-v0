/// <reference path='../../../typings/tsd.d.ts' />
import {Application, Router} from 'express'

function setupBoardsRoute(app: Application){
    
    app.get('/boards', function(req, res){
		res.render("boards");
	});
}

export {setupBoardsRoute}
