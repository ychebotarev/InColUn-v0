import crypto = require('crypto');

import * as jwt from 'jsonwebtoken';
import * as mysql from 'mysql'

import {Request,Response,NextFunction} from 'express'
import {server_config} from '../config'
import {murmurhash3_32_gc} from '../utils/murmurhash3_gc';
import {logger} from '../utils/logger'

import * as db from '../db/db'

import * as metrics from '../utils/metrics'

interface userLoginInfo{
    id:number,
    user_provided_id:string,
    password:string,
    displayName:string        
}

interface userToken{
    id:string,
    user_id:string,
    username:string
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

function createToken(id:number, userid:string, udername:string ):string{
    var user = {id:String(id), userid:userid, username:udername}
    var token = jwt.sign(user, server_config.secret, { expiresIn: '24h'});
    return token;
}


function createUserFromDB(rows:any[], user_provided_id:string):userLoginInfo{
    for(var i=0; i< rows.length;++i){
        if (rows[i].user_provided_id == user_provided_id)
        {
            return {
                id:rows[0].id,
                user_provided_id:rows[0].user_provided_id,
                password:rows[0].pwd,
                displayName:rows[0].username
            }
        }
    }
    return undefined;
}

function checkUser(user_provided_id:string):Promise<userLoginInfo>{
    var userid:number = murmurhash3_32_gc(user_provided_id, 1001);
    
    const p:Promise<userLoginInfo> 
        = new Promise(( resolve:(user:userLoginInfo) => void, reject:(errorCode:string) => void )=>{
            db.connectioPool.query('SELECT * from users WHERE userid='+userid, function(error: mysql.IError, results){
				if(error){
                    metrics.counterCollection.inc('dbfail');
                    reject(error.code);
                }else{
                    var user = createUserFromDB(results, user_provided_id); 
                    resolve(user);
                }
            })
    })
    return p;
}

function insertUser(userid:number, user_rovided_id:string, displayName:string, email:string, password:string, res:Response ){
    var insertQuery = "INSERT INTO users (id,userid,user_provided_id, email,username, pwd, type,created,status)" + 
            " VALUES (0, '"+userid+ "','" + user_rovided_id+ "','"+ email+"','"+ displayName+"','"+password+"','L',NOW(),'N')"; 
    
	db.connectioPool.query(insertQuery, function(error: mysql.IError, results){

        if(error){
            metrics.counterCollection.inc('dbfail');
            res.json({ success: false, message: 'Failed to add new user. '+error.code});
            return;
        }
        var token = createToken(userid, user_rovided_id, displayName);
	    res.json({ success: true, message: 'Signup success.', token: token });
    })
}

function localSignup(req:Request, res:Response){
	var signup_duration = new metrics.Interval();
	signup_duration.start();
    checkUser(req.body.email).then(function (user:userLoginInfo) {
        if(user){
		    res.json({ success: false, message: 'Signup failed. User already exist.' });
		    metrics.counterCollection.inc('signupfail');
			return;
        }
        else{
            var userid:number = murmurhash3_32_gc(req.body.email, 1001);
            var email = req.body.email;
            var displayName = req.body.name;
            var password = encryptPassword(req.body.password);
            
            insertUser(userid, email, displayName, email, password, res);
        	signup_duration.stop();
			logger.info(JSON.stringify(signup_duration.toJSON('signup-durtion')));
		    metrics.counterCollection.inc('signupsuccess');
        }
    }).catch(function (errorCode:string) {
		metrics.counterCollection.inc('signupfail');
        logger.error(errorCode);
    })
}

function localLogin(req:Request, res:Response) {
	var login_duration = new metrics.Interval();
	login_duration.start();
    
	checkUser(req.body.email).then(function (user:userLoginInfo) {
        if(!user){
		    res.json({ success: false, message: 'Login failed. User not found.' });
			metrics.counterCollection.inc('loginfail');
			return;
        }
        var in_password = encryptPassword(req.body.password);
	    if (in_password != user.password) {
		    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			metrics.counterCollection.inc('loginfail');
		    return;
	    }
        var token = createToken(user.id, user.user_provided_id, user.displayName);
        res.json({ success: true, message: 'Login success.', token: token });
		
		login_duration.stop();
		logger.info(JSON.stringify(login_duration.toJSON('login-durtion')));
		
		metrics.counterCollection.inc('login_success');
		 
    }).catch(function (errorCode:string){
        metrics.counterCollection.inc('dbfail');
        logger.error(errorCode);
        res.json({ success: false, message: 'Authentication failed' + errorCode });
    });
}

function externalLogin(user_provided_id:string, displayName:string,provider:string, done){
    
    checkUser(user_provided_id).then(function (user:userLoginInfo) {
        if(user){
            return done(null, {id:userid, user_id:user_provided_id, username:displayName});
        }
        var userid:number = murmurhash3_32_gc(user_provided_id, 1001);
        
        var insertQuery = "INSERT INTO users (id,userid,user_provided_id, email,username, pwd, type,created,status)" + 
            " VALUES (0, '"+userid+ "','" + user_provided_id+ "','','"+ displayName+"','','"+provider+"',NOW(),'N')"; 
        db.connectioPool.query(insertQuery, function(error: mysql.IError, results){
            if(error){
                metrics.counterCollection.inc('dbfail');
                done('Signup failed.'+error.code);
                return;
            }

            done(null,{id:userid, user_id:user_provided_id, username:displayName})
        })
    })
}

function facebookLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        externalLogin(profile.id, profile.displayName,'F', done);
    })
};

function googleLogin(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        externalLogin(profile.id, profile.displayName, 'G', done);
    });
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

export {facebookLogin, googleLogin, localLogin, localSignup, apiGuard, webGuard, encryptPassword,createToken}