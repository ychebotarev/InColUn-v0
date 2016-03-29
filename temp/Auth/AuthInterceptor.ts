import {AuthConfig} from './AuthConfig'

export class Interceptor{
    config:AuthConfig;    
    constructor($q, config:AuthConfig, storage, shared){
        this.config = config;
    }
    request(req:any):any {
    if (req.skipAuthorization) {
        return req;
    }

    if (this.shared.isAuthenticated() && this.config.httpInterceptor(req)) {
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
        var token = storage.get(tokenName);

        if (config.authHeader && config.authToken) {
            token = config.authToken + ' ' + token;
        }

        request.headers[config.authHeader] = token;
    }

    return request;
    }    
}