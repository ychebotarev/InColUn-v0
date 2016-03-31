/// <reference path='../../../typings/tsd.d.ts' />
import {Application, Router} from 'express'

function setupIndexRoutes(app: Application){
    
    app.use('/', function(req, res){
		res.render("index");
	});
}

export {setupIndexRoutes}