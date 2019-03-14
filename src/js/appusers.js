function appusers(){
	
	var db;
	
	// private constructor 
    var __construct = function(dbName) {
       db = new Dexie(dbName);
    }()
   
	this.getAppIdentities = function(){
		db.version(1).stores({
			identities: 'identityId,identityToken'
		});
		db.identities.count( function(count){
			//console.log(count);
		});
		var result = [];
		db.identities.each(drop => result.push(drop));				  
		return result;
	}
	
	this.getIdentity = function(identity){
		db.version(1).stores({
			identities: 'identityId,identityToken'
		});
		db.identities.count( function(count){
			console.log(count);
		});
		var result = [];
		db.identities.each(drop => result.push(drop));				  
		return result;
	}

	
	
	
};


