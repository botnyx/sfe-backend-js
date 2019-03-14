<?php


namespace Botnyx\Sfe\Javascript;



class sfelib {
	
	
	function __construct($root,$tmp=false){
		
		$root;
		if( $tmp==false){
			$tmp = sys_get_temp_dir();
		}
		
		
		
		$loader = new \Twig\Loader\FilesystemLoader($root."/vendor/botnyx/sfe-backend-js/src/sfe/");
		$this->twig = new \Twig\Environment($loader, [
			'cache' => $tmp.'/sfe-js',
		]);

		
		
	}
	
	function get ($array=array()){
		return $this->twig->render('sfe.js', $array );
	}
	
	
}

