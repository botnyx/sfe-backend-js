
var sfe = {}
sfe.vars={}
sfe.vars.config={}
sfe.vars.headers={}

{{ include("url/url.js") }}


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

