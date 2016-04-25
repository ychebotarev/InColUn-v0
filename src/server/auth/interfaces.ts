interface userLoginInfo{
    id:string,
    user_id_key:number,
    password:string,
    displayName:string        
}

interface userToken{
    id:string,
    user_id_key:number,
    username:string
}

interface localLoginResponse{
	success:boolean;
	message:string;
	token?:string;
}

interface localLoginCallback { ( response:localLoginResponse): void }
interface externalLoginCallback { (errorMsg:string, user:userToken): void }

export{userLoginInfo, userToken, localLoginResponse, localLoginCallback, externalLoginCallback}

