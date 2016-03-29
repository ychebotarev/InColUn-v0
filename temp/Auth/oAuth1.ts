/// <reference path="../../../,,/../../typings/jquery/jquery.d.ts"/>

import {oAuthProvider} from './oAuthProvider'
import {AuthConfig, defaultConfig}  from './AuthConfig'
import {urljoin} from '../../core/helpers'

export class oAuth1{
    provider:oAuthProvider;
    config:AuthConfig;
    
    constructor(provider:oAuthProvider, config:AuthConfig){
        this.provider = provider;
        this.config;
    }
    
    exchangeForToken(oauthData:any, userData:any) {
            var data = $.extend({}, userData, oauthData);
            var exchangeForTokenUrl = this.provider.url;
            
            //return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
    };  
          
    static buildQueryString(arg:any):string {
        var str = [];
        var argType = typeof arg;
      	if (argType === 'object') {
            for (var key in arg) {
			    if (arg[key]) {
						str.push(encodeURIComponent(key) + '=' + encodeURIComponent(arg[key]));
			    }
		    }
        }
    
        return str.join('&');
    };
          
    open(options:any, userData:any):string{
            
            var popupWindow;
            var serverUrl = this.config.baseUrl ? urljoin(config.baseUrl, config.url) : defaultConfig.url;

            popupWindow = popup.open('', defaults.name, defaults.popupOptions, defaults.redirectUri);

            return $http.post(serverUrl, defaults)
              .then(function(response) {
                var url = [this.provider.authorizationEndpoint, oAuth1.buildQueryString(response.data)].join('?');

                popupWindow.popupWindow.location = url;

                var popupListener;

                popupListener = popupWindow.pollPopup(defaults.redirectUri);

                return popupListener
                  .then(function(response) {
                    return Oauth1.exchangeForToken(response, userData);
                  });
              });

    };    
}