<?php
//contact-functions.php

function contacts_data_as_array($conn,$type,$format = "",$query = "",$order = ""){

	$ret = array();
	
	if($type == "contacts"){
		$arr = get_data($conn,"contacts","","id,name,image","","");
		foreach ($arr as $key => $value) {
			if($format == "array"){
				$ret[$value["id"]] = array();
				$ret[$value["id"]]["id"] = $value["id"];
				$ret[$value["id"]]["name"] = $value["name"];
				$ret[$value["id"]]["image"] = get_image_info($conn,$value,"image");
			} else {
				$ret[$value["id"]] = $value["name"]. "";
			}
		}
	}
	return $ret;

}

?>