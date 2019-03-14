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
	
