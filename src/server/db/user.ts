import {murmurhash3_32_gc} from '../utils/murmurhash3_gc';
import {flakeIdGenerator} from '../utils/flakeid'

import * as mysql from 'mysql'
import {env} from '../environment'
import {IUserModel} from '../interfaces/interfaces'

function getUserFromDB(results:any[], email:string):IUserModel{
    for(var i=0; i< results.length;++i){
        if (results[i].email == email)
        {
            return {
                id:results[i].id,
                profile_id:results[i].profile_id,
                username:results[i].username,
                email:results[i].email,
                password:results[i].password
            }
        }
    }
    return undefined;
}

async function getUserByEmail(email:string):Promise<IUserModel>{
	var profile_id:number = murmurhash3_32_gc(email, 1001);
	var queryStr = "SELECT * from users WHERE profile_id="+profile_id;

	var results = await env().db().query(queryStr);
	var user = getUserFromDB(results, email);
	return user;
}

async function hasUser(email:string):Promise<boolean> {
	var profile_id:number = murmurhash3_32_gc(email, 1001);
	var queryStr = "SELECT * from users WHERE profile_id="+profile_id;

	var results = await env().db().query(queryStr);
	var user = getUserFromDB(results, email);
	return user?true:false;
}

async function insertUser(userModel:IUserModel):Promise<boolean> {
	userModel.id = flakeIdGenerator.nextStr(1);
	var insertQuery = "INSERT INTO users (id, profile_id, email, username, password, type, created, status)" + 
		" VALUES ('"+userModel.id+"', '"
					+userModel.profile_id+ "','" 
					+userModel.email+ "','"
					+userModel.username+"','"
					+userModel.password+"','"
					+(userModel.type?userModel.type:"L")+
					"',NOW(),'N')"; 
	try{
		var result = await env().db().query(insertQuery);
		return true;
	}
	catch(error){
		env().metrics().counters.inc('dbfail');
		throw 'Failed to add new user. '+error;
	}
}

export{getUserByEmail, hasUser, insertUser}