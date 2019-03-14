	
/* Frontend click helper */
class fe_click_helper{
	constructor(debug=false) {
		this.debug = debug;
		
	}
	
	
	scriptClickHandler(item){
		// This is a SCRIPT TRIGGER!
		items = item.split("-");
		// the script Class
		theClass = window[items[0]]; // script-class

		// the Script function name.
		theFunction = items[1]; // script-class-function




		if (typeof theClass !== "undefined") { 
			if (typeof theClass[theFunction] === "function") { 
				// call the function, and pass the $(this) from the clicked element.
				console.log("Script Trigger!  window."+items[0]+"."+items[1]+"()");
				theClass[theFunction].call(deze);
			}else{
				console.log("Not a valid function");
			}

		}else{
			console.log("Not a valid function  (window."+items[0]+")");
		}



		//console.log("item0 "+items[0]);
		//console.log("item1 "+items[1]);

		//window[ theClass[theFunction] ].call()

		//window[item[0][item[1]]];
		//item.call();
		//eval("func_"+function_name+"()");
	}
	
	
	/*
		Test the Href, and decode.
		
		function: 
			test('#m/home/information#myanchor');
		
		result:
			{url: "home/information", div: "#m", anchor: ""}
	
	*/	
	test(href){

		var url;
		var div;
		var htmlAnchor = ''

		var defaultUrl='home';
		var defaultDiv='#m';
		if( href=="#"){
			return false;  
		}
		if( href.lastIndexOf("#/")==0){
			return {'url':defaultUrl,'div': defaultDiv ,'anchor':htmlAnchor}   
		}
		if(href=='' || href=="/" || href=="#"){
			return {'url':defaultUrl,'div': defaultDiv ,'anchor':htmlAnchor}   
		}

		if(href!='#'){

			var urlParts = href.split("/");
			div  = urlParts[0];
			// Matches '#' or any 'single' char.
			if( urlParts.length==1){
				url = defaultUrl;
				return false; //{'url':url,'div':defaultDiv,'anchor':div}
			}
			// matches a ScriptTrigger.
			if(div=='#t'){
				
				
				let theFunc = urlParts[1].split('-');
				console.log(theFunc[0]+"('"+theFunc[1]+"')");
				//if(typeof(theFunc[0])=='function'){
					eval( theFunc[0] );
					return false;
					
				//}else{
				//	console.log("Are you calling a non-existent function?");
				///}
				
				
				return false;
			}
			// remove first element.
			urlParts.shift();

			var url = urlParts.join("/");

			urlParts = url.split("#");

			url = urlParts[0];

			if(urlParts.length>1){
				htmlAnchor = '#'+urlParts[1];
				urlParts.shift();
			}
			
			//sfe.getSettings()['backendUrl']
			
			if((div==='http:') ^ (div==='https:')){
				url = div+'/'+url;
				div = 'external';
			}else{
				switch(div) {
				case '#c':
					div='.sfe-content-screen';
					break;
				case '#p':
					div='#sf-nav-profile';
					break;
				case '#n':
					div='#sf-nav-main';
					break;
				case '#m':
					div='#sf-nav-main';
					//result.div='#sf-nav-msgs';
					break;
				case '#i':
					div='#sf-nav-notify';
					break;
				case '#l':
					div='#sf-nav-language';
					break;
				case '#d':
					div='#sf-nav-debuglog';
					break;
				case '#s':
					div='#sf-nav-status';

				case '#t':
					// Script helper!
					return false;
					break;
				default:
					div='.sfe-content-screen';	
			}
			//sfe.getSettings()['backendUrl']+'/'+
			//else{
			//	url = url;
			//}
			
		}
			
			
			
			
			
			
			
			
			
			
			return {'url':url,'div': div ,'anchor':htmlAnchor} 


		}
		return false;
	}	

	
	loadElementHandler (href) {
		var urlTester = new fe_click_helper(this.debug);
		
	}
	
	pageClickHandler(  href ){
		//console.log("pageClickHandler");
		//console.log(sfe.vars.assets);
		//href = $(deze).attr("href");
		//new fe_click_helper(this.debug).test("https://www.nu.nl");
		let helper = new fe_click_helper(this.debug);
		
		let result = helper.test(href);
		if(result==false){
			return;
		}
		if(typeof(result.url)==='undefined'){
			return;
		}
		
		//console.log( result );
/* 
			
		load
		#n  nav- main
		#p  nav- profile
		#t  nav- tasks
		#m  nav- msgs
		#i  nav- notify
		#l  nav- language
		
		#d  content- debuglog
		#s  content- status
		
		click
		#c  content- screen
		
		*/
		//var helper = new fe_click_helper(this.debug);
		/* div class-mapping to linktype */
		switch(result.div) {
			case '#c':
				result.div='.sfe-content-screen';
				break;
			case '#p':
				result.div='#sf-nav-profile';
				break;
			case '#n':
				result.div='#sf-nav-main';
				break;
			case '#m':
				result.div='#sf-nav-main';
				//result.div='#sf-nav-msgs';
				break;
			case '#i':
				result.div='#sf-nav-notify';
				break;
			case '#l':
				result.div='#sf-nav-language';
				break;
			case '#d':
				result.div='#sf-nav-debuglog';
				break;
			case '#s':
				result.div='#sf-nav-status';
				
			case '#t':
				// Script helper!
				
				helper.scriptClickHandler(item);
				return;
				break;
			default:
				result.div='.sfe-content-screen';
		}
		
		/* set the callback */
		//result.callback=sfe.ui(result.div).update();
		

		console.log('pageClickHandler '+href);
		
		/* load the content in the div.*/
		if(typeof(result.url)!=='undefined'){
			
			//console.log(sfe.vars.assets);
			//console.log(result);
			//console.log(sfe.vars.assets.css);
			
			return result;
			//let loader = new fe_content_loader(this.debug);
			//helper.testLoad(result.url,result.div);	

			//loadContentinDiv(div,item,false);
		}
		return false;
		
		
	//	result.url;
	//	result.div;
	//	result.anchor;
		
		//if(result.div=='#t'){
		//	let scripthelper = new fe_click_helper(this.debug);
		//	scripthelper.scriptClickHandler(item);
		//}else {
		//	console.log('div='+result.div);
		//	console.log('item='+result.url);
			
			

			// check if the link is a main-content item

		//}	
		
		//console.log(href);
		/* 
			strip the hash & smoke it :) 
		
		href ='';
		href ='/';
		href ='#m';
		href ='#m/home';
		href ='#m/home#aboutus';
		
		var urlParts = href.split("#");
		var htmlAnchor = urlParts[1];
		
		var dta = urlParts[0].split("/"); 
		
		var div  = dta[0]; // Target: Div(m) or ScriptTrigger(t)
		
		// remove first element.
		dta.shift();
		
		url = dta.join("/");
		console.log('url='+url);
		console.log('div='+div);
		console.log('htmlanchor='+htmlAnchor);
		
		
		href = href.substring(1);
		var dta = href.split("/");	
		
		csv = ids.join(",");
		console.log(dta);
		
		*/
		//href = href.substring(1);
		//var dta = href.split(":");
		
		/*
			if the array 'dta' has 2 or less elements, we'll ignore this click.
		*/
		//if(dta.length<2){
		//	if(this.debug) console.log('href is wrong format?  (href: //#'+href+')');
		//	return;
		//}
		
		/*
			if the array 'dta' has 3 or more elements, we'll treat this as a valid link,
			lets see what kind of link it is....
		*/
		//var div  = dta[0]; // Target: Div(m) or ScriptTrigger(t)
		//var item = dta[1]; // the raw 'command'

		
		//if(unsavedChanges2()==false){
		//	console.log("there are usaved changes???  ABORT LOAD!");
		//	return;
		//}
		
		
		/*
			A link is consists of 2 parts.
				
				#<target>:<command>
			
			The Target defines if the link is a script-trigger,
			or the destination html-element where the content should be loaded in.
			
			The command contains extra metadata for the link.
						
			
			Targets:
				t = Script Trigger.
				m = Main Content Area
				ph-main-menu = Main Menu Area
			
			Link Possibilities.
				
				#t:person.fullname.call();
				This link is a Script Trigger Example, and call the javascript function 'person.fullname.call()'
				Example :  #t:alert('this is a script trigger!')	
				
				#m:admin-users
				This link is a normal link, which loads the 'screen' screen/admin/users.html template, into div#m
			
			
		*/

		// #t:person.fullname.call();
		// check if the link is a script trigger
		// or its just content that needs to be loaded in a div.
			

		//console.log("usaved? "+ unsavedChanges2());
		//if( unsavedChanges2()==false ){}else{}
	}

	
	
}	
//xyz = new fe_click_helper(true);
//xyz.pageClickHandler(  '#m:admin-users' );
// 


