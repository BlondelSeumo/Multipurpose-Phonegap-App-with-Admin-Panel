<?php

include("../../lib/app.php");

$table_name = "friend";
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

	// Fetch friend by of selected user. Where friend request is sent by the user
	$friendby = array();
	if(isset($_POST["friendby"]) && $_POST["friendby"] != ""){
		$query = "friendby = ".$_POST["friendby"]."";
		$fetch = get_data($conn,$table_name,$query,"all","",$limit);
		//print_arr($fetch);
		foreach ($fetch as $key => $value) {
			$friendby[] = $value;	
		}
	}

	// Fetch friend to of selected user. Where friend request is sent to the user
	$friendto = array();
	if(isset($_POST["friendto"]) && $_POST["friendto"] != ""){
		$query = "friendto = ".$_POST["friendto"]."";
		$fetch = get_data($conn,$table_name,$query,"all","",$limit);
		//print_arr($fetch);
		foreach ($fetch as $key => $value) {
			$friendto[] = $value;	
		}
	}

	$arr["friendby"] = $friendby;
	$arr["friendto"] = $friendto;
	//print_r($arr);
	$jsonstring = json_encode($arr, JSON_PRETTY_PRINT);
	echo $jsonstring;
}
else if($isUser && $_POST['action'] == "usertouser"){

	$ret = array();

	//print_r($_POST);

		$fr_query = "";
		$fr_fetch = array();
		$fr_query = "(friendby = '".$_POST["user_id"]."' AND friendto = '".$_POST["id"]."' ) OR (friendby = '".$_POST["id"]."' AND friendto = '".$_POST["user_id"]."' ) ";
		//echo $fr_query;

		$fr_fetch = get_data($conn,"friend",$fr_query,"all","","");
		//print_arr($fr_fetch);
		//$ret["fetch"] = $fr_fetch;
		if(sizeof($fr_fetch) > 0){
			$status = $fr_fetch[0]["status"];
			$friendto = $fr_fetch[0]["friendto"];
			$friendby = $fr_fetch[0]["friendby"];
			$ret["status"] = $status;
			if($status == "accept"){
				$ret["btn"] = "delete_friend";
			} else if($status == "pending"){
				if($friendby == $_POST["user_id"]){
					$ret["btn"] = "delete_friend_request";
				} else {
					$ret["btn"] = "accept_friend_request";
					$ret["btn2"] = "reject_friend_request";
				}
			}
		} else {
			$ret["btn"] = "send_friend_request";
		}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
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

   if($_POST["effect"] == "send_friend_request" || $_POST["effect"] == "accept_friend_request"){
		// Insert row
		$savedata[0]["timestamp"] = time();
		$savedata[0]["auth_user"] = $_POST["auth_user"];
		$condition = "friendby = '".$_POST["friendby"]."' AND friendto = '".$_POST["friendto"]."'";
		$affected_ids = insert_update_data($conn,$table_name,$savedata,"",$condition);

		//print_arr($affected_ids);
		if(sizeof($affected_ids["inserted"]) > 0 || sizeof($affected_ids["updated"]) > 0 ){
			$ret["success"] = true;
		}

	} else if($_POST["effect"] == "delete_friend_request"){
		// Delete row
		$index_arr = array();
		$index_arr = $savedata[0];
		$action = delete_data($conn,$table_name,$index_arr);
	
		if($action["delete"] == "success"){
			$ret["msg"] = "Friend Request Deleted Successfully";
			$ret["success"] = true;
		}
	} else if($_POST["effect"] == "reject_friend_request"){
		// Delete row
		$index_arr = array();
		$index_arr = $savedata[0];
		$action = delete_data($conn,$table_name,$index_arr);
	
		if($action["delete"] == "success"){
			$ret["msg"] = "Friend Request Rejected Successfully";
			$ret["success"] = true;
		}
	} else if($_POST["effect"] == "delete_friend"){
		// Delete row
		$condition = "(friendby = '".$_POST["friend1"]."' AND friendto = '".$_POST["friend2"]."' AND status='accept') OR (friendby = '".$_POST["friend2"]."' AND friendto = '".$_POST["friend1"]."' AND status='accept')";
		$action = delete_data($conn,$table_name,"",$condition);
	
		if($action["delete"] == "success"){
			$ret["msg"] = "Friend Deleted Successfully";
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
	$users = array();
	$fetchusers = array();

	// Fetch all active users (except current user).
	$query = "active = '1' AND id != '".$_POST["user_id"]."' ";
	if($_POST["user_id"] != ""){
		$fetchusers = get_data($conn,"users",$query,"id,username","","");
	}
	//print_arr($fetchusers);

	$connections = get_user_connections($_POST);
	//print_arr($connections);

	$status = "";

	if($_POST["effect"] == "send_all_friend_request"){

		$status = "pending";
		// Create savedata array
		if(sizeof($fetchusers) > 0){
			foreach ($fetchusers as $key=>$user) {
				if(!in_connections($user["id"],$connections[$_POST["user_id"]])){
					$savedata[$key]["friendby"] = $_POST["user_id"];
					$savedata[$key]["friendto"] = $user["id"];
					$savedata[$key]["timestamp"] = $ts;
					$savedata[$key]["status"] = $status;
					$savedata[$key]["auth_user"] = $_POST["auth_user"];
				} else {
					//echo "Present: ".$user["id"]." ";
				}
			}
			//print_arr($savedata);
		}

		$affected_ids = insert_update_data($conn,$table_name,$savedata,"friendby,friendto","","insertonly");

		//print_arr($affected_ids);
		if(sizeof($affected_ids["inserted"]) > 0){
			$ret["success"] = true;
		}

	}
	else if($_POST["effect"] == "delete_all_friend_request"){
		$status = "pending";
		$condition = "friendby = '".$_POST["user_id"]."' AND status = '".$status."' ";
		$action = delete_data($conn,$table_name,"",$condition);
	
		if($action["delete"] == "success"){
			$ret["success"] = true;
		}
	}
	else if($_POST["effect"] == "accept_all_friend_request"){

		$savedata[0]["status"] = "accept";
		$savedata[0]["auth_user"] = $_POST["auth_user"];

		$condition = "friendto = '".$_POST["user_id"]."' AND status = 'pending' ";
		$affected_ids = insert_update_data($conn,$table_name,$savedata,"",$condition,"updateonly");

		//print_arr($affected_ids);
		// If no request is present then affected updated id count will be 0
		$ret["success"] = true;

		//if(sizeof($affected_ids["updated"]) > 0){
			//$ret["success"] = true;
		//}
	}
	else if($_POST["effect"] == "reject_all_friend_request"){

		$condition = "friendto = '".$_POST["user_id"]."' AND status = 'pending' ";
		$action = delete_data($conn,$table_name,"",$condition);
	
		if($action["delete"] == "success"){
			$ret["success"] = true;
		}
	}
	else if($_POST["effect"] == "delete_all_friend"){

		// Delete all friend rows
		$condition = "( (friendby = '".$_POST["user_id"]."' OR friendto = '".$_POST["user_id"]."') AND status='accept')";
		$action = delete_data($conn,$table_name,"",$condition);
	
		if($action["delete"] == "success"){
			$ret["success"] = true;
		}


	}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;

}

else if($isUser && $_POST['action'] == "fetch-count"){

	$ret = array();

		if(isset($_POST["friends"]) && $_POST["friends"] == "count"){
			$friends = get_friend_connection_ids($conn,$_POST["id"],"friends");
			$ret["friends"] = $friends;
			//print_arr($friends);
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

	if(isset($_POST["type"]) && $_POST["type"] == "friends"){
		$fr_query = "(friendby = '".$_POST["user_id"]."' OR friendto = '".$_POST["user_id"]."') AND status='accept' ";
	}
	else if(isset($_POST["type"]) && $_POST["type"] == "requests"){
		$fr_query = "friendto = '".$_POST["user_id"]."' AND status='pending' ";
	}
	else if(isset($_POST["type"]) && $_POST["type"] == "sent-requests"){
		$fr_query = "friendby = '".$_POST["user_id"]."' AND status='pending' ";
	}

	if($fr_query != ""){

		$fr_fetch = get_data($conn,"friend",$fr_query,"all","","");
		if(sizeof($fr_fetch) > 0){
			foreach ($fr_fetch as $key => $value) {
				if($value["friendby"] == $_POST["user_id"]){
					$connections[] = $value["friendto"];
				} else if($value["friendto"] == $_POST["user_id"]){
					$connections[] = $value["friendby"];
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

function get_user_connections($arr){
	$ret = array();
	$ret[$arr["user_id"]]["friendby"] = array();
	$ret[$arr["user_id"]]["friendto"] = array();

	$ret[$arr["user_id"]]["friendby"] = get_status_id_array($arr,"friendby");
	$ret[$arr["user_id"]]["friendto"] = get_status_id_array($arr,"friendto");

	return $ret;		
}

function get_status_id_array($arr,$type){
	$ret = array();
	$ret["pending"] = array();
	$ret["accept"] = array();

	if(isset($arr["user_".$type]) && $arr["user_".$type] != ""){
		$exparr = explode(",", $arr["user_".$type]);
		foreach ($exparr as $key => $value) {
			$expstr = explode("-", $value);
			$id = $expstr[0];
			$status = $expstr[1];
			$ret[$status][] = $id;
		}
	}

	return $ret;
}

function in_connections($id,$connections){
	//print_arr($connections);
	$ret = false;
	if(isset($connections["friendby"]["pending"])){
		if(in_array($id, $connections["friendby"]["pending"])){
			$ret = true;
		}
	}
	if(isset($connections["friendby"]["accept"])){
		if(in_array($id, $connections["friendby"]["accept"])){
			$ret = true;
		}
	}
	if(isset($connections["friendto"]["pending"])){
		if(in_array($id, $connections["friendto"]["pending"])){
			$ret = true;
		}
	}
	if(isset($connections["friendto"]["accept"])){
		if(in_array($id, $connections["friendto"]["accept"])){
			$ret = true;
		}
	}
	//echo $id."-".$ret."|";

	return $ret;	
}



die();
?>