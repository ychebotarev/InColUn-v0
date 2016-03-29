interface authProvider{
    clientID:string;
    clientSecret:string;
    callbackURL:string;
}

var facebookProvider= {
    clientID: 'enter client id here',
	clientSecret: 'enter client secret here',
	callbackURL: 'enter callback here'
}

var googleProvider={
    clientID: 'enter client id here',
	clientSecret: 'enter client secret here',
	callbackURL: 'enter callback here'
}

var providers:{[key:string]:authProvider} = {
    'facebook':facebookProvider,
    'google':googleProvider
};

export {providers, authProvider}