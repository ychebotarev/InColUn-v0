/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {Application, Router} from 'express'

import FlakeId = require('flake-idgen');

import {server_config} from '../config'

function setupAuthRoutes(app: Application, passport:Passport){
    
    var router = Router();
    
    router.post('/login', passport.authenticate('local-login', {
		    successRedirect: '/profile',
		    failureRedirect: '/login',
		    failureFlash: true
	}));    
    

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));
	
	router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

	router.get('/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/profile',
	                                      failureRedirect: '/' }));

	router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	router.get('/google/callback', 
	  passport.authenticate('google', { successRedirect: '/board',
	                                      failureRedirect: '/' }));

	router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));
	router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

	router.get('/connect/local', function(req, res){
		res.render('auth/connect-local.ejs', { message: 'signupMessage'});
	});

	router.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/connect/local',
		failureFlash: true
	}));

	router.get('/unlink/facebook', function(req, res){
		var user = req.user;

		user.facebook.token = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		})
	});

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	}) ;
    
    app.use('/auth', router);   
}

export  {setupAuthRoutes}
