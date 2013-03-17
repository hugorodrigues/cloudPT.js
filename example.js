var cloudPt = require('./cloudpt.js')({
	oAuthAppKey: 'YOUR APP KEY',
	oAuthAppSecret: 'YOUR APP SECRET',

	oAuthConsumerKey: 'A CONSUMER/ACCESS KEY',
	oAuthConsumerSecret: 'A CONSUMER/ACCESS SECRET',
});


cloudPt('Metadata',{ pathname: '/' }, function(error, data){
	console.log(error, data)
});


// Using another session
cloudPt('Metadata',{ pathname: '/' }, function(error, data){
	console.log(error, data)
}, {oAuthConsumerKey: 'xxxx', oAuthConsumerSecret: 'xxxx'});


