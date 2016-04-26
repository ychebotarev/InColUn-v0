import crypto = require('crypto');
import {Request,Response,NextFunction} from 'express'
import {server_config} from '../config'

import * as jwt from 'jsonwebtoken';
import * as db from '../db/db'
import * as metrics from '../utils/metrics'
import * as aI from './interfaces'
import {processLocalLogin, processExternalLogin, processLocalSignup} from './localStrategy' 

function localSignup(req:Request, res:Response){
	processLocalSignup(req.body.email, req.body.name, req.body.password, function(localRes:aI.localLoginResponse){
		res.json(localRes);
	});
}

function localLogin(req:Request, res:Response) {
	processLocalLogin(req.body.email, req.body.password, function(localRes:aI.localLoginResponse){
		res.json(localRes);
	});
}

function externalLogin(user_id:string, displayName:string, provider:string, done){
    processExternalLogin(user_id, displayName, provider, function(errorMsg:string, user:aI.userToken){
		done(errorMsg, user);
	})
}

function facebookLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        externalLogin(profile.id, profile.displayName,'F', done);
    })
};

function googleLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        externalLogin(profile.id, profile.displayName, 'G', done);
    });
}

function apiGuard(req:Request, res:Response, callback:(req:Request, res:Response, token:any)=>void) {
	var token = req.body.token || req.param('token') 
        || req.headers['x-access-token']
        || req.cookies.access_token;

	if (token) {
		jwt.verify(token, server_config.secret, function(err, decodedToken) {			
			if (err) {
				res.json({ success: false, message: 'Failed to authenticate token.' });		
				return;
			} 
			callback(req,res, decodedToken);
		});
		return;
	}

	res.status(403).send({ 
		success: false, 
		message: 'No token provided.'
	});
}

function webGuard(req:Request, res:Response, next:NextFunction) {
	var token = req.body.token || req.param('token') 
        || req.headers['x-access-token']
        || req.cookies.access_token;

	if (token) {
		jwt.verify(token, server_config.secret, function(err, decoded) {			
			if (err) {
				res.redirect('/login');		
				return;
			} 
			req.params.decoded = decoded;	
			next();
		});
		return;
	}
    res.redirect('/login');		
}

export {facebookLogin, googleLogin, localLogin, localSignup, apiGuard, webGuard}