import * as jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express'

import {server_config} from '../config'

var cache = require('im-cache');

function facebookLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        var user = cache.get("id-"+profile.id);
        if(user){
            return done(null, user);
        }
        var newUser = {id:profile.id, type:"FB", displayName:profile.displayName, email:'NA', password:'NA', token:accessToken }
        cache.set("id-"+profile.id, newUser);
        
        return done(null, newUser);
    });
}

function googleLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        var user = cache.get("id-"+profile.id);
        if(user){
            return done(null, user);
        }
        var newUser = {id:profile.id, type:"G", displayName:profile.displayName, email:'NA', password:'NA', token:accessToken}
        cache.set("id-"+profile.id, newUser);
        
        return done(null, newUser);
    });
}

function localSignup(req:Request, res:Response){
	var user = cache.get("id-"+req.body.email);	
	if(user){
		res.json({ success: false, message: 'Signup failed. User already exist.' });
		return;
	}

	var email = req.body.email;
	var displayName = req.body.name;
	var password = req.body.password;
	var token = 'NA';
	var newUser = {id:email, type:"L", displayName:displayName, email:email, password:password, token:'NA'}
	cache.set("id-"+email, newUser);

	var token = jwt.sign(newUser, server_config.secret, { expiresIn: '24h'});

	res.json({ success: true, message: 'Signup success. Enjoy your token!', token: token });
}

function localLogin(req:Request, res:Response) {
	var user = cache.get("id-"+req.body.email);
	if (!user){
		res.json({ success: false, message: 'Authentication failed. User not found.' });
		return;
	}

	if (user.password != req.body.password) {
		res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		return;
	} 

	var token = jwt.sign( {id:user.id, displayName:user.displayName}, server_config.secret, { expiresIn: '24h'});

	res.json({ success: true, message: 'Login success. Enjoy your token!', token: token });
}

function apiGuard(req:Request, res:Response, next:NextFunction) {
	var token = req.body.token || req.param('token') 
        || req.headers['x-access-token']
        || req.cookies.access_token;

	if (token) {
		jwt.verify(token, server_config.secret, function(err, decoded) {			
			if (err) {
				res.json({ success: false, message: 'Failed to authenticate token.' });		
				return;
			} 
			req.params.decoded = decoded;	
			next();
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