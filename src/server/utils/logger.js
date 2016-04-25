"use strict";
/// <reference path='../../../typings/tsd.d.ts' />
const winston = require('winston');
var util = require('util');
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 52428800,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
exports.logger = logger;
function logHttpRequests() {
    return function (req, res, next) {
        req.profileInfo = util.format('HTTP %s %s', req.method, req.originalUrl);
        logger.info(req.profileInfo);
        next();
    };
}
exports.logHttpRequests = logHttpRequests;
//# sourceMappingURL=logger.js.map