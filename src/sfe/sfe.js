

	








var sfe = {}
sfe.vars={}
sfe.vars.config={}
sfe.vars.headers={}

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
		'Origin': 'devpoc.nl',
		'Host': 'backend.devpoc.nl',
		'Authorization': 'Bearer '+sfe.vars.headers.authorization
	  }
	}
	return options
}

sfe.url.get = function(url){
	var options = sfe.url.options()
	options.method='GET'
	options.headers['Accept']='text/html'
	options.headers['Content-Type']='text/html'
	options.headers['Origin']='https://devpoc.nl/'
	options.headers['Referer']='https://devpoc.nl/'
	
	return fetch(url,options).then(response => response.text());
}
sfe.url.getJson = function(url){
	var options = sfe.url.options()
	options.method='GET'
	options.headers['Accept']='application/json'
	options.headers['Content-Type']='application/json'
	return fetch(url,options).then(response => response.json());
}
sfe.url.getTest = function(url){
	var options = sfe.url.testoptions()
	options.method='GET'
	options.headers['Accept']='application/json'
	options.headers['Content-Type']='application/json'
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
	



sfe.e = {};
sfe.e.loadCfgError = function(){
	
}


{{ include("sw/sw.js" )}}



	
function test2(){
	var db = new Dexie("test");

	db.version(1).stores({
		identities: 'identityId,identityToken'
	});

	var drops = [{identityId: "myidentity1", identityToken:"mytoken1"},{identityId: "myidentity2", identityToken:"mytoken2"}];

	//for (var i=0;i<5000;++i) {
	//	drops.push( {id: i, position: [Math.random(),Math.random(),Math.random()]} );
	//}
	
	db.identities.count( function(count){
		if (count==0){
			db.identities.bulkAdd(drops).then(function(lastKey) {
				console.log("Last raindrop's id was: " + lastKey); // Will be 100000.
				
			}).catch(Dexie.BulkError, function (e) {
				// Explicitely catching the bulkAdd() operation makes those successful
				// additions commit despite that there were errors.
				console.error ("Some raindrops did not succeed. However, " +
				   5000-e.failures.length + " raindrops was added successfully");
			});
		
			
			
			
		}
	});
	
	
	
};



function testje(){
	var db = new Dexie("test");

	db.version(1).stores({
		identities: 'identityId,identityToken'
	});
	
	db.identities.count( function(count){
		console.log("count:"+count);
		return count;
		
		if(count==0){
			
		}
		
		
	});
	
	//return db;
	//db.raindrops.each(drop => console.log(drop.id));			
}	








































	
	
(function(window, undefined){
	/* use strict requires us to define each vars before using...  ES5 */
	"use strict";	
	// Check that service workers are registered
	if ( !('serviceWorker' in navigator) ){
		alert("Your browser sux! (or try https)");
	}else{
		/* Handler for messages coming from the service worker */
		
		// Use the window load event to keep the page load performant
		window.addEventListener('load', () => {
			//navigator.serviceWorker.register('/sw.js');
			navigator.serviceWorker.register('/sw.js'/*,{scope: 'sw-test'}*/).then(function(registration){
				// registration worked
				console.log('swRegistration Succeeded.');
				sfe.f.swreg = registration
				// sfe.f.swreg.update()
				/* configuration options */
				
				navigator.serviceWorker.addEventListener('message',sfe.sw.receivemessage);	
				/* init the framework */
				sfe.init(window.options).then(function(d){
					console.log("init is done!");
					console.log(d);
					
					//console.log("remove spinner.");
					document.getElementById("sfeboot").remove();
					
					//sfe.sw.do("hello",[1,2],"").then(function(e){
						
						//alert("yes!! "+e);
					//});
					
					
				});

				
			}).catch(function(error){
				// registration failed
				console.log('service worker registration failed with ' );
				console.log(error);
			});
			
			
		});
		navigator.serviceWorker.addEventListener('message',sfe.sw.receivemessage);	

	}

	
	
	
	
	
})(window,undefined);	

