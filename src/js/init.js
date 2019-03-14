
	
	
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
	
