import {murmurhash3_32_gc} from '../utils/murmurhash3_gc';
import {flakeIdGenerator} from '../utils/flakeid'

import * as mysql from 'mysql'
import {env} from '../environment'


interface IUserModel{
    id:string, 
    profile_id:number,
    username:string,
    email:string,
    password:string,
    type?:string,
    created?:Date,
    status?:number  
}

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

function findUserByEmail(email:string):Promise<IUserModel>{
	return new Promise<IUserModel>((resolve, reject)=>{
    	var profile_id:number = murmurhash3_32_gc(email, 1001);
		var queryStr = "SELECT * from users WHERE profile_id="+profile_id;
		env().db().query(queryStr)
        	.then(function(results){
				var user = getUserFromDB(results, email);
				user?resolve(user):reject('Login failed. User not found.');
			}).catch( (message:string) => {reject(message)});
	});
}

function insertUser(userModel:IUserModel):Promise<IUserModel>{
	return new Promise<IUserModel> ( (resolve:(userModel:IUserModel)=>void, reject:(message:string)=>void)=>{
    	userModel.id = flakeIdGenerator.nextStr(1);
		var insertQuery = "INSERT INTO users (id, profile_id, email, username, password, type, created, status)" + 
            " VALUES ('"+userModel.id+"', '"
                        +userModel.profile_id+ "','" 
                        +userModel.email+ "','"
                        +userModel.username+"','"
                        +userModel.password+"','"
                        +(userModel.type?userModel.type:"L")+
                        "',NOW(),'N')"; 
	
    	env().db().query(insertQuery)
        	.then(function(results){
            	resolve(userModel)
        	})
        	.catch(function (message:string) {
            	env().metrics().counters.inc('dbfail');
            	reject('Failed to add new user. '+message);
        })
	})
}

export{IUserModel, findUserByEmail, insertUser}