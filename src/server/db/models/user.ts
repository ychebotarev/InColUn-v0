import {Document, Schema, model} from 'mongoose';
var bcrypt = require('bcrypt');

interface ILocalInfo{
    username:string;
    email:string;
    password:string;
}

interface IFacebookInfo{
    id: string,
    token: string,
    email: string,
    name: string   
}

interface IGoogleInfo{
    id: string,
    token: string,
    email: string,
    name: string   
}

interface IUser{
    guid:string,
    local:ILocalInfo,
    facebook:IFacebookInfo,
    google:IGoogleInfo
}

interface IUserModel extends IUser, Document{};

let userSchema = new Schema({
    guid:String,
    local: {
		username: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}});

userSchema.method('generateHash',function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
})

userSchema.method('validPassword', function(password){
	return bcrypt.compareSync(password, this.local.password);
})
let User = model<IUserModel>("User", userSchema);
    
export {User}