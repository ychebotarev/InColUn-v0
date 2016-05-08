import crypto = require('crypto');

import {murmurhash3_32_gc} from '../utils/murmurhash3_gc';
import {flakeIdGenerator} from '../utils/flakeid'
import {createToken} from './createToken'

import {IAuthResponse, IUserModel} from '../interfaces/interfaces'

import {env} from '../environment'

import {getUserByEmail, hasUser, insertUser} from '../db/user' 

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

async function processLocalLogin(email:string, password:string):Promise<string>{
	var user:IUserModel = await getUserByEmail(email)
	var in_password = encryptPassword(password);
	if (in_password != user.password) {
		env().metrics().counters.inc('login_fail');
		throw "Authentication failed. Wrong password.";
	}
			
	env().metrics().counters.inc('login_success');
	var token = createToken(user);
	return token;
}

async function processExternalLogin(profile:string, displayName:string, provider:string):Promise<string>{
	try{
		var user:IUserModel = await getUserByEmail(profile);
		var token = createToken(user);
		return token;
	}
	catch(error){
		//eat this error
	}
	
	var profile_id:number = murmurhash3_32_gc(profile, 1001);
	var user:IUserModel ={
		id:'0',
		profile_id:profile_id,
		email:'',
		username:displayName,
		password:'',
		type:provider
	} 
	try{
		await insertUser(user);
		var token = createToken(user);
		return token;
	}
	catch(error){
		env().metrics().counters.inc('external_login_fail');
        throw 'External ligin failed. ' + error;
	}
}

async function processLocalSignup(email:string, username:string, password:string):Promise<string>{
	var userAlreadyRegistered:boolean = await hasUser(email); 
	if (userAlreadyRegistered){
		env().metrics().counters.inc('signup_fail');
		throw 'Signup failed. User already exist.';
	}
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
	
	try{
		insertUser(user);
		env().metrics().counters.inc('signup_success');
		var token = createToken(user);
		return token;
	}  
	catch(error){
		env().metrics().counters.inc('signup_fail');
		throw 'SignUp faile. ' + error;		
	}
}

export {processLocalLogin, processExternalLogin, processLocalSignup}