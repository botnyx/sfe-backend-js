

/* Location HashHelper */
class fe_utils_locationhash{
	constructor(debug=false,defaultpage='#c/home') {
		this.debug = debug;
		this.defaultpage= defaultpage;
	}
	
	get(){
		if(window.location.hash) {
			return window.location.hash;
		}else{
			return false;		
		}
	}
	
	pageLoad(callBack){
		/* Callback check */
		if (typeof callBack != 'function'){
			console.log("Missing Callback!");
			return false;
		}
		if(window.location.hash) {
			// Fragment exists
			var t={};
			t.href = window.location.hash;
			callBack(t);
			//pageClickHandler(t);		
		}else{
			var t={};
			t.href = this.defaultpage;
			callBack(t);
			//pageClickHandler(t);		
		}
	}
}	
//lochash = new fe_utils_locationhash(true,'#c/home');
//console.log(lochash.get());
//lochash.pageLoad(function(t){
//	console.log(t);
//});
