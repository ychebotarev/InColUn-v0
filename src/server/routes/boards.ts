/// <reference path='../../../typings/tsd.d.ts' />
import {Application, Router} from 'express'

function setupBoardsRoute(app: Application){
    
    app.use('/boards', function(req, res){
		res.render("boards");
	});
}

export {setupBoardsRoute}
