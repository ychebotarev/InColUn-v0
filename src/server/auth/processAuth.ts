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

function processLocalLogin(email:string, password:string):Promise<string>{
	return new Promise<string> ( (resolve:(token:string)=>void, reject:(errorMsg:string)=>void )=>{
		findUserByEmail(email).then( (userModel:IUserModel) =>{
        	var in_password = encryptPassword(password);
	    	if (in_password != userModel.password) {
				env().metrics().counters.inc('loginfail');
		    	reject('Authentication failed. Wrong password.');
	    	} else{
				env().metrics().counters.inc('login_success');
				var token = createToken(userModel);
				resolve(token);
			}
		}).catch((errorMsg:string)=>{
			env().metrics().counters.inc('loginfail');
			reject('Login failed'+errorMsg);
		})
	})	
}

function processExternalLogin(profile:string, displayName:string, provider:string):Promise<string>{
	return new Promise<string>( (resolve, reject)=>{
		findUserByEmail(profile).then((userModel:IUserModel)=>{
            var token = createToken(userModel);
            resolve(token);
		}).catch( (errorUnused:string)=>{
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
        	insertUser(user).then((userModel:IUserModel)=>{
            	var token = createToken(userModel);
            	resolve(token);
			}).catch ((errorMsg:string)=>{
                env().metrics().counters.inc('dbfail');
                reject('Signup failed.'+errorMsg);
			})
		})
	})
}

function processLocalSignup(email:string, username:string, password:string):Promise<string>{
	return new Promise<string>( (resolve:(token:string)=>void, reject:(errorMsg:string)=>void) =>{
		
		findUserByEmail(email).then( (euserModel:IUserModel) => {
			env().metrics().counters.inc('signupfail');
			reject('Signup failed. User already exist.');
        }).catch( (unused:string)=>{
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
            insertUser(user).then( (userModel:IUserModel)=>{
                env().metrics().counters.inc('signupsuccess');
                var token = createToken(userModel);
                resolve(token);
			}).catch( (errorMsg:string)=>{
				env().metrics().counters.inc('signupfail');
				reject(errorMsg);
			})
		})
    })
}

export {processLocalLogin, processExternalLogin, processLocalSignup}