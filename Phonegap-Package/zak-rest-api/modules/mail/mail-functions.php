<?php

function mails_data_as_array($conn,$type,$format = "",$query = "",$order = ""){

	$ret = array();

	if($type == "mails"){
		$arr = get_data($conn,"mails",$query,"id,title","","");
		foreach ($arr as $key => $value) {
			if($format == "array"){
				$ret[$value["id"]] = array();
				$ret[$value["id"]]["id"] = $value["id"];
				$ret[$value["id"]]["title"] = $value["title"];
			} else {
				$ret[$value["id"]] = $value["title"];
			}
		}
	}
	if($type == "mail_categories"){
		$arr = get_data($conn,"mail_categories","","id,name,slug","","");
		foreach ($arr as $key => $value) {
			$ret[$value["id"]]["name"] = $value["name"]. "";
			$ret[$value["id"]]["slug"] = $value["slug"]. "";
		}
	}

	return $ret;

}



?>