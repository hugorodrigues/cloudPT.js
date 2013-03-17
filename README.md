cloudPT.js
==========
cloudPT API for nodeJS with multiple sessions support

---

This is a little API wrapper (less than 90LOC) that implements cloudPT in a simple RPC fashion: `cloudPt(<method>,<params>,<callback>)`

## Installation

```bash
$ npm install cloudpt
```

## Usage

```js
var cloudPt = require('cloudpt')({
	oAuthAppKey: 'YOUR APP KEY',
	oAuthAppSecret: 'YOUR APP SECRET',

	oAuthConsumerKey: 'A CONSUMER/ACCESS KEY',
	oAuthConsumerSecret: 'A CONSUMER/ACCESS SECRET',
});

cloudPt('Metadata',{ pathname: '/stuff/Téstâção' }, function(error, data){
	console.log(error, data)
});

cloudPt('CreateFolder',{ root: 'cloudpt', path: '/fuckYeah' }, function(error, data){
	console.log(error, data)
});

// sandbox mode
cloudPt('List',{ sandbox: true, pathname: '/stuff/Téstâção', order_by: 'mtime' }, function(error, data){
	console.log(error, data)
});
```



## Multiple sessions
You can have multiple sessions without create new instances, just pass the oAuthConsumerKey/oAuthConsumerSecret in the last param:

`cloudPt(<method>,<params>,<callback>,<oauthConsumer>)`

```js
var cloudPt = require('cloudpt')({
	oAuthAppKey: 'YOUR APP KEY',
	oAuthAppSecret: 'YOUR APP SECRET',
});

// oAuth consumer key passed
cloudPt('Metadata',{ pathname: '/' }, function(error, data){
	console.log(error, data)
}, {oAuthConsumerKey: 'sessions1_key', oAuthConsumerSecret: 'xxx'});

// another session
cloudPt('Metadata',{ pathname: '/' }, function(error, data){
	console.log(error, data)
}, anotherAccount);
```
Note: You can still pass the oAuthConsumerKey/oAuthConsumerSecret in the initialization, that will be the default.




---
## License 

(The MIT License)

Copyright (c) 2013 Hugo Rodrigues, http://starteffect.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
