﻿/// <reference path='../../typings/tsd.d.ts' />
import express = require('express');
import path = require('path');
import http = require('http');
import logger = require('morgan');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import errorhandler = require('errorhandler')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

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

app.get("/", function (req, res) {
    res.render("index", {
        message: "Hey everyone! This is my webpage."
    });
});

app.get("/testejs", function (req, res) {
        res.render("test", { title: "EJS test" })
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});