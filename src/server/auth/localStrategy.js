"use strict";
const crypto = require('crypto');
const murmurhash3_gc_1 = require('../utils/murmurhash3_gc');
const logger_1 = require('../utils/logger');
const flakeid_1 = require('../utils/flakeid');
const createToken_1 = require('./createToken');
const authDB = require('./authDB');
const db = require('../db/db');
const metrics = require('../utils/metrics');
function encryptPasswordImpl(password, salt) {
    if (!password)
        return '';
    try {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    }
    catch (err) {
        return '';
    }
}
function encryptPassword(password) {
    return encryptPasswordImpl(password, '1001');
}
function processLocalLogin(user_id, password, callback) {
    var login_duration = new metrics.Interval();
    login_duration.start();
    authDB.checkUser(user_id).then(function (user) {
        if (!user) {
            callback({ success: false, message: 'Login failed. User not found.' });
            metrics.counterCollection.inc('loginfail');
            return;
        }
        var in_password = encryptPassword(password);
        if (in_password != user.password) {
            callback({ success: false, message: 'Authentication failed. Wrong password.' });
            metrics.counterCollection.inc('loginfail');
            return;
        }
        var token = createToken_1.createToken({ id: user.id, user_id_key: user.user_id_key, username: user.displayName });
        callback({ success: true, message: 'Login success.', token: token });
        login_duration.stop();
        logger_1.logger.info(JSON.stringify(login_duration.toJSON('login-durtion')));
        metrics.counterCollection.inc('login_success');
    }).catch(function (errorCode) {
        metrics.counterCollection.inc('dbfail');
        logger_1.logger.error(errorCode);
        callback({ success: false, message: 'Authentication failed' + errorCode });
    });
}
exports.processLocalLogin = processLocalLogin;
function processExternalLogin(user_id, displayName, provider, callback) {
    authDB.checkUser(user_id).then(function (user) {
        if (user) {
            callback(null, { id: user.id, user_id_key: user.user_id_key, username: displayName });
            return;
        }
        var user_id_key = murmurhash3_gc_1.murmurhash3_32_gc(user_id, 1001);
        var id = flakeid_1.flakeIdGenerator.nextStr(1);
        var insertQuery = "INSERT INTO users (id,user_id_key,user_id, email,username, password, type,created,status)" +
            " VALUES ('" + id + "', '" + user_id_key + "','" + user_id + "','','" + displayName + "','','" + provider + "',NOW(),'N')";
        db.connectioPool.query(insertQuery, function (error, results) {
            if (error) {
                metrics.counterCollection.inc('dbfail');
                callback('Signup failed.' + error.code, null);
                return;
            }
            callback(null, { id: id, user_id_key: user_id_key, username: displayName });
        });
    });
}
exports.processExternalLogin = processExternalLogin;
function processLocalSignup(email, username, password, callback) {
    var signup_duration = new metrics.Interval();
    signup_duration.start();
    authDB.checkUser(email).then(function (user) {
        if (user) {
            callback({ success: false, message: 'Signup failed. User already exist.' });
            metrics.counterCollection.inc('signupfail');
            return;
        }
        else {
            var user_id_key = murmurhash3_gc_1.murmurhash3_32_gc(email, 1001);
            var email = email;
            var displayName = username;
            var password = encryptPassword(password);
            authDB.insertUser(user_id_key, email, displayName, email, password, callback);
            signup_duration.stop();
            logger_1.logger.info(JSON.stringify(signup_duration.toJSON('signup-durtion')));
            metrics.counterCollection.inc('signupsuccess');
        }
    }).catch(function (errorCode) {
        metrics.counterCollection.inc('signupfail');
        logger_1.logger.error(errorCode);
    });
}
exports.processLocalSignup = processLocalSignup;
//# sourceMappingURL=localStrategy.js.map