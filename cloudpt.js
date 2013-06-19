//     cloudPT.js
//     http://starteffect.com | https://github.com/hugorodrigues
//     (c) Copyright 2013 Hugo Rodrigues, StartEffect U. Lda
//     This code may be freely distributed under the MIT license.

module.exports = function(config){

	var request	= require('request');
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

	// Everything passes here.
	function httpCall(verb, url, params, cb, oAuthConf){

		var requestParams = {
			url:url,
			method:verb,
			body: (verb == 'post') ? params : null,
			qs: (verb == 'get') ? params : null,
			json:true,
			oauth: {
				'consumer_key': config.oAuthAppKey,
				'consumer_secret': config.oAuthAppSecret,
				'token': oAuthConf.oAuthConsumerKey || config.oAuthConsumerKey,
				'token_secret': oAuthConf.oAuthConsumerSecret || config.oAuthConsumerSecret
			}
		}

		// We are also returning the request object (so you can use to pipe it)
		return request(requestParams, function(error, response, body){
			cb(error, body);
		})
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

		return httpCall(schema[method][0], url, params, cb, oAuthConf || {})

	}

}