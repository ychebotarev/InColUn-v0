﻿/// <reference path='../../typings/tsd.d.ts' />
import express = require('express');
import path = require('path');
import http = require('http');
import logger = require('morgan');
import bodyParser = require('body-parser');
import errorhandler = require('errorhandler')
import flash = require('connect-flash');
import cookieParser = require('cookie-parser');
import passport = require('passport');
import session = require('express-session');
import morgan = require('morgan')
import bcryptjs = require('bcryptjs')
import crypto = require('crypto');

import {setupPassport} from './auth/setupPassport'
import {setupIndexRoutes} from './routes/index';
import {setupAuthRoutes} from './routes/auth';
import {setupApiRoutes} from './routes/api';
import {setupBoardsRoute} from './routes/boards';

import {murmurhash3_32_gc} from './utils/murmurhash3_gc';
import * as mysql from 'mysql'

function encryptPassword(password:string, salt:string):string {
    if (!password) return '';
    try {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    } catch (err) {
        return '';
    }
}


var result:number = murmurhash3_32_gc('a@a', 1001)
var pwd = encryptPassword('a', '1001');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '!qAzXsW2',
  database : 'incolun'
});

connection.connect();
connection.query('SELECT * from users', function(err, rows, fields) {
    if (err) throw err;

    console.log('The email is: ', rows[0].email);
});

connection.end();

var app = express();
setupPassport(passport);

app.use(cookieParser('keyboard cat'));
app.use(flash());

app.use(passport.initialize());

// all environments
app.set('port', process.env.PORT || 8080);

app.use(morgan('combined'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.resolve(__dirname, "../../views"));
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, '../../wwwroot/app')));

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

//setupIndexRoutes(app);
setupAuthRoutes(app, passport);
//setupApiRoutes(app, passport);
setupBoardsRoute(app);

app.all('/*', function(req, res, next){
    console.log('capture');
    console.log(req.url);
    next();
});

app.get('/', function(req, res){
		res.render("index");
	});

app.use((req, res, next) => {
   var err = new Error('Not Found');
   err['status'] = 404;
   next(err);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});