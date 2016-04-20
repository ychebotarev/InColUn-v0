import crypto = require('crypto');

import * as jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express'

import {server_config} from '../config'
import * as db from '../db/db.ts'

var cache = require('im-cache');

function createUser(rows){
  return {
        id:rows[0].id,
        userid:rows[0].userid,
        email:rows[0].email,
        username:rows[0].username
    }
}

var processUserRequest = function (rows, fields, done){
    var newUser = createUser(rows);
    done(null, newUser);
}

function createTestPromise(str:string){
    return new Promise<string>((resolve, reject) => { 
        resolve(str); 
    });
}

function testPromise(str:string, callback:(str:string)=>void){
    createTestPromise(str).then(callback)
}

testPromise('hello', (str:string)=>{console.log(str)})
/*
function poolQuery(query, done){
    var promise = new Promise( function(resolve, reject){
        db.poolQuery(query, function(errorMsg:string, rows, fields){
            if(errorMsg){
                reject(errorMsg);
            }
            resolve(rows, fields, done);
        });
    })
    return promise;
}*/

function facebookLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        db.poolQuery('SELECT * from users WHERE userid='+profile.id)
            .then(function(rows, fields){
                var newUser = createUser(rows);
                done(null, newUser);
            })
            .catch(function(error:string){
                done(error)
            })
    })
};

/*
        var user = cache.get("id-"+profile.id);
        if(user){
            return done(null, user);
        }
        var newUser = {id:profile.id, type:"FB", displayName:profile.displayName, email:'NA', password:'NA', token:accessToken }
        cache.set("id-"+profile.id, newUser);
        
        return done(null, newUser);
    });
}*/

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

function encryptPasswordImpl(password:string, salt:string):string {
    if (!password) return '';
    try {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    } catch (err) {
        return '';
    }
}

function encryptPassword(password:string):string {
    return encryptPasswordImpl(password,'1001');
}

export {facebookLogin, googleLogin, localLogin, localSignup, apiGuard, webGuard, encryptPassword}