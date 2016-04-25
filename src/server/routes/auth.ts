/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'

import {Application,Request,Response,NextFunction} from 'express'

import {createToken} from '../auth/createToken'
import * as authFunction from '../auth/authFunctions'
import * as aI from '../auth/interfaces'

function authSuccessRedirect(res:Response, userToken:aI.userToken){
	var token = createToken(userToken);
	//TODO set cookie properties
	res.cookie("access_token", token)
	res.redirect("/boards");
}

function setupAuthRoutes(app: Application, passport:Passport){

	app.get('/login', function(req, res){ res.render("login"); });    
	app.get('/signup', function(req, res){ res.render("signup"); });    
     
	app.post('/auth/signup', authFunction.localSignup);
	app.post('/auth/login', authFunction.localLogin);

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/facebook/callback', function(req:Request, res:Response, next:NextFunction) {
		 passport.authenticate('facebook', {session:false}, function(err, user:aI.userToken, info) {
    		if (!user) {
      			res.json({ success: false, message: 'Facebook authentication failed.' });
    		} else {
				authSuccessRedirect(res, user);
    		}
  		})(req, res, next);
	});

	app.get('/auth/google/callback', function(req:Request, res:Response, next:NextFunction) {
		passport.authenticate('google', { session:false}, function(err, user:aI.userToken, info) {
    		if (!user) {
      			res.json({ success: false, message: 'Google authentication failed.' });
    		} else {
				authSuccessRedirect(res, user);
    		}
  		})(req, res, next);
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	}) ;
}

export  {setupAuthRoutes}