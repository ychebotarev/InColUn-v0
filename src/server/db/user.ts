/// <reference path='../../../typings/tsd.d.ts' />
import mongoose = require('mongoose')

interface IUser {
    username: string;
    password: string;
    displayName: string;
};

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    displayName:String   
});

var User = mongoose.model<IUserModel>("User", userSchema);

export {User}