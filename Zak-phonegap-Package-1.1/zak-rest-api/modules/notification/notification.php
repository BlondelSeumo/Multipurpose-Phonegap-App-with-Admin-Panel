<?php

include("../../lib/app.php");

$table_name = "notifications";
$index_key = "id";

if($isUser && $_POST['action'] == "fetch-count"){
	
	$ret = array();
	$ret["success"] = false;

	$query = "";
	if(isset($_POST["user_id"]) && $_POST["user_id"] != ""){
		$query .= "user_id = '".$_POST["user_id"]."' AND status ='' ";
	}

	$fetch = array();
	$fetch = get_data($conn,$table_name,$query,"count(1)","","");
	//print_r($fetch);
	if(sizeof($fetch) > 0){
		$ret["success"] = true;
		$ret["count"] = $fetch[0]["count(1)"];
	}
	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
	echo $jsonstring;

}

if($isUser && $_POST['action'] == "fetch-all"){

	$arr = array();
	//print_arr($_POST);

	$checkauth = check_user_authorization($conn,$_POST,"fetch-notification");

	if(!$checkauth){
		$arr["success"] = false;
		$arr["msg"] = "User Not Authorized";
	}

	if($checkauth){


		//echo $limit;
		$limit = "";
		if(isset($_POST["limit"])){
			$limit = $_POST["limit"];
		}

		$query = "";
		if(isset($_POST["user_id"]) && $_POST["user_id"] != ""){
			$query .= "user_id = '".$_POST["user_id"]."'";
		}
		//echo $query;

		$order = "timestamp DESC";
		
		$fetch = array();
		$fetch = get_data($conn,$table_name,$query,"all",$order,$limit);
		//print_arr($fetch);

		$mark_read = array();
		$items = array();
		$getvalues = array();
		foreach ($fetch as $key => $value) {

			$value["vars"] = array();
			if($value["message"] != ""){
				preg_match_all("/\[([^\]]*)\]/", $value["message"], $matches);
				//var_dump($matches[1]);
				$vars = $matches[1];
				$value["vars"] = $vars;
				foreach ($vars as $varid) {
					$exp = explode(":", $varid);
					$module = $exp[0];
					$moduleid = $exp[1];
					$getvalues[$module][] = $moduleid;
				}
			}

			if($value["status"] == ""){
				$mark_read[] = $value["id"];
			}

			if(isset($_POST["time"])){
				$value["disptime"] = displayTime($value["timestamp"],$_POST["time"],"datetime");
			}

			$items[] = $value;	

		}

		//print_r($getvalues);
		$var_values = array();
		if(sizeof($getvalues) > 0){
			foreach ($getvalues as $key => $value) {

				$ids = array_values(array_unique(array_filter($value)));
				$idsstr = implode(",", $ids);
				$varquery = "id IN (".$idsstr.")";

				if($key == "user"){ 
					$var_values[$key] = users_data_as_array($conn,"users","array",$varquery);
				} else if($key == "mail"){ 
					$var_values[$key] = mails_data_as_array($conn,"mails","array",$varquery);
				} else if($key == "album"){ 
					$var_values[$key] = albums_data_as_array($conn,"albums","array",$varquery);
				} else if($key == "event"){ 
					$var_values[$key] = events_data_as_array($conn,"events","array",$varquery);
				} else if($key == "task_assign"){ 
					$var_values[$key] = task_assign_data_as_array($conn,"task_assign","array",$varquery);
				}
			}
		}

		//print_r($var_values);

		foreach ($items as $key => $value) {
			if(sizeof($value["vars"]) > 0){
				//echo "repalce";
				$newmsg = $value["message"];
				foreach ($value["vars"] as $var) {
					$exp = explode(":", $var);
					$module = $exp[0];
					$moduleid = $exp[1];
					//echo $module.$moduleid;
					if(isset($var_values[$module][$moduleid])){
						//echo "isset";
						$search = "[".$module.":".$moduleid."]";

						if($module == 'user'){
							$items[$key]["userinfo"] = $var_values[$module][$moduleid];
							$replace = "<a href='ui-app-profile.html?id=".$moduleid."'>".$var_values[$module][$moduleid]["name"]."</a>";
						}
						else if($module == 'album'){
							$replace = "<a href='ui-app-album-view.html?id=".$moduleid."'>".$var_values[$module][$moduleid]["name"]."</a>";
						}
						else if($module == 'event'){
							$replace = "<a href='ui-app-events.html?id=".$moduleid."'>".$var_values[$module][$moduleid]["title"]."</a>";
						}
						else if($module == 'mail'){
							$replace = "<a href='ui-app-mail-view.html?id=".$moduleid."&thread=".$moduleid."'>".$var_values[$module][$moduleid]["title"]."</a>";
						}else if($module == 'task_assign'){
							$taskname = $var_values[$module][$moduleid]["task"];
							$ta_task_id = $var_values[$module][$moduleid]["task_id"];
							$ta_user_id = $var_values[$module][$moduleid]["user_id"];
							$ta_from_date = $var_values[$module][$moduleid]["from_date"];
							$ta_to_date = $var_values[$module][$moduleid]["to_date"];
							$ta_from_date = displayTime($ta_from_date,$_POST["time"]);
							$ta_to_date = displayTime($ta_to_date,$_POST["time"]);

							$dtinfo = $ta_from_date["date"];
							if($ta_from_date["date"] != $ta_to_date["date"]){
								$dtinfo .= ' - '.$ta_to_date["date"];
							}
							if($dtinfo != ""){
								$dtinfo = " (".$dtinfo.")";
							}
							$replace = "<a href='ui-app-user-task.html?id=".$ta_user_id."&task_assign_id=".$moduleid."&type=range&from=".$ta_from_date["dmy"]."&to=".$ta_to_date["dmy"]."'>".$taskname.$dtinfo."</a>";
						}

						$newmsg = str_replace($search, $replace, $newmsg);
						//echo $newmsg;
											
					} // end if isset

				} // end foreach

				$items[$key]["message"] = $newmsg;
			}
		}

		//print_r($items);

		// Update status as read for unread and fetched notifications
		if(sizeof($mark_read) > 0){
			$impids = implode(",", $mark_read);
			$read_query = " id in (".$impids.")";
			$updatedata = array();
			$updatedata[0]["status"] = "read";
			insert_update_data($conn,$table_name,$updatedata,"",$read_query,"updateonly");
		}

		$arr["items"] = $items;// array("items" => array($items));

	} // end check auth

	//print_r($arr);
	$jsonstring = json_encode($arr, JSON_PRETTY_PRINT);
	echo $jsonstring;
}


else if($isUser && $_POST['action'] == "fetch"){
	$ret = array();
	$ret["success"] = false;

	$fetch = array();
	$fetch = get_data($conn,$table_name,$_POST[$index_key],"all","","");
	//$fetch = get_data($conn,$table_name,"","all","","");
	//print_arr($fetch);
	if(sizeof($fetch) > 0){
		$ret = $fetch;
		$ret["success"] = true;
			/*
			$ret["image"] = array();
			if($fetch["image"] != ""){
				//echo $fetch["attachment"];
				$ret["image"] = fetch_data_uploads($conn,$fetch["image"]);
			}*/

	}
	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

else if($isUser && $_POST['action'] == "save"){
	
	$ret = array();
	$ret["success"] = false;
	$ret["msg"] = "";

	//print_r($_POST);
	//die();
	$savedata = array();
	$ts = time();
	if(isset($_POST["notify"]) && $_POST["notify"] == "friends"){

		$friends = get_friend_connection_ids($conn,$_POST["auth_user"],"friends");
		//print_arr($friends);
		if(sizeof($friends) > 0 && isset($friends[$_POST["auth_user"]])){
			foreach ($friends[$_POST["auth_user"]] as $key => $value) {
				$savedata[$value] = $_POST;
				unset($savedata[$value]["action"]);
				unset($savedata[$value]["notify"]);
				$savedata[$value]["user_id"] = $value;
				$savedata[$value]["timestamp"] = $ts;
			}
		}

		//print_r($savedata);

	} 
	else if(isset($_POST["notify"]) && $_POST["notify"] == "multiple"){

			//echo "explode ids string";
			  $expids = array_values(array_unique(array_filter(explode(",", trim($_POST["ids"])))));
			  //print_arr($expids);
			  if(sizeof($expids) > 0){

			  	foreach ($expids as $k => $user_id) {
			  		$savedata[$k] = $_POST;
			  		$savedata[$k]["user_id"] = $user_id;
			  		$savedata[$k]["timestamp"] = $ts;
					unset($savedata[$k]["action"]);
					unset($savedata[$k]["notify"]);
					unset($savedata[$k]["ids"]);
			  	}
			  }

	}
	else if(isset($_POST["notify"]) && $_POST["notify"] != ""){

		if(isset($_POST["user_id"])){
			$savedata[0] = $_POST;
			unset($savedata[0]["action"]);
			unset($savedata[0]["notify"]);

			if(!isset($savedata[0]["timestamp"])){
				$savedata[0]["timestamp"] = $ts;
			}
		}

	}
	//print_r($savedata);

	if(sizeof($savedata) == 0){
		$ret["success"] = false;
		$ret["msg"] = "No user found to send notification";
	
	} else {

		// Perform sql operation
		$affected_ids = insert_update_data($conn,$table_name,$savedata,$index_key);

		//print_arr($affected_ids);
		if(sizeof($affected_ids["inserted"]) > 0){
			$ret["success"] = true;
			$ret["msg"] = "Notification sent successfully";
		} else if(sizeof($affected_ids["updated"]) > 0){
			$ret["success"] = true;
			$ret["msg"] = "Notification sent successfully";
		}

	}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;

}
else if($isUser && $_POST['action'] == "delete"){

	delete_item($conn,$_POST,$index_key,$table_name);

}
die();
?>