﻿/// <reference path='../../typings/tsd.d.ts' />
import express = require('express');
import path = require('path');
import http = require('http');
import bodyParser = require('body-parser');
import errorhandler = require('errorhandler')
import flash = require('connect-flash');
import cookieParser = require('cookie-parser');
import passport = require('passport');
import session = require('express-session');

import {server_config} from './config'
import {logger, logHttpRequests} from './utils/logger'

import {setupPassport} from './auth/setupPassport'
import {setupAuthRoutes} from './routes/auth';
import {setupApiRoutes} from './routes/api';
import {setupCommonRoute} from './routes/common';

import {dumpCounters} from './utils/dumpMetrics'
import {env} from './environment'
import {db} from './db/db'
import {metrics} from './utils/metrics'

env().setLogger(logger);
env().setDb(db);
env().setMetrics(metrics);

env().logger().debug('starting app')

var app = express();
setupPassport(passport);

app.use(cookieParser('keyboard cat'));
app.use(flash());

app.use(passport.initialize());

// all environments
app.set('port', process.env.PORT || 8080);

app.use(logHttpRequests());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.resolve(__dirname, "../../views"));
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, '../../wwwroot/app')));

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

setupAuthRoutes(app, passport);
setupApiRoutes(app);
setupCommonRoute(app);

setInterval(dumpCounters, 100);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});