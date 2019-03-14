<?php


namespace Botnyx\Sfe\Javascript;



class sfelib {
	
	
	function __construct($root,$temp){
		
		
		$filePath = $root."/vendor/botnyx/sfe-backend-js/src";
		$CacheDir = false;//$temp."/sfe-js";
		
		//$cdnHost = $paths['cdn'];
		//$backendHost = $paths['url'];
		//gmdate('D, d M Y H:i:s T', $time)
		
		
		$loader = new \Twig\Loader\FilesystemLoader($filePath);
		$this->twig = new \Twig\Environment($loader, [
			'cache' => $CacheDir
		]);

		
		
	}
	
	function get ($path,$array=array()){
		//die($path);
		return $this->twig->render($path, $array );
	}
	
	
	
	
}

