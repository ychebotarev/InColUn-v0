import {server_config} from '../config'
import * as jwt from 'jsonwebtoken';
import {IUserModel} from '../db/user'

function createToken(user:IUserModel):string{
    var token = jwt.sign({id:user.id, profile_id:user.profile_id, username:user.username}, server_config.secret, { expiresIn: '24h'});
    return token;
}

export {createToken}