/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {providers} from './authProviders'

var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;

var cache = require('im-cache');

function localSignup(req, email, password, done){
    process.nextTick(function(){
	    var user = cache.get("user-"+email);
        if (user)
        {
            return done(null, false, req.flash('signupMessage', 'That email already taken'));
        }
        var newUser = {id:email, type:"L", displayName:'displayName', email:email, password:password, token:'NA'}
        cache.set("id-"+email, newUser);
        return done(null, newUser);
    }) 
}

function localLogin(req, email, password, done){
    process.nextTick(function(){
        var user = cache.get("id-"+email);
        if (!user)
        {
            return done(null, false, req.flash('loginMessage', 'No User found'));
        }
        if(user.password != password){
            return done(null, false, req.flash('loginMessage', 'invalid password'));
        }
        return done(null, user);
    });
}

function facebookLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        var user = cache.get("id-"+profile.id);
        if(user){
            return done(null, user);
        }
        var newUser = {id:profile.id, type:"FB", displayName:profile.name.givenName + ' ' + profile.name.familyName, email:'NA', password:'NA', token:accessToken, }
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
        var newUser = {id:profile.id, type:"G", displayName:profile.displayName, token:accessToken}
        cache.set("id-"+profile.id, newUser);
        
        return done(null, newUser);
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
                , localSignup
    ));

	passport.use('local-login'
            , new LocalStrategy(
                {
			        usernameField: 'email',
			        passwordField: 'password',
			        passReqToCallback: true
		        }
                , localLogin
    ));

	passport.use(new FacebookStrategy({
	    clientID: providers['facebook'].clientID,
	    clientSecret: providers['facebook'].clientSecret,
	    callbackURL: providers['facebook'].callbackURL
	  },facebookLogin
	));
	
    passport.use(new GoogleStrategy({
	    clientID: providers['google'].clientID,
	    clientSecret: providers['google'].clientSecret,
	    callbackURL: providers['google'].callbackURL
	  }
      , googleLogin
	));
};

export {setupPassport}