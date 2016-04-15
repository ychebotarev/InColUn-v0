/// <reference path='../../../typings/tsd.d.ts' />
import {Application, Router} from 'express'

function setupIndexRoutes(app: Application){
    
    app.get('/', function(req, res){
		res.render("index");
	});
}

export {setupIndexRoutes}
    