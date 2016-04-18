/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'

import {Application,Request,Response,NextFunction} from 'express'

import {server_config} from '../config'
import FlakeId = require('flake-idgen');
import * as jwt from 'jsonwebtoken';

import {localLogin, localSignup, apiGuard} from '../auth/authFunctions'

var cache = require('im-cache');

function setupAuthRoutes(app: Application, passport:Passport){

	app.get('/login', function(req, res){ res.render("login"); });    
	app.get('/signup', function(req, res){ res.render("signup"); });    
     
	app.post('/auth/signup', localSignup);
	app.post('/auth/login', localLogin);

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/facebook/callback', function(req:Request, res:Response, next:NextFunction) {
		 passport.authenticate('facebook', {session:false}, function(err, user, info) {
    		if (user === false) {
      			res.json({ success: false, message: 'Facebook authentication failed.' });
    		} else {
				var token = jwt.sign(user, server_config.secret, { expiresIn: '24h'});

				res.json({ success: true, message: 'Facebook login success. Enjoy your token!', token: token });
    		}
  		})(req, res, next);
	});

	app.get('/auth/google/callback', function(req:Request, res:Response, next:NextFunction) {
		passport.authenticate('google', { session:false}, function(err, user, info) {
    		if (user === false) {
      			res.json({ success: false, message: 'Google authentication failed.' });
    		} else {
				var token = jwt.sign(user, server_config.secret, { expiresIn: '24h'});

				res.json({ success: true, message: 'Google login success. Enjoy your token!', token: token });
    		}
  		})(req, res, next);
	});

	//app.use('/api/', apiGuard);
	//app.use('/boards', apiGuard);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	}) ;
}

export  {setupAuthRoutes}
