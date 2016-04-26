import crypto = require('crypto');

import {murmurhash3_32_gc} from '../utils/murmurhash3_gc';
import {logger} from '../utils/logger'
import {flakeIdGenerator} from '../utils/flakeid'
import {createToken} from './createToken'

import * as aI from './interfaces'
import * as authDB from './authDB'
import * as db from '../db/db'
import * as metrics from '../utils/metrics'
import * as mysql from 'mysql'

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

function processLocalLogin(user_id:string, password:string, callback:aI.localLoginCallback){
	var login_duration = new metrics.Interval();
	login_duration.start();
	authDB.checkUser(user_id, function (errorMsg:string,loginInfo:aI.userLoginInfo) {
		if (errorMsg){
		    callback({success: false, message: errorMsg});
			metrics.counterCollection.inc('loginfail');
			return;
        }
        var in_password = encryptPassword(password);
	    if (in_password != loginInfo.password) {
		    callback({ success: false, message: 'Authentication failed. Wrong password.' });
			metrics.counterCollection.inc('loginfail');
		    return;
	    }
        var token = createToken({id:loginInfo.id, user_id_key:loginInfo.user_id_key, username: loginInfo.displayName});
        callback({ success: true, message: 'Login success.', token: token });
		
		login_duration.stop();
		logger.info(JSON.stringify(login_duration.toJSON('login-duration')));
		
		metrics.counterCollection.inc('login_success');
    })
}

function processExternalLogin(user_id:string, displayName:string, provider:string, callback:aI.externalLoginCallback){
	authDB.checkUser(user_id, function (errorMsg:string,loginInfo:aI.userLoginInfo) {
        if(loginInfo){
			callback(null, {id:loginInfo.id, user_id_key:loginInfo.user_id_key, username:loginInfo.displayName})
            return;
        }
		
        var user_id_key:number = murmurhash3_32_gc(user_id, 1001);
        var id = flakeIdGenerator.nextStr(1);
        var insertQuery = "INSERT INTO users (id,user_id_key,user_id, email,username, password, type,created,status)" + 
            " VALUES ('"+id+"', '"+user_id_key+ "','" + user_id+ "','','"+ displayName+"','','"+provider+"',NOW(),'N')"; 
        
		db.connectioPool.query(insertQuery, function(error: mysql.IError, results){
            if(error){
                metrics.counterCollection.inc('dbfail');
                callback('Signup failed.'+error.code, null);
                return;
            }

            callback(null,{id:id, user_id_key:user_id_key, username:displayName})
        })
    })
}

function processLocalSignup(email:string, username:string, password:string, callback:aI.localLoginCallback){
	var signup_duration = new metrics.Interval();
	signup_duration.start();
	authDB.checkUser(email, function (errorMsg:string,loginInfo:aI.userLoginInfo) {
        if(loginInfo){
			callback({success: false, message: 'Signup failed. User already exist.'});
		    metrics.counterCollection.inc('signupfail');
			return;
        }
        else{
            var user_id_key:number = murmurhash3_32_gc(email, 1001);
            var password = encryptPassword(password);
            
            authDB.insertUser(user_id_key, email, username, email, password, callback);
        	signup_duration.stop();
			logger.info(JSON.stringify(signup_duration.toJSON('signup-durtion')));
		    metrics.counterCollection.inc('signupsuccess');
        }
    })
}

export {processLocalLogin, processExternalLogin, processLocalSignup}