/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {Application, Router} from 'express'

import FlakeId = require('flake-idgen');

import {server_config} from '../config'
import * as authFunction from '../auth/authFunctions'

function getFakeBoards():any{
	var docInfo = [
		{
			title: 'Statistic and machine learning on server',
			guid: 'eec39f91-8ae2-4023-b3f8-694a9561b8d5',
			created: new Date(2016, 4, 4, 18, 31, 54),
			modified: new Date(2016, 4, 4, 18, 31, 54),
			timestamp: 'AAAA'
		},
		{
			title: 'Misc on server',
			guid: 'c3cb42ff-699b-499c-bbb7-9adc722cfbc9',
			created: new Date(2016, 4, 4, 18, 31, 54),
			modified: new Date(2016, 4, 4, 18, 32, 54),
			timestamp: 'BBBB'
		},
		{
			title: 'Javascript  on server',
			guid: '29147c3e-c190-450f-bdca-cff5077a08b4',
			created: new Date(2016, 4, 4, 18, 31, 54),
			modified: new Date(2016, 4, 4, 19, 31, 54),
			timestamp: 'CCC'
		},
		{
			title:'Really really really really really long long long tiiiiiiitle  on server', 
			guid:'29147c3e-c190-450f-bdca-cff5077a08b5',
			created: new Date(2016,4,4,12,31,54),
			modified: new Date(2016,4,4,13,31,54),
			timestamp:'DDD'
		},
		{
			title:'Another Javascript on server', 
			guid:'29147c3e-c190-450f-bdca-cff5077a08b6',
			created: new Date(2016,4,4,11,31,54),
			modified: new Date(2016,4,4,16,31,54),
			timestamp:'EEE'
		}
	]
	
	return docInfo;
}

function setupApiRoutes(app: Application){
	
	app.use('/api/boards', authFunction.apiGuard);
	app.use('/api/boards/:guid', authFunction.apiGuard);
	
    var router = Router();
        
    router.get('/boards', function(req, res){
		
		res.json({ boards: getFakeBoards() });
	});        
    router.get('/board/:guid', function(req, res){
		res.json({ SecretData: 'abc123' });
	});
    
    
    app.use('/api', router);        
}

export {setupApiRoutes}