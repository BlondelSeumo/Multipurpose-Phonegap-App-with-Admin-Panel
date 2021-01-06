<?php

include("../../lib/app.php");

$table_name = "comments";
$index_key = "id";


if($isUser && $_POST['action'] == "fetch-all"){

	$limit = "";
	//print_arr($_POST);
	if(isset($_POST["limit"])){
		$limit = $_POST["limit"];
	}
	//echo $limit;
	$fetch = array();
	$fetch = get_data($conn,$table_name,"","all","",$limit);
	//print_arr($fetch);
	$items = array();

	// Fetch Users Data
	if(isset($_POST["user"]) && $_POST["user"] == "userimage"){
		$users_arr = users_data_as_array($conn,"users");
		//print_arr($users_arr);
	}


	foreach ($fetch as $key => $value) {
		//print_arr($value);

		if(isset($_POST["user"]) && $_POST["user"] == "userimage"){
			$value["user_id"] = assign_data_to_ids($value["user_id"],$users_arr);
		}

		$items[] = $value;	
	}
	$arr["items"] = $items;
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

	}
	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

else if($isUser && $_POST['action'] == "save"){

	$ret = array();
	$ret["success"] = false;
	$ret["msg"] = "";

	//print_r($_POST);

	$savedata = array();
	$savedata[0] = $_POST;
	unset($savedata[0]["action"]);
	//unset($savedata[0]["attachment"]);

	// timestamp is only added on insertion and not updation
	if($savedata[0]["id"] == ""){
		$savedata[0]["timestamp"] = time();
	}
	
	//print_arr($savedata);

	// Perform sql operation
	$affected_ids = insert_update_data($conn,$table_name,$savedata,$index_key);
	//print_arr($affected_ids);
	if(sizeof($affected_ids["inserted"]) > 0){
		$ret["msg"] = "Data Added Successfully";
		$ret["success"] = true;
	} else if(sizeof($affected_ids["updated"]) > 0){
		$ret["msg"] = "Data Updated Successfully";
		$ret["success"] = true;
	}

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;

}
else if($isUser && $_POST['action'] == "delete"){

	$index_arr[$index_key] = $_POST[$index_key];
	$action = delete_data($conn,$table_name,$index_arr);
	//print_r($action);
	//echo $action["delete"];

	$ret = array();
	$ret["msg"] = "";
	$ret["success"] = false;

	if($action["delete"] == "success"){
		$ret["msg"] = "Data Deleted Successfully";
		$ret["success"] = true;
	}
	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
die();
?>