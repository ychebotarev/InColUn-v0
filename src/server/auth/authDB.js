"use strict";
const murmurhash3_gc_1 = require('../utils/murmurhash3_gc');
const createToken_1 = require('./createToken');
const flakeid_1 = require('../utils/flakeid');
const db = require('../db/db');
const metrics = require('../utils/metrics');
function createUserFromDB(rows, user_id) {
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].user_id == user_id) {
            return {
                id: rows[0].id,
                user_id_key: rows[0].user_id_key,
                password: rows[0].password,
                displayName: rows[0].username
            };
        }
    }
    return undefined;
}
function checkUser(user_id) {
    var user_id_key = murmurhash3_gc_1.murmurhash3_32_gc(user_id, 1001);
    const p = new Promise((resolve, reject) => {
        db.connectioPool.query('SELECT * from users WHERE user_id_key=' + user_id_key, function (error, results) {
            if (error) {
                metrics.counterCollection.inc('dbfail');
                reject(error.code);
            }
            else {
                var user = createUserFromDB(results, user_id);
                resolve(user);
            }
        });
    });
    return p;
}
exports.checkUser = checkUser;
function insertUser(user_id_key, user_id, displayName, email, password, callback) {
    var id = flakeid_1.flakeIdGenerator.nextStr(1);
    var insertQuery = "INSERT INTO users (id,user_id_key,user_id, email,username, password, type,created,status)" +
        " VALUES ('" + id + "', '" + user_id_key + "','" + user_id + "','" + email + "','" + displayName + "','" + password + "','L',NOW(),'N')";
    db.connectioPool.query(insertQuery, function (error, results) {
        if (error) {
            metrics.counterCollection.inc('dbfail');
            callback({ success: false, message: 'Failed to add new user. ' + error.code });
            return;
        }
        var token = createToken_1.createToken({ id: id, user_id_key: user_id_key, username: displayName });
        callback({ success: true, message: 'Signup success.', token: token });
    });
}
exports.insertUser = insertUser;
//# sourceMappingURL=authDB.js.map