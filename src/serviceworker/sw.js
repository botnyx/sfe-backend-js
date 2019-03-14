
importScripts('https://cdn.devpoc.nl/assets/js/dfahlander/dexie.js/Dexie.js-2.0.4/dist/dexie.js');









var sfw = {};
sfw.sw = {};





sfw.sw.fn = {};


sfw.sw.fn.test2= function (){
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
	
	
	
}

sfw.sw.fn.test1 =function(){
	var db = new Dexie("test");

	db.version(1).stores({
		identities: 'identityId,identityToken'
	});
	
	db.identities.count( function(count){
		console.log("count:"+count);
		return count;
	});
	
	//return db;
	//db.raindrops.each(drop => console.log(drop.id));			
}	
	



function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
  		resolve(req.response);
        reject( Error(req.statusText));
	  

  });
}


sfw.sw.fn.init = function(options){
	console.log("fn.init");
	
	//console.log(options);
	var db = new Dexie('sfe-app');
	
	db.version(1).stores({"config":"identityId,identityToken"});
	
	db.open().catch(function (err) {
		// no database (yet)
		console.error (err.stack || err);
	});
	
	
	
	
	return "init result."
}


//////////////////////////////

sfw.sw.fn.getconfig = function(options){
	"use strict";
	return fetch(options.configUrl)
		.then(function(response){ 
			return response.json();
		})
		.then(function(data){
			console.log('Request succeeded with JSON response', data);
			Promise.resolve(data)
			//sfe.sw.send_message_to_all_clients(data);
		})
		.catch(function(error){
			console.log('Request failed', error);
			Promise.reject(error);
		});
	
	
	/*
	function(response){
		//response => response.json()
		
		var configObject = {};
		configObject.ui = {};
		configObject.template = "laborator\/neon-bootstrap-admin-theme";
		configObject.languages = "en-UK,nl-NL";
		configObject.ui.css = [];
		configObject.ui.js  = [];
		configObject.client_id = "709b6bb0-devpoc-website";
		configObject.disabled = false;
		configObject.disabledreason = "";
		configObject.backendhostname = "backend.devpoc.nl";
		configObject.cdnhostname = "cdn.devpoc.nl";
		configObject.hostname = "devpoc.nl";
		configObject.defaultpage = "home";
		
		configObject.resp = response;
		//return configObject;
		
		return Promise.resolve(configObject);
		
		
		}
	
	*/
	
	
	
}







sfw.sw.fn.hello = function(a){
	"use strict";
	return new Promise(function(resolve, reject){
		
		if (1 /* everything turned out fine */) {
			resolve("fn.hello reponse!");
		}else{
			reject(Error("fn.hello reponse failed!"));
		}						 
	});
};

sfw.sw.fn.setprecache = function (precacheArray){
	"use strict";
	workbox.precaching.precacheAndRoute(precacheArray);
};
sfw.sw.fn.hellox = function(a){
	"use strict";
	console.log("cmd:hellox");
	console.log(a);
	workbox.precaching.precacheAndRoute(a);
};




sfw.sw.messageListener = function(event){
	"use strict";
	if(typeof(event.data)==="string"){
		console.log("its a string!");
	}
	
	if ( 	event.data.hasOwnProperty("cmd") /* check if param exists */ &&
	   		event.data.hasOwnProperty("cmdparams") /* check if param exists */ &&
	   		event.data.hasOwnProperty("callback") /* check if param exists * /  &&
	   		typeof(event.data.callback)==="string" /* check if callback-param a string */ 
	   ) { 
		
		if( sfw.sw.fn.hasOwnProperty(event.data.cmd) /* check if function exists */ ){
			//console.log('the function '+event.data.cmd+' exists')
		}else{
			console.log('the function '+event.data.cmd+' is nonexistent')
			return
		}
			
		
		// true
	  	console.log("SW Received Command: " + event.data.cmd);
		//console.log("SW Received Parameter: ");
		//console.log(event.data.cmdparams)
		//console.log(event.ports[0]);
		//console.log(event.ports[0].postMessage);
		
		// do something if it exists
		//event.ports[0].postMessage(event.data.cmd);
		
		
		
		var test = new testThing(event);
		test.run().then(function(d){
			
			
			
			//console.log("test.run().then(!!!!)/")
			event.ports[0].postMessage(d);
			//console.log("/test.run().then(!!!!)")
			
			
		});
		
		//var result = sfw.sw.fn[event.data.cmd](event.data.cmdparams);
		
//		/console.log( result );
		
		//console.log("cjeck");
		//var out = {"test":"test"};
		//
			//"cmd":event.data.cmd,
		//		   	"cmdstatus":"ok",
		//		   	"cmdresult":result,
		// 	"callback":event.data.callback
				//  }
		
		//
	//	if(event.data.callback===undefined){
	//		console.log("event.data.callback=undefined");
	//	}else{
	//		console.log("event.data.callback=defined");
	//	}
		
		
		
		
    	//if( sfw.sw.fn.hasOwnProperty(event.data.all) ){
			//console.log("cjeck");
			// this command has to respond his call to all clients.
			//sfw.sw.send_message_to_all_clients(out)
		//}else{
			//console.log("sw response to client.");
			//console.log(out);
			//console.log(out);
			//console.log(event.ports[0].postMessage(out));
			// this command has to repond to the one caller.
			//event.ports[0].postMessage(out);
		//}
		
		
		
		
		
	}else{
		console.log("SW Received unknown! Command: " + event.data.cmd);
	}
	
	
    
};

sfw.sw.send_message_to_client = function (client, msg){
    // Now if you run send_message_to_sw("Hello").then(m => console.log(m)) in your client console, you should see the message displayed in the Service Worker console and the reply in the client console.
	

	return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
}

sfw.sw.send_message_to_all_clients = function(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            sfw.sw.send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
        })
    })
}


class testThing{
	constructor( Event ) {
		this.command = Event.data.cmd;
		this.params  = Event.data.cmdparams;
		this.callback= Event.data.callback;
		this.ports	 = Event.ports;
	}
	
	test(){
		var promise = new Promise(function(resolve, reject) {
			// do a thing, possibly async, then…
			
			
			
			if (1 /* everything turned out fine */) {
				resolve("Stuff worked!");
			}
			else {
				reject(Error("It broke"));
			}
		});
	}
	
	run(){
		//console.log("in class testThing");
		
		var res = sfw.sw.fn[this.command](this.params);
		//console.log("result van testThing");
		//console.log(res);
		
		
		return new Promise(function(resolve, reject) {
			// do a thing, possibly async, then…
			//console.log("attempting to run: sfw.sw."+this.command);
			//sfw.sw.fn[this.command](this.params);
			//run the funtion!
			////console.log(sfw.sw.fn[this.command](this.params) );
			
			if (1 /* everything turned out fine */) {
				resolve(res);
			}
			else {
				reject(Error(res));
			}
		});
		//return promise;
		
		
		//run the funtion!
		//console.log(sfw.sw.fn[this.command](this.params) );
		
	}
	
}





// http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html
self.addEventListener('message', function(event){
	sfw.sw.messageListener(event)
});

