/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {providers} from './authProviders'

var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;

var cache = require('im-cache');

function local_signup(req, email, password, done){
    process.nextTick(function(){
	    var user = cache.get("user-"+email);
        if (user)
        {
            return done(null, false, req.flash('signupMessage', 'That email already taken'));
        }
        var new_user = {id:email, type:"L", name:email, user_password:password}
        cache.set("user-"+email, new_user);
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
	    clientID: providers['facebook'].clientID,
	    clientSecret: providers['facebook'].clientSecret,
	    callbackURL: providers['facebook'].callbackURL
	  },facebook_login
	));
	
    passport.use(new GoogleStrategy({
	    clientID: providers['google'].clientID,
	    clientSecret: providers['google'].clientSecret,
	    callbackURL: providers['google'].callbackURL
	  }
      , google_login
	));
};

export {setupPassport}