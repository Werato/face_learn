<?php

class sorce_loader{
	
	public function load_scripts_href($dir, $not = NULL){
		
		$all_directory = scandir($dir);
		foreach($all_directory as $file){
			if(!in_array($file,array(".",".."))){
				echo "<script src = '".$dir."/".$file."'></script>";
			}
		}

	}
	
	public function load_css_href($dir, $not = NULL){
		
		$all_directory = scandir($dir);
		foreach($all_directory as $file){
			if(!in_array($file,array(".",".."))){
				echo "<link rel='stylesheet' href='".$dir."/".$file."'>";
			}
		}
	}

}
$loader = new sorce_loader;
