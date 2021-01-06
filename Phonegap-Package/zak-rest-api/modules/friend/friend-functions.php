<?php

function get_friend_connection_ids($conn,$id,$type){

	$ret = array();
	$query = "";

	if($type == "friends"){

		$query = "(friendby = '".$id."' OR friendto = '".$id."') AND status='accept' ";
		$fetch = get_data($conn,"friend",$query,"all","","");
		$friends = array();
		if(sizeof($fetch) > 0){
			foreach ($fetch as $key => $value) {
				if($value["friendby"] == $id){
					$friends[$id][] = $value["friendto"];
				} else if($value["friendto"] == $id){
					$friends[$id][] = $value["friendby"];
				}
			}
			$ret = $friends;
		}
	}

	return $ret;
}


?>