/// <reference path='../../../typings/tsd.d.ts' />
import {server_config} from '../config'

import * as mysql from 'mysql'

var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'address_book',
    debug    :  false
});

function getConnection(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

function poolQuery(query){
    var promise = new Promise(function(resolve:(rows: {}, fields: any) => void, reject:(error:string) => void){
        pool.query(query, function(err: mysql.IError, rows:any, fields:any) {
            if (err){ 
                //LOG ERROR
                reject(err.code)
            }
            else{
                resolve(rows, fields);
            }
        });    
    })
    
    return promise;
}
/*
function poolQuery(query, callback:(err: string, ...args: any[]) => void){
    pool.query(query, function(err: mysql.IError, rows:any, fields:any) {
        if (err)
        { 
            //LOG ERROR
        }
        callback(err.code, rows, fields);
    });    
}*/

export {getConnection, poolQuery}