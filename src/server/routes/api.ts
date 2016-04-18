/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {Application, Router} from 'express'

import FlakeId = require('flake-idgen');

import {server_config} from '../config'

function setupApiRoutes(app: Application, passport:Passport){
    var router = Router();
        
    router.get('/boards', function(req, res){
		res.json({ SecretData: 'abc123' });
	});        
    router.get('/board/:guid', function(req, res){
		res.json({ SecretData: 'abc123' });
	});
    
    router.get('/boar/:guid/:section', function(req, res){
		res.json({ SecretData: 'abc123' });
	});
    
    app.use('/api', router);        
}

export {setupApiRoutes}