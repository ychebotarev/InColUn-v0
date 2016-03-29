/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../typings/passport/passport.d.ts' />
 
import {Passport} from 'passport'

import express = require('express');
import FlakeId = require('flake-idgen');

import {server_config} from '../config'
import {User} from '../db/models/user'

function setupApiRoutes(router: express.Router, passport:Passport){
    router.use(passport.authenticate('bearer', { session: false }));
    
    router.get('/boards', function(req, res){
		res.json({ SecretData: 'abc123' });
	});        
    router.get('/board/:guid', function(req, res){
		res.json({ SecretData: 'abc123' });
	});        
}