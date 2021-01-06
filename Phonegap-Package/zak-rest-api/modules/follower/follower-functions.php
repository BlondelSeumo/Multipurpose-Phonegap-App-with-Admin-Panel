<?php


function get_follow_connection_ids($conn,$id,$type){

	$ret = array();
	$query = "";

	if($type == "followers"){
		$query = "followed = '".$id."'";
	} else if($type == "following"){
		$query = "follower = '".$id."'";
	}
	if($query != ""){
		$connections = array();
		$fetch = get_data($conn,"follower",$query,"all","","");
		if(sizeof($fetch) > 0){
			foreach ($fetch as $key => $value) {
				if($value["follower"] == $id){
					$connections[$id][] = $value["followed"];
				} else if($value["followed"] == $id){
					$connections[$id][] = $value["follower"];
				}
			}
			$ret = $connections;
		}
	}

	return $ret;
}


?>