import {oAuthType} from './oAuthType'
import {oAuthPoputOptions} from './oAuthPoputOptions'

export interface oAuthProvider{
    name: string,
    url: string,
    authorizationEndpoint: string,
    redirectUri: string,
    requiredUrlParams: string[],
    scope: string[],
    scopeDelimiter: string,
    display: string,
    oauthType: oAuthType,
    popupOptions: oAuthPoputOptions    
}

