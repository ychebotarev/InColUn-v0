interface externalAuthProvider{
    clientID:string;
    clientSecret:string;
    callbackURL:string;
}

var facebookProvider= {
    clientID: '999834393426000',
	clientSecret: '89e5fdabd347e0f6c17c505f58235cb4',
	callbackURL: 'http://localhost:8080/auth/facebook/callback'
}

var googleProvider={
    clientID: '319232751191-fbqjdo6iejvq16k3btdtrf630d18pb41.apps.googleusercontent.com',
	clientSecret: 'md3fYwY-0g_lusXutSVC5HWv',
	callbackURL: 'http://localhost:8080/auth/google/callback'
}

var providers:{[key:string]:externalAuthProvider} = {
    'facebook':facebookProvider,
    'google':googleProvider
};

export {providers, externalAuthProvider}