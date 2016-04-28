import crypto = require('crypto');

import {murmurhash3_32_gc} from '../utils/murmurhash3_gc';
import {flakeIdGenerator} from '../utils/flakeid'
import {createToken} from './createToken'
import {IAuthResponse} from './IAuthResponse'

import {env} from '../environment'

import * as mysql from 'mysql'
import {IUserModel, findUserByEmail, insertUser} from '../db/user' 

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

function processLocalLogin(email:string, password:string, callback:(authResponse:IAuthResponse)=>void){
	var login_duration = env().metrics().createInterval();
	login_duration.start();
	findUserByEmail(email, function (errorMsg:string, userModel:IUserModel) {
		if (errorMsg){
		    callback({success:false, message:errorMsg});
			env().metrics().counters.inc('loginfail');
			return;
        }
        var in_password = encryptPassword(password);
	    if (in_password != userModel.password) {
		    callback({success:false, message:'Authentication failed. Wrong password.'});
			env().metrics().counters.inc('loginfail');
		    return;
	    }
        var token = createToken(userModel);
        callback({ success: true, message: 'Login success.', token: token });
		
		login_duration.stop();
		env().logger().info(JSON.stringify(login_duration.toJSON('login-duration')));
		env().metrics().counters.inc('login_success');
    })
}

function processExternalLogin(profile:string, displayName:string, provider:string, callback:(authResponse:IAuthResponse)=>void){
	findUserByEmail(profile, function (errorMsg:string,userModel:IUserModel) {
        if(userModel){
            var token = createToken(userModel);
            callback({ success: true, message: 'Login success.', token: token });
            return;
        }
        
        //user was not found, let generate new one
        var profile_id:number = murmurhash3_32_gc(profile, 1001);
        var user:IUserModel ={
                id:'0',
                profile_id:profile_id,
                email:'',
                username:displayName,
                password:'',
                type:provider
        } 
        insertUser(user, function(errorMsg:string,userModel:IUserModel){
            if(errorMsg){
                env().metrics().counters.inc('dbfail');
                callback({success:false, message:'Signup failed.'+errorMsg});
                return;
            }
            var token = createToken(userModel);
            callback({ success: true, message: 'External login success.', token: token });
        })
    })
}

function processLocalSignup(email:string
        , username:string
        , password:string
        , callback:(authResponse:IAuthResponse)=>void){
	var signup_duration = env().metrics().createInterval();
	signup_duration.start();
	findUserByEmail(email, function (errorMsg:string,userModel:IUserModel) {
        if(userModel){
			callback({success:false, message:'Signup failed. User already exist.'});
		    env().metrics().counters.inc('signupfail');
			return;
        }
        else{
            var profile_id:number = murmurhash3_32_gc(email, 1001);
            var encrypted = encryptPassword(password);
            
            var user:IUserModel ={
                id:'0',
                profile_id:profile_id,
                email:email,
                username:username,
                password:encrypted,
                type:'L'
            } 
            
            insertUser(user, function(errorMsg:string,userModel:IUserModel){
                if(errorMsg){
                    callback({success:false, message:errorMsg});  
                    return;  
                }
                var token = createToken(userModel);
                callback({success:true,message:'SignUp success',token:token});
                signup_duration.stop();
                env().logger().info(JSON.stringify(signup_duration.toJSON('signup-duration')));
                env().metrics().counters.inc('signupsuccess');
            })
        }
    })
}

export {processLocalLogin, processExternalLogin, processLocalSignup}