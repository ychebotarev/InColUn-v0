import {murmurhash3_32_gc} from '../utils/murmurhash3_gc';
import {createToken} from './createToken'
import {flakeIdGenerator} from '../utils/flakeid'
import {server_config} from '../config'

import * as db from '../db/db'
import * as mysql from 'mysql'
import * as metrics from '../utils/metrics'
import * as aI from './interfaces'
import * as jwt from 'jsonwebtoken';

function createUserFromDB(rows:any[], user_id:string):aI.userLoginInfo{
    for(var i=0; i< rows.length;++i){
        if (rows[i].user_id == user_id)
        {
            return {
                id:rows[0].id,
                user_id_key:rows[0].user_id_key,
                password:rows[0].password,
                displayName:rows[0].username
            }
        }
    }
    return undefined;
}


function checkUser(user_id:string, callback:(errorMsg:string,loginInfo:aI.userLoginInfo)=>void){
    var user_id_key:number = murmurhash3_32_gc(user_id, 1001);
	var query = "SELECT * from users WHERE user_id_key="+user_id_key;
	db.connectioPool.query(query, function(error: mysql.IError, results){
		if(error){
			metrics.counterCollection.inc('dbfail');
			callback(error.code, null);
		}else{
			var user = createUserFromDB(results, user_id);
			if(!user){
				callback('Login failed. User not found.', null);
			} else{
				callback(null, user);
			}
		}
	})	
}

/*
function checkUser(user_id:string):Promise<aI.userLoginInfo>{
    var user_id_key:number = murmurhash3_32_gc(user_id, 1001);
    
    const p:Promise<aI.userLoginInfo> 
        = new Promise(( resolve:(user:aI.userLoginInfo) => void, reject:(errorCode:string) => void )=>{
            var query = "SELECT * from users WHERE user_id_key="+user_id_key;
            db.connectioPool.query(query, function(error: mysql.IError, results){
				if(error){
                    metrics.counterCollection.inc('dbfail');
                    reject(error.code);
                }else{
                    var user = createUserFromDB(results, user_id); 
                    resolve(user);
                }
            })
    })
    return p;
}*/

function insertUser(user_id_key:number, user_id:string, displayName:string, email:string, password:string, callback:aI.localLoginCallback){
    var id = flakeIdGenerator.nextStr(1);
	var insertQuery = "INSERT INTO users (id,user_id_key,user_id, email,username, password, type,created,status)" + 
            " VALUES ('"+id+"', '"+user_id_key+ "','" + user_id+ "','"+ email+"','"+ displayName+"','"+password+"','L',NOW(),'N')"; 
    
	db.connectioPool.query(insertQuery, function(error: mysql.IError, results){
        if(error){
            metrics.counterCollection.inc('dbfail');
            callback({ success: false, message: 'Failed to add new user. '+error.code});
            return;
        }
        var token = createToken({id:id, user_id_key:user_id_key, username:displayName});
	    callback({ success: true, message: 'Signup success.', token: token });
    })
}

export {checkUser, insertUser}