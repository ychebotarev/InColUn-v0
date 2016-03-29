/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'

import express = require('express');
import FlakeId = require('flake-idgen');

import {server_config} from '../config'
import {User} from '../db/models/user'

function setupAuthRoutes(router: express.Router, passport:Passport){
    //localhost:8080/auth/
    router.get('/', function(req, res){
		res.render('index.ejs');
	});
    
    //localhost:8080/auth/login
	router.get('/login', function(req, res){
		res.render('auth/login.ejs', { message: 'loginMessage' });
	});
    
        
    router.get('/login', function(req, res){
        res.render('auth/login.ejs', { message: 'loginMessage' });
	});
    
    router.post('/login', passport.authenticate('local-login', {
		    successRedirect: '/profile',
		    failureRedirect: '/login',
		    failureFlash: true
	}));    
    
    

	router.get('/signup', function(req, res){
		res.render('auth/signup.ejs', { message: 'signupMessage' });
	});


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
	  passport.authenticate('google', { successRedirect: '/profile',
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

	router.get('/unlink/local', function(req, res){
		var user = req.user;

		user.local.username = null;
		user.local.password = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		});

	});

	router.get('/unlink/google', function(req, res){
		var user = req.user;
		user.google.token = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		});
	});

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})    
}

export  {setupAuthRoutes}


/*
var loginRouter = express.Router();
var flakeId = new FlakeId({ datacenter: server_config.instance_id % 32, worker: 1 });

loginRouter.get('/:username/:password', function (req, res) {
    var user = new User();
    user.guid = flakeId.next().toString();
    user.local = {
        username: req.params.username,
        password: req.params.password,
        email: "bla"
    }
    user.save();
    res.status(200).send(req.params.username+':'+req.params.password+ 'was saved.');
});

    
export {loginRouter};*/