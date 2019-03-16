sfe.url	= {}
sfe.url.getParameterByName = function(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[#?&]' + name + '(=([^&#]*)|&|#|$)'),results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

sfe.url.setHash = function (value){
	window.location.hash = value;
	//e.preventDefault();
}

//  no-cors    
sfe.url.testoptions = function(){
	var options = {  
	  method: 'GET',
	  cache: 'default',
	  mode: 'no-cors',
	  redirect: 'follow',
	  headers: {
		'Accept': 'text/html',
		'Content-Type': 'text/html',
		'Origin': 'devpoc.nl',
		'Host': 'backend.devpoc.nl',
		'Authorization': 'Bearer '+sfe.vars.headers.authorization
	  }
	}
	return options
}

sfe.url.options = function(){
	var options = {  
	  method: 'GET',
	  cache: 'default',
	  mode: 'cors',
	  redirect: 'follow',
	  headers: {
		'Accept': 'text/html',
		'Content-Type': 'text/html',
		/*'Origin': 'devpoc.nl',
		'Host': 'backend.devpoc.nl',
		'Authorization': 'Bearer '+sfe.vars.headers.authorization*/
	  }
	}
	return options
}

sfe.url.get = function(url){
	console.log("sfe.url.get");
	var options = sfe.url.options()
	options.method='GET'
	options.headers['Accept']='text/html'
	options.headers['Content-Type']='text/html'
	//options.headers['Origin']='https://devpoc.nl/'
	//options.headers['Referer']='https://devpoc.nl/'
	
	return fetch(url,options).then(response => response.text());
}
sfe.url.getJson = function(url){
	console.log("sfe.url.getJson");
	var options = sfe.url.options()
	options.method='GET'
	options.headers['Accept']='application/json'
	options.headers['Content-Type']='application/json'
	return fetch(url,options).then(response => response.json());
}
sfe.url.getTest = function(url){
	console.log("sfe.url.getTest");
	var options = sfe.url.testoptions()
	options.method='GET'
	//options.headers['Accept']='application/json'
	//options.headers['Content-Type']='application/json'
	//options.headers['Origin']='https://lookup.devpoc.nl'
	return fetch(url,options).then(response => response);
}



/*
sfe.url.post = function(url){
	var options = sfe.url.options()
	options.method='POST'
	options.headers['Accept']='text/html'
	options.headers['Content-Type']='text/html'
	return fetch(url,options).then(response => response.text());
	
}

sfe.url.postJson = function(url){
	var options = sfe.url.options()
	options.method='POST'
	options.headers['Accept']='application/json'
	options.headers['Content-Type']='application/json'
	return fetch(url,options).then(response => response.json());
}

*/
	
