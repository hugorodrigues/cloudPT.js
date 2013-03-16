var cloudPt = require('./cloudPT.js')({
	oAuthAppKey: 'YOUR APP KEY',
	oAuthAppSecret: 'YOUR APP SECRET',

	oAuthConsumerKey: 'A CONSUMER/ACCESS KEY',
	oAuthConsumerSecret: 'A CONSUMER/ACCESS SECRET',
});


cloudPt('Metadata',{ pathname: '/warez' }, function(error, data){
	console.log(error, data)
});