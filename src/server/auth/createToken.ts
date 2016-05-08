import * as jwt from 'jsonwebtoken';

import {server_config} from '../config'
import {IUserModel} from '../interfaces/interfaces'

function createToken(user:IUserModel):string{
    var token = jwt.sign({id:user.id, profile_id:user.profile_id, username:user.username}, server_config.secret, { expiresIn: '24h'});
    return token;
}

function verifyToken(token:string):Promise<any>{
	return new Promise<string>( (resolve,reject) =>{
		jwt.verify(token, server_config.secret, function(err, decodedToken) {			
			if (err) {
				reject('Failed to authenticate token.' + err);
			}
			else{
				resolve(decodedToken);
			}
		});
	})
}

export {createToken, verifyToken}