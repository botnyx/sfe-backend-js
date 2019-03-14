

	








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
	


sfe.f = {}
sfe.f.value = function(value){
	return value
}
sfe.f.cdnDomain = function(){
	return "https://"+sfe.vars.cdnurl
}
sfe.f.backendDomain = function(){
	return "https://"+sfe.vars.backendurl
}
sfe.f.getBackendUrl = function(){
	return 	sfe.f.backendDomain()+"/api/sfe/"+sfe.vars.client_id
}

sfe.f.loadCfg = function(){
	
	return new Promise(
		function (resolve,reject){
			sfe.vars.config = window.options.extcfg;
			resolve(window.options.extcfg);
		}
	);
}

sfe.f.injectCss = function(url){
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', url.trim());
	document.getElementsByTagName('head')[0].appendChild( link );
}
sfe.f.injectJs = function(url){
	var link = document.createElement('script');
	//link.setAttribute('rel', 'stylesheet');
	//link.setAttribute('type', 'text/css');
	link.setAttribute('src', url.trim());
	document.getElementsByTagName('head')[0].appendChild( link );
}

sfe.f.callbackMon =  new Promise(
	function (resolve, reject) {
			if( sfe.url.getParameterByName('access_token')!==null &&
				sfe.url.getParameterByName('expires_in')!==null &&
				sfe.url.getParameterByName('token_type')!==null &&
				sfe.url.getParameterByName('state')!==null ){

				console.log("A TOKEN REDIRECT WAS FOUND!");

				console.log('setting localstorage with Token.');
				localStorage.setItem('sfe.authorization',sfe.url.getParameterByName('access_token'))
				sfe.vars.headers.authorization = sfe.url.getParameterByName('access_token')
				console.log('resetting the # in the addresbar.');

				sfe.url.setHash(localStorage.getItem('lasthash'))
				resolve("ok");
			}
			
			if( sfe.url.getParameterByName('error')==="access_denied" ){
				console.log("sfe.f.callbackMon SET VARIABLES!");
				
				reject(sfe.url.getParameterByName('error_description'));
				//sfe.url.getParameterByName('error_description')
				//self.close ();
				//return;
				//alert(sfe.url.getParameterByName('error_description'));
			}

		}
);


sfe.f.callbackMonxx =  function(){
	console.log( "sfe.f.callbackMon()"  );
	
	
	// Promise
	return new Promise(
		function (resolve, reject) {
			if( sfe.url.getParameterByName('access_token')!==null &&
				sfe.url.getParameterByName('expires_in')!==null &&
				sfe.url.getParameterByName('token_type')!==null &&
				sfe.url.getParameterByName('state')!==null ){

				console.log("A TOKEN REDIRECT WAS FOUND!");

				console.log('setting localstorage with Token.');
				localStorage.setItem('sfe.authorization',sfe.url.getParameterByName('access_token'))
				sfe.vars.headers.authorization = sfe.url.getParameterByName('access_token')
				console.log('resetting the # in the addresbar.');

				sfe.url.setHash(localStorage.getItem('lasthash'))
				resolve("ok");
			}
			
			if( sfe.url.getParameterByName('error')==="access_denied" ){
				console.log("sfe.f.callbackMon SET VARIABLES!");
				
				reject(sfe.url.getParameterByName('error_description'));
				//sfe.url.getParameterByName('error_description')
				//self.close ();
				//return;
				//alert(sfe.url.getParameterByName('error_description'));
			}

		}
	);
	
/*
	if( sfe.url.getParameterByName('error')==="access_denied" ){
		console.log("sfe.f.callbackMon SET VARIABLES!");

		//sfe.url.getParameterByName('error_description')
		//self.close ();
		//return;
		alert(sfe.url.getParameterByName('error_description'));
	}


	if( sfe.url.getParameterByName('access_token')!==null &&
	   	sfe.url.getParameterByName('expires_in')!==null &&
		sfe.url.getParameterByName('token_type')!==null &&
	    sfe.url.getParameterByName('state')!==null ){

		console.log("A TOKEN REDIRECT WAS FOUND!");
		
		console.log('setting localstorage with Token.');
		localStorage.setItem('sfe.authorization',sfe.url.getParameterByName('access_token'))
		sfe.vars.headers.authorization = sfe.url.getParameterByName('access_token')
		console.log('resetting the # in the addresbar.');
		
		sfe.url.setHash(localStorage.getItem('lasthash'))
		
	}
*/
}




sfe.f.updateUi = function(){
	/* refresh ui content areas */
	console.log("sfe.f.updateUi called!")
	sfe.f.updateMenu()
}

sfe.f.updateMenu = function(){
	/* populate the navigation */
	sfe.url.get(sfe.f.getBackendUrl()+'/ui/load?item=sfe-nav-main').then( function(response){
		
	var myEle = document.getElementById("sf-nav-main");
    if(myEle){
		document.getElementById('sf-nav-main').innerHTML=response
	}else{
		console.log("Missing sf-nav-main");
	}
		
		
		
	}).catch(function(err){
		console.log('sfe.f.updateMenu: /ui/load?item=sfe-nav-main');
		alert(err)	
	});

}


sfe.f.loadCss = function(cssArray){
		
	console.log("sfe.f.loadCss() ")
	if(typeof(cssArray)!="object"){
		return Promise.resolve("No Css files loaded")
	}
	if(cssArray===null){
		return Promise.resolve("No Css files loaded")
	}
	/* Load all CSS */
	return cssArray.map(sfe.f.value).reduce(function(chain, itemPromise) {
		// Use reduce to chain the promises together,
		// but adding content to the page for each item
		return chain.then(function() {
			return itemPromise;
		}).then(function(cssUrl) {
			/* Inject CSS in the page */
			if( cssUrl==""){

			}else if (cssUrl.indexOf('/') > -1){
				tmp = sfe.f.cdnDomain()+''+cssUrl.trim()
				console.log('Load: '+tmp)
				sfe.f.injectCss(tmp);
			}else{
				tmp = sfe.f.cdnDomain()+'/assets/styles/'+cssUrl.trim()
				console.log('Load: '+tmp)
				sfe.f.injectCss(tmp);
			}

		});

	}, Promise.resolve("Css files loading finished."));	

	
	
	//console.log(cssArray)
	//console.log(cssArray);
		
	
}

sfe.f.loadJs = function(jsArray){
	
	console.log("-------->sfe.f.loadJs()")
	//console.log(typeof(jsArray) )
	
	if(typeof(jsArray)!=="object"){
		return Promise.resolve("No Js files loaded")
	}
	if(jsArray===null){
		return Promise.resolve("No Js files loaded")
	}
	
	/* Load all Javascript */
	return jsArray.map(sfe.f.value).reduce(function(chain, itemPromise) {
		// Use reduce to chain the promises together,
		// but adding content to the page for each item
		return chain.then(function() {
			return itemPromise;
		}).then(function(jsUrl) {
			/* Inject JS in the page */
			if( jsUrl==""){
			   
			}else if (jsUrl.indexOf('/') > -1){
				tmp = sfe.f.cdnDomain()+jsUrl.trim()
				console.log('Load: '+tmp)
				sfe.f.injectJs(tmp);
				
			}else{
				tmp = sfe.f.cdnDomain()+'/assets/scripts/'+jsUrl.trim()
				console.log('Load: '+tmp)
				sfe.f.injectJs(tmp);
				//sfe.f.injectCss(sfe.f.cdnDomain()+'/assets/scripts/'+cssUrl);
			}
			//sfe.f.injectJs(sfe.f.cdnDomain()+jsUrl);
		});

	}, Promise.resolve("Additional JavaScript loaded."));
}



sfe.f.loadContent = function (href){
	console.log("sfe.f.loadContent")
	var klikkerVar = new fe_click_helper(true);
	sfeUrlObject = klikkerVar.test(href);
	//if(sfeUrlObject.div==='external'){
	//	alert('click() wants to load external url');
	//}
	url = sfe.f.getBackendUrl()+'/ui/click?item='+sfeUrlObject.url

	//url = '/api/sfe/'+sfe.vars.config.client_id+'/ui/click?item='+sfeUrlObject.url;
	console.log(url);
	sfe.url.get(url).then( function(response){
		
		screenAssets = document.getElementById(location.hash)
		screenAssets = document.getElementsByTagName('script')
		
		for (i = 0; i < document.getElementsByTagName('script').length; i++) {
			document.getElementsByTagName('script')[i].remove()
		}
		
		//document.getElementsByTagName('script').length
		//	if(screenAssets!=null){
		//	screenAssets.remove()
			//console.log(screenAssets)
		//}
		
		
		// get the css, js , and remove the script
		/* Create new DomElement. */
		doc = new DOMParser().parseFromString(response, "text/html");
		// we now have a htmldoc with our body
		//window.XYZ = doc
		
		
		var content = {}
		/* get the required assets. */
		content.css = doc.body.childNodes[0].getAttribute("data-cssurl")
		if(content.css!=null && content.css!=""){
			content.css = content.css.split(",")
			if(typeof(content.css)=='string'){
				content.css = [content.css]
			}
		}
		
		content.js  = doc.body.childNodes[0].getAttribute("data-scripturl")
		if(content.js!=null && content.js!=""){
			content.js = content.js.split(",")
			if(typeof(content.js)=='string'){
				content.js = [content.js]
			}
		}
		
		
		content.inlinejs = doc.getElementsByTagName('script')[0]
		content.page = location.hash
		//content.body = doc.getElementsByTagName('body')[0].innerHTML;
		
		content.body = doc.getElementsByTagName('body')[0]
		window.content = content
		
		/*----------------------------------*/
		console.log('screen-js loadING')
		sfe.f.loadJs( content.js ).then( function(){
			console.log('screen-js loaded')
			
			/*
				Create inline script and execute
			*/
			
			//response = window.content
			
			
			return Promise.resolve(window.content)
			
		})
		
		
		
	}).then( function(response){
		// insert the css/js
		response = window.content
		console.log('RECEIVED CONTENT!');
		console.log(response);
		sfe.f.loadCss( response.css ).then( function(){
			console.log('screen-css loaded')
			var js = document.createElement("script");
			//js.type = "text/javascript";
			js.setAttribute('id', response.page);
			js.innerHTML = response.inlinejs.text + "//# sourceURL=sfe.js";
			document.body.appendChild(js);
		})
		
		/* Put the content in the page. */
		var myEle = document.getElementById("page-wrapper");
		if(myEle){
			myEle.innerHTML = response.body.innerHTML
		}else{
			console.log('Missing page-wrapper');
		}
		return Promise.resolve(response)
		
		
	}).then( function(response){
		// initialize the js
		

		
		return Promise.resolve(response)
	});
	
	//sfe.url.get(url).then( function(response){
		//sfe.fetch( xyz ).then( function(response){

		/* Create new DomElement. */
	//	doc = new DOMParser().parseFromString(response, "text/html");
		// we now have a htmldoc with our body
	//	window.XYZ = doc
		
		
		/* get the required assets. */
		//css = doc.body.childNodes[0].getAttribute("data-cssurl")
		//console.log(css);
		//sfe.f.loadCss( css ).then( function(){
	//		console.log('screen-css loaded')
	//	})
		
		
		
	//	js  = doc.body.childNodes[0].getAttribute("data-scripturl")
	//	console.log(js);
		//sfe.f.loadJs(js.trim().split(',')).then(function(){
			
		//})
		
	//	inlinejs = doc.getElementsByTagName('script')[0]
		
		
		/*
			Create inline script and execute
		*/
	//	var js = document.createElement("script");
		//js.type = "text/javascript";
	//	js.setAttribute('page', location.hash);
	//	js.innerHTML = inlinejs.text + "//# sourceURL=sfe.js";
	//	document.body.appendChild(js);
		
		//console.log(inlinejs.text)
		
	//	doc = null;
		

		
		
		
		//sfe.f.loadJs(js.trim().split(',')).then(function(){
			
		//})
		
		//console.log('"'+js+'"');
	//	if(js!==null){ 
	//		if( js.trim()!==""){
				//sfe.f.loadJs(js.trim().split(','));
	//		}
	//	}
		
		
		
	//	if( sfe.vars.serviceworker ){
			/* serviceworker is true. */
			
			
	//	}
		
	//	screenAssets = document.getElementById(location.hash)
	//	if(screenAssets!=null){
	//		screenAssets.remove()
	//		//console.log(screenAssets)
	//	}
		
		
		/* Put the content in the page. */
		//document.getElementById('page-wrapper').innerHTML = response
		
		

		
		//document.createElement('script')
		//eval(inlinejs.text)
		
		//document.getElementById('page-wrapper')
		//console.log(document.getElementById('page-wrapper').childNodes[0])
		
		
	//	return Promise.resolve("Content inserted in body.")
		
		
	//}).catch(err => alert(err)).then(function(data){
		
	//});	
}


sfe.f.setToken= function (token){
	localStorage.setItem("sfe.authorization",token);
	sfe.vars.headers.authorization=token;
	if(token=='visitor'){
		sfe.vars.tokendata=[]
	}else{
		sfe.vars.tokendata=jwt_decode(token)
	}
	
}
sfe.f.destroyToken= function (){
	localStorage.setItem("sfe.authorization","visitor");
	sfe.vars.headers.authorization="visitor";
	sfe.vars.tokendata=[];
}


sfe.e = {};
sfe.e.loadCfgError = function(){
	
}

sfe.sw = {};
sfe.sw.receivemessage = function(event){
	console.log("Client Received Message: " + event.data);
	console.log(event.data);
	//event.ports[0].postMessage("Client 1 Says 'Hello back!'");
};	


sfe.sw.send_message_to_sw = function(msg){
	console.log("sfe.send_message_to_sw()");
	//console.log(msg);
	return new Promise(function(resolve, reject){
        // Create a Message Channel
        var msg_chan = new MessageChannel();

        // Handler for recieving message reply from service worker
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
				console.log('rejected/')
				console.log(event.data.error)
				console.log('/rejected')
				reject(event.data.error);
            }else{
                console.log('resolved/')
				console.log(event.data)
				console.log('/resolved')
				resolve(event.data);
            }
        };
		//console.log("navigator.serviceWorker.controller.postMessage");
        
		//console.log(msg);
        // Send message to service worker along with port for reply
        navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);
    });

};	



sfe.sw.do = function(fName,options,callbackFname){
	"use strict";
	var msg = {"cmd":fName,"cmdparams":options,"callback":callbackFname};
	
	return new Promise(function(resolve, reject){
        // Create a Message Channel
        var msg_chan = new MessageChannel();

        // Handler for recieving message reply from service worker
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
				console.log('rejected/');
				console.log(event.data.error);
				console.log('/rejected');
				reject(event.data.error);
            }else{
                //console.log('sfe.sw.do: resolved/');
				//console.log(event.data);
				//console.log('/resolved')
				resolve(event.data);
            }
        };
		
		//console.log("navigator.serviceWorker.controller.postMessage");
        //console.log(navigator.serviceWorker.controller);
		//console.log(msg);
        // Send message to service worker along with port for reply
        navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);
    });
	
	
	
	//sfe.sw.send_message_to_sw({"cmd":fName,"cmdparams":options,"callback":callbackFname})
	
	
	
	
	
	
	//return sfe.sw.send_message_to_sw({"cmd":fName,"cmdparams":options,"callback":callbackFname});
}
	
	



	
	
sfe.init = function(options={}){
	//"use strict";
	
	/* default options */
	sfe.vars.options = {
		"configUrl": "https://"+sfe.vars.backendurl+"/api/sfe/ui/extcfg",
		"mode": "dev"
	}
	
	/* override options with user-provided */
	for(var o in sfe.vars.options){ sfe.vars.options[o]=options[o] }
	
	
	/* 
		callback-monitor - checks for redirects with token or error-messages. 
	*/
	//sfe.f.callbackMon();
	
	
	if(localStorage.getItem('sfe.authorization')===null){
		/* token doesnt exist */
		//console.log("visitor.");
		sfe.f.setToken('visitor');
		
		
	}else{
		/* token exists */
		
		/* 
			check if token is expired 
			
		*/
		if(localStorage.getItem('sfe.authorization')=='visitor'){
			// blagh!
		}else{
		   var decoded = jwt_decode(localStorage.getItem('sfe.authorization'));
			var ts = Math.round((new Date()).getTime() / 1000);
			if( decoded.exp<=ts  ){
				console.log('token is expired!');
				sfe.f.setToken('visitor');
			}else{
				sfe.f.setToken(localStorage.getItem('sfe.authorization'));
				//sfe.vars.headers.authorization = localStorage.getItem('sfe.authorization');
				//console.log(jwt_decode(sfe.vars.headers.authorization));
			}
		}
		
		
	}
	
	
	/* backup console.log */
	//sfe.consolelog = console.log
	//sfe.sw.do("hello",[1,2],'console.log');
	/* replace console.log with our own logger */
	//console.log = function(variable){ sfe.consolelog(variable) }
	console.log("At start the authToken="+sfe.vars.headers.authorization);
	
	//sfe.f.callbackMon().
	console.log("Load configuration, or fail.");
	/* Load configuration, or fail. */
	return sfe.f.loadCfg(sfe.vars.options.mode).then(function(retval){
		/* 
			Success getting the configuration 
		*/
		//console.log('config received.');
		//console.log("configdata:");
		//console.log(retval)
		/* 
			Set variables. 
		*/
		//sfe.vars.config = window.options.extcfg;//retval.data;
		
		
		
		sfe.vars.backendurl = retval.extracfg.backendhostname;
		sfe.vars.cdnurl 	= retval.extracfg.cdnhostname;
		sfe.vars.client_id 	= retval.extracfg.client_id;
		
		return Promise.resolve("ok");	
	}).then( function(e){
		
		
		
		/*
			here we check if we are dealing with a cross-account login..
		
		*/
		if( sfe.url.getParameterByName('error')==="crossaccount_login" ){
			/*
				?error=crossaccount_login&email=hopper.jerry@gmail.com&provider=facebook
			*/	
			//sfe.url.getParameterByName('email')
			//sfe.url.getParameterByName('provider')
			
			localStorage.setItem('inittask', JSON.stringify({
				"task": "crossaccount_login",
				
				"newprovider": sfe.url.getParameterByName('newprovider'),
				"internalid": sfe.url.getParameterByName('internalid'),
				"provider": sfe.url.getParameterByName('provider'),
				"providerid": sfe.url.getParameterByName('providerid')
			}));
			
			console.log("TASK ADDED: crossaccount_login");
			window.location.href= window.location.origin;
		}
		
		
		
		
		
		
		
		/*
			here we check if we are dealing with a callback url.
		
		*/
		if( sfe.url.getParameterByName('error')==="access_denied" ){
			console.log("this is a callback url,");
			console.log("access_denied");

			//sfe.url.getParameterByName('error_description')
			//self.close ();
			//return;
			//alert(sfe.url.getParameterByName('error_description'));
			return Promise.resolve(sfe.url.getParameterByName('error_description') );
		}


		if( sfe.url.getParameterByName('access_token')!==null &&
			sfe.url.getParameterByName('expires_in')!==null &&
			sfe.url.getParameterByName('token_type')!==null &&
			sfe.url.getParameterByName('state')!==null ){
			console.log("this is a callback url,");
			
			console.log('setting localstorage with received Token.');
			/*
				x
			*/
			
			sfe.f.setToken(sfe.url.getParameterByName('access_token'));
			
			console.log( sfe.vars.tokendata );
			
			console.log('resetting the # in the addresbar.');
			sfe.url.setHash(localStorage.getItem('lasthash'))
			
			return Promise.resolve('ok' );
		}
		console.log("this is not a callback url.. but that is ok.");
		return Promise.resolve('ok' );
		/* 
			It seems we are not a callback, as we are not returned the promise.
			do a manual check on the token that we have found.
		*/
		
		//console.log(sfe.f.callbackMon());
		//console.log(callbackResult);
		//return Promise.resolve(sfe.vars.config );
	}).then(function(result){
		//console.log(result)
		if(result!="ok"){
			console.log("some failure in the callback.");   
			console.log(result);   
		}else{
			console.log("After the callback, the authToken="+sfe.vars.headers.authorization);
			
		}
				
		
		return Promise.resolve(sfe.vars.config );
	}).then(function(result){
		//console.log(result)
		console.log("*-AUTH---------------------------------------------------------------------*")
		var appUsers = new appusers('test');
		var usersArray = appUsers.getAppIdentities();
		
		
		if(usersArray.length ===0){
		   console.log("no users found.");
		}else{
		   console.log("some users found.");
		}
		
		
		/* put bodyHtml in variables and discard other shit */
		//sfe.vars.bodyhtml = sfe.vars.config.html
		
		
		/* check for tokens in localstorage */
		
		/*
		if(localStorage.getItem('sfe.authorization')===null){
			// token doesnt exist 
			console.log('no token!');
			//sfe.vars.headers.authorization
			sfe.vars.headers.authorization = 'visitor'
			
		}else{
			// token exists 
			console.log('token exists!');
			//sfe.f.userstate();
			sfe.vars.headers.authorization = localStorage.getItem('sfe.authorization');
			
			//alert(sfe.vars.headers.authorization);
			if(sfe.vars.headers.authorization!="visitor"){
				var decoded = jwt_decode(sfe.vars.headers.authorization);
				var ts = Math.round((new Date()).getTime() / 1000);
				if( decoded.exp<=ts  ){
					console.log('token is expired!');
					sfe.vars.headers.authorization='visitor'
				}else{
					console.log("token expires in: "+(decoded.exp-ts))
					sfe.vars.tokendata = decoded;
					console.log(sfe.vars.tokendata);
					sfe.url.get("https://"+sfe.vars.backendurl+"/api/sfe/"+sfe.vars.client_id+"/ui/status").then( function(e){ 
						console.log("Response from .../ui/status");

						console.log(e);

					}).catch(function(e){
						console.log("ERROR Response from .../ui/status");

						console.log(e);
					})
					
					
				}
			}else{
				console.log("using visitor token.");
			}

			
		}
		*/
		
		//localStorage.setItem()
		
		
		
		
		
		console.log("*--------------------------------------------------------------------AUTH--*")
		return Promise.resolve("Auth layer finished.");
		
	}).then( function(retval){
		console.log(retval)
		/* Load all CSS */
		return sfe.vars.config.css.map(sfe.f.value).reduce(function(chain, itemPromise) {
			// Use reduce to chain the promises together,
			// but adding content to the page for each item
			return chain.then(function() {
				return itemPromise;
			}).then(function(cssUrl) {
				/* Inject CSS in the page */
				sfe.f.injectCss(sfe.f.cdnDomain()+cssUrl);
			});

		}, Promise.resolve("Css files loading finished."));
		
		
		

	} ).then(function(result){
		console.log("Css files loading finished.")
		/* Load all Javascript */
		return sfe.vars.config.js.map(sfe.f.value).reduce(function(chain, itemPromise) {
			// Use reduce to chain the promises together,
			// but adding content to the page for each item
			return chain.then(function() {
				return itemPromise;
			}).then(function(jsUrl) {
				/* Inject JS in the page */
				sfe.f.injectJs(sfe.f.cdnDomain()+jsUrl);
			});

		}, Promise.resolve("Additional JavaScript loaded."));
		

	}).then(function(result){
		console.log("Additional JavaScript loaded.");
		//document.getElementsByTagName('body').innerHtml
		
		//t = document.createElement('div');
		//t.innerHTML = sfe.vars.config.html;
		
		//document.body.innerHTML=sfe.vars.config.html;
		
		
		//t = document.createTextNode(sfe.vars.config.html);
		//document.getElementsByTagName('body')[0].appendChild( t );
		
		if(localStorage.getItem('inittask')===null){
			/* at this point, the framework is ready */
			sfe.f.updateUi();
			sfe.f.loadContent("#c/"+sfe.vars.config.extracfg.defaultpage);
		}else{
			var cmd = JSON.parse( localStorage.getItem('inittask') );
			console.log(cmd);
			if( cmd.task=='crossaccount_login' ){
				sfe.f.loadContent("#c/crosslogin");
			}
			
		}
		
		
		
		
		console.log("adding HashChange EventListener.");
		window.addEventListener("hashchange", function(){ 
			
			lochash = new fe_utils_locationhash(true,'#c/home')
			if(lochash.get().startsWith("#c/")){
				console.log('urlHash is a content-request');


				
				//lochash.get()

				// localStorage.getItem('lasthash').toString()
				if ( localStorage.getItem('lasthash')===null){ 
					var from = 'unknown'
				}else{
					var from = localStorage.getItem('lasthash')
				}


				console.log("url hash changed from: "+from+" to: "+lochash.get() )


				if(lochash.get()=='#'){
					console.log("lochash = #")
				}else if(lochash.get()==false){
					console.log("lochash = FALSE")
					//var klikkerVar = new fe_click_helper(true);
					//sfeUrlObject = klikkerVar.test(localStorage.getItem('lasthash'));

					//sfe.url.get(sfe.f.getBackendUrl()+'/ui/click?item='+sfeUrlObject.url).then( function(response){
					//sfe.fetch( xyz ).then( function(response){
					//	document.getElementById('page-wrapper').innerHTML=response



					//}).catch(err => alert(err));	

				} else {
					console.log("lochash == "+lochash.get())
					localStorage.setItem('lasthash',lochash.get())

					console.log( lochash.get() );
					sfe.f.loadContent( lochash.get() )	
				}
			
			}else{
				console.log('this looks like a normal anchor.')
			}
			
			
			
		});
		
		
		
		
		
		
		
		
		lochash = new fe_utils_locationhash(true,'#c/home')
		if(lochash.get()===false){
		   //alert("no lochash, using default.");
		}else if( lochash.get().startsWith("#c/")){
				console.log('urlHash is a content-request');


				
				//lochash.get()

				// localStorage.getItem('lasthash').toString()
				if ( localStorage.getItem('lasthash')===null){ 
					var from = 'unknown'
				}else{
					var from = localStorage.getItem('lasthash')
				}


				console.log("url hash changed from: "+from+" to: "+lochash.get() )


				if(lochash.get()=='#'){
					console.log("lochash = #")
				}else if(lochash.get()==false){
					console.log("lochash = FALSE")
					//var klikkerVar = new fe_click_helper(true);
					//sfeUrlObject = klikkerVar.test(localStorage.getItem('lasthash'));

					//sfe.url.get(sfe.f.getBackendUrl()+'/ui/click?item='+sfeUrlObject.url).then( function(response){
					//sfe.fetch( xyz ).then( function(response){
					//	document.getElementById('page-wrapper').innerHTML=response



					//}).catch(err => alert(err));	

				} else {
					console.log("lochash == "+lochash.get())
					localStorage.setItem('lasthash',lochash.get())

					console.log( lochash.get() );
					sfe.f.loadContent( lochash.get() )	
				}
			
			}else{
				console.log('this looks like a normal anchor.')
			}
			
			
		
		
		
		
		
		
		
		/* cleanup the config */
		return Promise.resolve("..----.");
			
	});

	
	

	
	
}
	
	
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

