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


module.exports = {
	'facebookAuth' : {
		'clientID': '999834393426000',
		'clientSecret': '89e5fdabd347e0f6c17c505f58235cb4',
		'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID': '319232751191-fbqjdo6iejvq16k3btdtrf630d18pb41.apps.googleusercontent.com',
		'clientSecret': 'md3fYwY-0g_lusXutSVC5HWv',
		'callbackURL': 'http://localhost:8080/auth/google/callback'
	}
}

export {providers, authProvider}