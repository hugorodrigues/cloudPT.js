//     cloudPT.js
//     http://starteffect.com | https://github.com/hugorodrigues
//     (c) Copyright 2013 Hugo Rodrigues, StartEffect U. Lda
//     This code may be freely distributed under the MIT license.

module.exports = function(config){

	var schema = {
		metadata 					: ['get', 'https://publicapi.cloudpt.pt/1/Metadata/[cloudpt|sandbox]/[pathname]'],
		metadatashare			: ['get', 'https://publicapi.cloudpt.pt/1/MetadataShare/[shareid]/[pathname]'],

		listlinks					: ['get', 'https://publicapi.cloudpt.pt/1/ListLinks'],
		deletelink				: ['post', 'https://publicapi.cloudpt.pt/1/DeleteLink'],
		shares 						: ['post', 'https://publicapi.cloudpt.pt/1/Shares/[cloudpt|sandbox]/[pathname]'],

		sharefolder 			: ['post', 'https://publicapi.cloudpt.pt/1/ShareFolder/[cloudpt|sandbox]/[pathname]'],
		listsharedfolders : ['get', 'https://publicapi.cloudpt.pt/1/ListSharedFolders'],

		list 							: ['get', 'https://publicapi.cloudpt.pt/1/List/[cloudpt|sandbox]/[pathname]'],
		thumbnails 				: ['get', 'https://api-content.cloudpt.pt/1/Thumbnails/[cloudpt|sandbox]/[pathname]'],
		search 						: ['post', 'https://publicapi.cloudpt.pt/1/Search/[cloudpt|sandbox]/[pathname]'],
		revisions 				: ['get', 'https://publicapi.cloudpt.pt/1/Revisions/[cloudpt|sandbox]/[pathname]'],
		restore 					: ['post', 'https://publicapi.cloudpt.pt/1/Restore/[cloudpt|sandbox]/[pathname]'],
		media 						: ['post', 'https://publicapi.cloudpt.pt/1/Media/[cloudpt|sandbox]/[pathname]'],
		files 						: ['get', 'https://api-content.cloudpt.pt/1/Files/[cloudpt|sandbox]/[pathname]'],
		delta 						: ['get', 'https://publicapi.cloudpt.pt/1/Delta'],

		copy 							: ['post', 'https://publicapi.cloudpt.pt/1/Fileops/Copy'],
		copyref 					: ['get', 'https://publicapi.cloudpt.pt/1/CopyRef/[cloudpt|sandbox]/[pathname]'],
		delete 						: ['post', 'https://publicapi.cloudpt.pt/1/Fileops/Delete'],
		move 							: ['post', 'https://publicapi.cloudpt.pt/1/Fileops/Move'],
		createfolder 			: ['post', 'https://publicapi.cloudpt.pt/1/Fileops/CreateFolder'],
		undeletetree 			: ['post', 'https://publicapi.cloudpt.pt/1/UndeleteTree'],
		'account/info' 		: ['get', 'https://publicapi.cloudpt.pt/1/Account/Info'],
	}

	var OAuth= require('oauth').OAuth;
			oAuth= new OAuth("https://cloudpt.pt/oauth/request_token", "https://cloudpt.pt/oauth/access_token", config.oAuthAppKey, config.oAuthAppSecret, "1.0", "oob", "HMAC-SHA1" );

	// Object to querystring: stackoverflow.com/questions/1714786/
	var serialize = function(obj) {
	  var str = [];
	  for(var p in obj)
	     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	  return str.join("&");
	}

	function httpCall(verb, url, params, cb, oAuthConf){ 

		if (verb == 'post')
			oAuth.post(url, oAuthConf.oAuthConsumerKey || config.oAuthConsumerKey, oAuthConf.oAuthConsumerSecret || config.oAuthConsumerSecret, params, cb);
		else
			oAuth.get(url+(params ? '?'+serialize(params): ''), oAuthConf.oAuthConsumerKey || config.oAuthConsumerKey, oAuthConf.oAuthConsumerSecret || config.oAuthConsumerSecret, cb);

		//console.log(url);
	}

	return function(method, params, cb, oAuthConf) {

		var method = method.toLowerCase()

		if (typeof schema[method] == 'undefined')
			return cb(true, {}); // error

		// Pathname & sandbox goes only to URL
		var url = schema[method][1];
		url = url.replace("[cloudpt|sandbox]", (params.sandbox) ? 'sandbox' : 'cloudpt');

		// params.pathname without first /
		if (params.pathname && params.pathname.substr(0,1) == '/')
				params.pathname = params.pathname.substr(1);

		url = url.replace("[pathname]", (params.pathname) ? params.pathname : '');

		httpCall(schema[method][0], url, params, function(error, data){
    	if (error) 
    		cb(error) 
    	else 
    		cb(null, JSON.parse(data))
		}, oAuthConf || {})

	}

}