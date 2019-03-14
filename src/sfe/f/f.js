
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
