/// <reference path='../../../typings/tsd.d.ts' />
import {server_config} from '../config'

import * as mysql from 'mysql'

var connectioPool      =    mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '!qAzXsW2',
    database : 'incolun',
    debug    :  false
});

function getConnection(callback) {
    connectioPool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

interface IDBResponse{
    results:{}
    fields:any
}

export {getConnection, connectioPool, IDBResponse}