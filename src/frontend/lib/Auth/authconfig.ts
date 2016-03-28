export interface AuthConfig{
      httpInterceptor: (request:any) =>boolean,
      withCredentials: boolean,
      tokenRoot: string,
      baseUrl: string,
      loginUrl: string,
      signupUrl: string,
      unlinkUrl: string,
      tokenName: string,
      tokenPrefix: string,
      authHeader: string,
      authToken: string,
      storageType: string
}

var defaultConfig:AuthConfig = {
      httpInterceptor: (request:any) =>{ return true},
      withCredentials: false,
      tokenRoot: null,
      baseUrl: '/',
      loginUrl: '/auth/login',
      signupUrl: '/auth/signup',
      unlinkUrl: '/auth/unlink/',
      tokenName: 'token',
      tokenPrefix: 'satellizer',
      authHeader: 'Authorization',
      authToken: 'Bearer',
      storageType: 'localStorage'
}

export {defaultConfig}