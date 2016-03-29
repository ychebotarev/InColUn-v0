/// <reference path='../../../typings/tsd.d.ts' />

import express = require('express');
import {User} from '../db/models/user'
var loginRouter = express.Router();

loginRouter.get('/:username/:password', function (req, res) {
    var user = new User();
    user.email = "bla";
    user.username = req.params.username;
    user.password = req.params.password; 
    user.save();
    res.status(200).send(req.params.username+':'+req.params.password+ 'was saved.');
});

    

export {loginRouter};