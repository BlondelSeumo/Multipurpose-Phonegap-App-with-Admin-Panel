<?php

function events_data_as_array($conn,$type,$format = "",$query = "",$order = ""){

	$ret = array();

	if($type == "events"){
		$arr = get_data($conn,"events",$query,"id,title","","");
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

	if($type == "event_categories"){
		$arr = get_data($conn,"event_categories","","id,name","","");
		foreach ($arr as $key => $value) {
			$ret[$value["id"]] = $value["name"]. "";
		}
	}

	return $ret;

}



?>