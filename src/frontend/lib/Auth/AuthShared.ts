/// <reference path="../../../,,/../../typings/jquery/jquery.d.ts"/>

import {AuthConfig} from './AuthConfig'

export class AuthShared{
    config:AuthConfig;
    tokenName:string;
    
    constructor($q, $window, $log, config:AuthConfig, storage){
        this.config = config;
        var tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join('_') : this.config.tokenName;    
    }
    
    getToken():any{
        return window[this.config.storageType].get(this.tokenName);
    };
    
    removeToken() {
          window[this.config.storageType].remove(this.tokenName);
    };
    
    
    getPayload():any {
        var token = this.getToken();

        if (token && token.split('.').length === 3) 
        {
            try {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
            } catch(e) {
                return undefined;
            }
        }
    };
    
    setToken(response:any) {
        if (!response) {
            return console.warn('Can\'t set token without passing a value');
        }

        var accessToken = response && response.access_token;
        var token;

        if (accessToken) {
            if ($.isPlainObject(accessToken) && $.isPlainObject(accessToken.data)) {
                response = accessToken;
            } 
            else if (typeof accessToken == "string") {
                token = accessToken;
            }
        }

        if (!token && response) {
            var tokenRootData = this.config.tokenRoot && this.config.tokenRoot.split('.').reduce(function(o, x) { return o[x]; }, response.data);
            token = tokenRootData ? tokenRootData[this.config.tokenName] : response.data && response.data[this.config.tokenName];
        }

        if (!token) {
            var tokenPath = this.config.tokenRoot ? this.config.tokenRoot + '.' + this.config.tokenName : this.config.tokenName;
            return console.warn('Expecting a token named "' + tokenPath);
        }

        window[this.config.storageType].set(this.tokenName, token);
    };
    
    isAuthenticated():boolean {
        var token = this.getToken();
        // A token is present
        if (!token) {
            return false;    
        }
            
        if (token.split('.').length != 3) {
            // PASS: All other tokens
            return true;
        }           
            
        // Token with a valid JWT format XXX.YYY.ZZZ     
        try {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var exp = JSON.parse(window.atob(base64)).exp;
            // JWT with an optonal expiration claims
            if (exp) {
                var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                if (isExpired) {
                        // FAIL: Expired token
                        return false;
                }else {
                    // PASS: Non-expired token
                    return true;
                }
              }
        } catch(e) {
                // PASS: Non-JWT token that looks like JWT
            return true;
        }
    }
}