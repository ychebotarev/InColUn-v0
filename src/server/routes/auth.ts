/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {Application} from 'express'

import FlakeId = require('flake-idgen');

import {server_config} from '../config'

function setupAuthRoutes(app: Application, passport:Passport){

	app.get('/login', function(req, res){ res.render("login"); });    
	app.get('/signup', function(req, res){ res.render("signup"); });    
    
    app.post('/auth/login', passport.authenticate('local-login', {
		    successRedirect: '/boards',
		    failureRedirect: '/login',
		    failureFlash: true
	}));    
    
	app.post('/auth/signup', passport.authenticate('local-signup', {
		successRedirect: '/boards',
		failureRedirect: '/signup',
		failureFlash: true
	}));
	
	app.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/boards',
	                                      failureRedirect: '/' }));

	app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/google/callback', 
	  passport.authenticate('google', { successRedirect: '/boards',
	                                      failureRedirect: '/' }));

	app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));
	app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	}) ;
}

export  {setupAuthRoutes}
