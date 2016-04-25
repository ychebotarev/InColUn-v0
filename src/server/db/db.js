"use strict";
const mysql = require('mysql');
var connectioPool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '!qAzXsW2',
    database: 'incolun',
    debug: false
});
exports.connectioPool = connectioPool;
function getConnection(callback) {
    connectioPool.getConnection(function (err, connection) {
        callback(err, connection);
    });
}
exports.getConnection = getConnection;
;
//# sourceMappingURL=db.js.map