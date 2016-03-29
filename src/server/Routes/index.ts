/// <reference path='../../../typings/tsd.d.ts' />

import express = require('express');
import {User} from '../db/user'

var routes = express.Router();

routes.get('/', function(req, res, next) {
    res.render("index", {
        message: "Hey everyone! This is my webpage."
    });
});

routes.get('/:username/:password/', function(req, res, next) {
    var newUser = new User();
    newUser.username = req.params.username;
    newUser.password = req.params.password;
    
    console.log(newUser.username + ' ,' + newUser.password);
    newUser.save();
    res.render("index", {
        message: "Hey everyone! This is my webpage."
    });
})

export {routes}