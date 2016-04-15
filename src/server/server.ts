/// <reference path='../../typings/tsd.d.ts' />
import express = require('express');
import path = require('path');
import http = require('http');
import logger = require('morgan');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import errorhandler = require('errorhandler')
import flash = require('connect-flash');
import cookieParser = require('connect-flash');
import passport = require('passport');
import session = require('express-session');

import {setupPassport} from './auth/passport'
import {setupIndexRoutes} from './routes/index';
import {setupAuthRoutes} from './routes/auth';
import {setupApiRoutes} from './routes/api';
import {setupBoardsRoute} from './routes/boards';

var app = express();
setupPassport(passport);

app.use(cookieParser('keyboard cat'));
app.use(session({ secret: 'anystringoftext', cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// all environments
app.set('port', process.env.PORT || 3000);

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
//setupBoardsRoute(app);

app.all('/*', function(req, res, next){
    console.log('capture');
    next();
});

app.get('/', function(req, res){
		res.render("index");
	});

app.get('/boards', function(req, res){
		res.render("boards");
	});
    
app.use((req, res, next) => {
   var err = new Error('Not Found');
   err['status'] = 404;
   next(err);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});