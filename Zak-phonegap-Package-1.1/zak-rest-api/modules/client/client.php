<?php

include "../../lib/app.php";

$table_name = "clients";
$index_key = "id";

if (($isUser || $isGuest) && $_POST['action'] == "fetch-all") {
	$limit = "";
	//print_arr($_POST);
	if (isset($_POST["limit"])) {
		$limit = $_POST["limit"];
	}

	//echo $limit;
	$fetch = [];
	$fetch = get_data($conn, $table_name, "", "all", "", $limit);
	//print_arr($fetch);
	$items = [];
	foreach ($fetch as $key => $value) {
		/*-----Attachment info-----*/
		$value["image"] = get_image_info($conn, $value, "image");
		/*----------*/
		$items[] = $value;
	}
	$arr["items"] = $items; // array("items" => array($items));
	//print_r($arr);
	$jsonstring = json_encode($arr, JSON_PRETTY_PRINT);
	echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == "fetch") {
	$ret = [];
	$ret["success"] = false;

	$fetch = [];
	$fetch = get_data($conn, $table_name, $_POST[$index_key], "all", "", "");
	//$fetch = get_data($conn,$table_name,"","all","","");
	//print_arr($fetch);
	if (sizeof($fetch) > 0) {
		$ret = $fetch;
		$ret["success"] = true;

		$ret["image"] = [];
		if ($fetch["image"] != "") {
			//echo $fetch["attachment"];
			$ret["image"] = fetch_data_uploads($conn, $fetch["image"]);
		}
	}
	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
	echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == "save") {
	$ret = [];
	$ret["success"] = false;
	$ret["msg"] = "";

	//print_r($_POST);

	$savedata = [];
	$savedata[0] = $_POST;
	unset($savedata[0]["action"]);
	unset($savedata[0]["image"]);
	unset($savedata[0]["old_image"]);

	$image = single_file_upload($conn, $_POST, $_FILES, "image");

	// If Image is compulsory, on empty it cannot be updated
	if ($image != "") {
		$savedata[0]["image"] = $image;
	}
	//print_arr($savedata);

	// Perform sql operation
	$affected_ids = insert_update_data($conn, $table_name, $savedata, $index_key);
	//print_arr($affected_ids);
	if (sizeof($affected_ids["inserted"]) > 0) {
		$ret["msg"] = "Data Added Successfully";
		$ret["success"] = true;
	} elseif (sizeof($affected_ids["updated"]) > 0) {
		$ret["msg"] = "Data Updated Successfully";
		$ret["success"] = true;
	}

	// Update module it in file uploads table
	manage_upload_module($conn, $affected_ids, $_POST["id"], $image, "client");

	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
	echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == "delete") {
	$index_arr[$index_key] = $_POST[$index_key];
	$action = delete_data($conn, $table_name, $index_arr);
	//print_r($action);
	//echo $action["delete"];

	$ret = [];
	$ret["msg"] = "";
	$ret["success"] = false;

	if ($action["delete"] == "success") {
		$ret["msg"] = "Data Deleted Successfully";
		$ret["success"] = true;
	}
	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
	echo $jsonstring;
}
die();
?>
