<?php
include("db.php");

//echo $connvar["serverdatabase"];
/**************** DON'T TOUCH THIS CODE BELOW - IF NOT SURE **************************/
$conn = new mysqli($db["serverhost"],$db["serveruser"],$db["serverpassword"]);
//mysqli_set_charset('utf8',$conn);
//echo "<pre>"; print_r($conn);
if($conn->connect_errno != "0"){
	echo "Database connection failed";
	die();
} else {
	//echo "Database Connection Successful";
}
$conn -> set_charset("utf8");
$conn -> query("SET NAMES UTF8");
$conn -> select_db($db["serverdatabase"]);
//$seldb = mysqli_select_db($connvar["serverdatabase"],$conn);

?>
