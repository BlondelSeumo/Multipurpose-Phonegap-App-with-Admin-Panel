<?php

include("../../lib/app.php");

$table_name = "mail_categories";
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

	foreach ($fetch as $key => $value) {
		$items[] = $value;	
	}
	
	if(isset($_POST["addfield"]) && $_POST["addfield"]= "checked"){
    	foreach ($items as $key => $value) {
        	$items[$key]["checked"] = false;
    	}
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

		//$arr["items"] = $ret;
		//return $ret;
		//print_arr($arr);
		//$jsonstring = json_encode(array_values($ret), JSON_PRETTY_PRINT);
		//$retarr["items"] = $jsonstring;
		//$retarr["success"] = true;
		//print_r($retarr);
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