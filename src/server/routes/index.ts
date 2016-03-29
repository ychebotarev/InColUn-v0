/// <reference path='../../../typings/tsd.d.ts' />

import express = require('express');

var indexRouter = express.Router();

indexRouter.get('/', function(req, res, next) {
    res.render("index", {
        message: "Hey everyone! This is my webpage."
    });
});


export {indexRouter}