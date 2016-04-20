import * as mysql from 'mysql'


class Config{    
    //should be in [0-31] range, will be used to generate IDs
    instance_id:number;
	secret: string;
    dbConfig:mysql.IConnectionConfig;
    dbPoolConfig:mysql.IPoolConfig;
}

var server_config = new Config();
server_config.instance_id = 1001;
server_config.secret = 'supersecret';
server_config.dbConfig = {
  host     : 'localhost',
  user     : 'root',
  password : '!qAzXsW2',
  database : 'incolun'
};

server_config.dbPoolConfig = {
    connectionLimit : 100, 
    host     : 'localhost',
    user     : 'root',
    password : '!qAzXsW2',
    database : 'incolun',
    debug    :  false
};

export {server_config}