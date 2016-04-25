import {server_config} from '../config'
import * as aI from './interfaces'

import * as jwt from 'jsonwebtoken';

function createToken(user:aI.userToken):string{
    var token = jwt.sign(user, server_config.secret, { expiresIn: '24h'});
    return token;
}

export {createToken}
