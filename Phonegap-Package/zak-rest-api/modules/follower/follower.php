<?php

include("../../lib/app.php");

$table_name = "follower";
$index_key = "id";


if($isUser && $_POST['action'] == "fetch-user"){

	$limit = "";
	$arr = array();
	$arr["post"] = $_POST;
	//print_arr($_POST);
	if(isset($_POST["limit"])){
		$limit = $_POST["limit"];
	}
	//echo $limit;
	$fetch = array();
	$query = "";
	$items = array();

	if(isset($_POST["follower"]) && $_POST["follower"] != ""){
		$query = "follower = ".$_POST["follower"]."";
		$fetch = get_data($conn,$table_name,$query,"all","",$limit);
		//print_arr($fetch);
		foreach ($fetch as $key => $value) {
			$items[] = $value;	
		}
	}

	$arr["items"] = $items;// array("items" => array($items));
	//print_r($arr);
	$jsonstring = json_encode($arr, JSON_PRETTY_PRINT);
	echo $jsonstring;
}


else if($isUser && $_POST['action'] == "toggle"){

	$ret = array();
	$ret["success"] = false;
	$ret["msg"] = "";

	//print_r($_POST);
	$savedata = array();
	$savedata[0] = $_POST;
	unset($savedata[0]["action"]);
	unset($savedata[0]["effect"]);
	unset($savedata[0]["auth_user"]); // not needed while deleting rows

	if($_POST["effect"] == "Follow" || $_POST["effect"] == "follow"){
		// Insert row
		$savedata[0]["timestamp"] = time();
		$savedata[0]["auth_user"] = $_POST["auth_user"];
		$condition = "follower = '".$_POST["follower"]."' AND followed = '".$_POST["followed"]."'";
		$affected_ids = insert_update_data($conn,$table_name,$savedata,"",$condition);

		//print_arr($affected_ids);
		if(sizeof($affected_ids["inserted"]) > 0 || sizeof($affected_ids["updated"]) > 0 ){
			$ret["success"] = true;
		}

	} else if($_POST["effect"] == "Unfollow" || $_POST["effect"] == "unfollow"){
		// Delete row		
		$index_arr = array();
		$index_arr = $savedata[0];
		$action = delete_data($conn,$table_name,$index_arr);
	
		if($action["delete"] == "success"){
			$ret["msg"] = "Data Deleted Successfully";
			$ret["success"] = true;
		}
	}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

else if($isUser && $_POST['action'] == "bulk"){

	$ret = array();
	$ret["success"] = false;
	$msg = "";

	//print_r($_POST);
	$savedata = array();
	$ts = time();
	//unset($savedata[0]["action"]);
	//unset($savedata[0]["effect"]);

	$effect = "";
	$ret["effect"] = $_POST["effect"];
	$imp_ids = "";

	if(isset($_POST["followed"]) && $_POST["followed"] != ""){
		$expids = array_values(array_unique(array_filter(explode(",", $_POST["followed"]))));
		if(sizeof($expids) > 0){
			//print_arr($expids);
			foreach ($expids as $fkey => $followed_id) {
				$savedata[$fkey]["followed"] = $followed_id;
				$savedata[$fkey]["follower"] = $_POST["follower"];
				$savedata[$fkey]["auth_user"] = $_POST["auth_user"];

				if($_POST["effect"] == "follow"){
					$savedata[$fkey]["timestamp"] = $ts;
				}
			}
			// for unfollow condition
			$imp_ids = implode(",", $expids);
		}
	}


	if($_POST["effect"] == "follow"){

		$affected_ids = insert_update_data($conn,$table_name,$savedata,"follower,followed","");

		//print_arr($affected_ids);
		if(sizeof($affected_ids["inserted"]) > 0 || sizeof($affected_ids["updated"]) > 0 ){
			$ret["success"] = true;
			$ret["msg"] = "Followed Successfully";
		}

	}
	else if($_POST["effect"] == "unfollow"){

		$condition = "follower = '".$_POST["follower"]."' AND followed IN (".$imp_ids.") ";
		$action = delete_data($conn,$table_name,"",$condition);
	
		if($action["delete"] == "success"){
			$ret["msg"] = "Unfollowed Successfully";
			$ret["success"] = true;
		}
	}


	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;

}


else if($isUser && $_POST['action'] == "fetch-count"){

	$ret = array();
		
		if(isset($_POST["followers"]) && $_POST["followers"] == "count"){
			$followers = get_follow_connection_ids($conn,$_POST["id"],"followers");
			$ret["followers"] = $followers;
			//print_arr($followers);
		}
		if(isset($_POST["following"]) && $_POST["following"] == "count"){
			$following = get_follow_connection_ids($conn,$_POST["id"],"following");
			$ret["following"] = $following;
			//print_arr($following);
		}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;

}

else if($isUser && $_POST['action'] == "user-connections"){

	$ret = array();
	$ret["success"] = false;
	$ret["msg"] = "";

	//print_r($_POST);
	// Fetch Connections of request user_id

	$impids = "";
	$connections = array();
	$fr_query = "";
	$fr_fetch = array();

	if(isset($_POST["type"]) && $_POST["type"] == "following"){
		$fr_query = "follower = '".$_POST["user_id"]."'";
	}
	else if(isset($_POST["type"]) && $_POST["type"] == "followers"){
		$fr_query = "followed = '".$_POST["user_id"]."'";
	}

	if($fr_query != ""){

		$fr_fetch = get_data($conn,"follower",$fr_query,"all","","");
		if(sizeof($fr_fetch) > 0){
			foreach ($fr_fetch as $key => $value) {
				if($value["follower"] == $_POST["user_id"]){
					$connections[] = $value["followed"];
				} else if($value["followed"] == $_POST["user_id"]){
					$connections[] = $value["follower"];
				}
			}
			if(sizeof($connections) > 0){
				$impids = implode(",", $connections);
			}
		}

	}

	//print_arr($connections);
	//print_arr($fr_fetch);

	if($impids != ""){
			$query = "";
			if($impids != ""){
				$query .= "id IN (".$impids.")";
			}

			if(isset($_POST["active"]) && $_POST["active"] == "1"){
				if($query != "") { $query .= " AND "; }
				$query .= "active = '1'";
			}

			$order = "";
			if(isset($_POST["order"])){
				$order = $_POST["order"];
			}

			$limit = "";
			//print_arr($_POST);
			if(isset($_POST["limit"])){
				$limit = $_POST["limit"];
			}


			//echo $limit;
			$fetch = array();
			$fetch = get_data($conn,"users",$query,"all",$order,$limit);
			//print_arr($fetch);
			$items = array();
			foreach ($fetch as $key => $value) {

				/*-----Attachment info-----*/
				$value["image"] = get_image_info($conn,$value,"image");
				/*----------*/
				$items[] = $value;	
			}

			//print_r($items);
			$ret["items"] = $items;// array("items" => array($items));

	}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;


}
else if($isUser && $_POST['action'] == "usertouser"){

	$ret = array();

	//print_r($_POST);

		$fr_query = "";
		$fr_fetch = array();
		$fr_query = "follower = '".$_POST["user_id"]."' AND followed = '".$_POST["id"]."' ";
		//echo $fr_query;

		$fr_fetch = get_data($conn,"follower",$fr_query,"all","","");
		//print_arr($fr_fetch);
		//$ret["fetch"] = $fr_fetch;
		if(sizeof($fr_fetch) > 0){
			$ret["btn"] = "unfollow";
		} else {
			$ret["btn"] = "follow";
		}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}





die();
?>