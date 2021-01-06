<?php
include("../../lib/app.php");

if($_POST['action'] == "app-guest"){

    $ret = array();

    //print_r($_POST);
	$guest_token = generate_guest_token();
	$ret["guest_token"] = $guest_token;

	//print_r($ret);
	$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
	echo $jsonstring;

}

?>