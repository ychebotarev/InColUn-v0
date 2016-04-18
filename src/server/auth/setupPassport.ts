/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'
import {providers} from './externalAuthProviders'

var FacebookStrategy    = require('passport-facebook').Strategy;
var GoogleStrategy      = require('passport-google-oauth').OAuth2Strategy;

import {facebookLogin, googleLogin} from './authFunctions'

function setupPassport(passport:Passport) {
	
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