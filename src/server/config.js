"use strict";
class Config {
}
var server_config = new Config();
exports.server_config = server_config;
server_config.instance_id = 1001;
server_config.secret = 'supersecret';
server_config.dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '!qAzXsW2',
    database: 'incolun'
};
server_config.dbPoolConfig = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '!qAzXsW2',
    database: 'incolun',
    debug: false
};
//# sourceMappingURL=config.js.map