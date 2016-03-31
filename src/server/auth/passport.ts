/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {providers} from './authProviders'

var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;

var configAuth = require('./auth');
var cache = require('im-cache');

function local_signup(req, email, password, done){
    process.nextTick(function(){
	    var user = cache.get("user-"+email);
        if (user)
        {
            return done(null, false, req.flash('signupMessage', 'That email already taken'));
        }
        
        cache.set("user-"+email, {id:email, type:"L", name:email, user_password:password});
    }) 
}

function local_login(req, email, password, done){
    process.nextTick(function(){
        var user = cache.get("id-"+email);
        if (!user)
        {
            return done(null, false, req.flash('loginMessage', 'No User found'));
        }
        if(user.user_password != password){
            return done(null, false, req.flash('loginMessage', 'invalid password'));
        }
        return done(null, user);
    });
}

function facebook_login(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        var user = cache.get("id-"+profile.id);
        if(user){
            return done(null, user);
        }
        var new_user = {id:profile.id, type:"FB", token:accessToken, name:profile.name.givenName + ' ' + profile.name.familyName}
        cache.set("id-"+profile.id, new_user);
        
        return done(null, new_user);
    });
}

function google_login(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        var user = cache.get("id-"+profile.id);
        if(user){
            return done(null, user);
        }
        var new_user = {id:profile.id, type:"G", token:accessToken, name:profile.displayName}
        cache.set("id-"+profile.id, new_user);
        
        return done(null, new_user);
    });
}


function setupPassport(passport:Passport) {
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
        var user = cache.get("id-"+id);
        if(!user){
            return done("not found", null);
        }
        
        return done(null, user);
	});
    
    passport.use('local-signup'
            , new LocalStrategy(
                {
                    usernameField: 'email',
		            passwordField: 'password',
		            passReqToCallback: true
	            }
                , local_signup
    ));

	passport.use('local-login'
            , new LocalStrategy(
                {
			        usernameField: 'email',
			        passwordField: 'password',
			        passReqToCallback: true
		        }
                , local_login
    ));

	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
	  },facebook_login
	));
	
    passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  }
      , google_login
	));
};

export {setupPassport}