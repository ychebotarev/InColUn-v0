import {AuthConfig, defaultConfig}  from './AuthConfig'
import {AuthShared} from './AuthShared'
import {urljoin} from '../../core/helpers'

export class Local{
    config:AuthConfig;
    shared:AuthShared;
    constructor($http, utils, shared:AuthShared, config:AuthConfig){
        this.shared = shared;
        this.config = config;
    }
    
    login(user:any, opts:any) {
          opts = opts || {};
          opts.url = opts.url ? opts.url : urljoin(this.config.baseUrl, this.config.loginUrl);
          
          opts.data = user || opts.data;
          opts.method = opts.method || 'POST';
          opts.withCredentials = opts.withCredentials || this.config.withCredentials;

          /*
          return $http(opts).then(function(response) {
            this.shared.setToken(response);
            return response;
          });*/
        };

    signup(user, opts) {
        opts = opts || {};
        opts.url = opts.url ? opts.url : urljoin(this.config.baseUrl, this.config.signupUrl);
        opts.data = user || opts.data;
        opts.method = opts.method || 'POST';
        opts.withCredentials = opts.withCredentials || this.config.withCredentials;

        //return $http(opts);
    };

}