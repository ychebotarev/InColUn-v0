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

function findUserByEmail(email:string, callback:(errorMsg:string,userModel:IUserModel)=>void){
    var profile_id:number = murmurhash3_32_gc(email, 1001);
	var query = "SELECT * from users WHERE profile_id="+profile_id;
	env().db().query(query)
        .then(function(results){
			var user = getUserFromDB(results, email);
			if(!user){
				callback('Login failed. User not found.', null);
			} else{
				callback(null, user);
			}
        }).catch(function (message:string) {
			env().metrics().counters.inc('dbfail');
			callback(message, null);
            
        })
}

function insertUser(userModel:IUserModel, callback:(errorMsg:string,userModel:IUserModel)=>void){
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
            callback(null, userModel)
        })
        .catch(function (message:string) {
            env().metrics().counters.inc('dbfail');
            callback('Failed to add new user. '+message, null);
            
        })
}

export{IUserModel, findUserByEmail, insertUser}