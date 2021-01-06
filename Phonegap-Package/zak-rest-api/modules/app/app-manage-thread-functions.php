<?php

function update_thread_counts($conn,$arr,$type){

	//print_arr($arr);
	//die();
	$ret = array();
	if(isset($arr["thread_id"])){

		//echo "thread_id: ".$arr['thread_id']."<br/>";

		$fetch = array();
		$cols = "id,".$type.",thread_".$type.",parent_id,thread_id";
		//$likestr = "|".$arr["user_id"].":1|";
		$query = "thread_id = '".$arr['thread_id']."' ";

		if(isset($arr["multiple"]) && $arr["multiple"] == "thread_id"){
			$query = "thread_id IN (".$arr["thread_id"].") ";
		}
		//echo $query;
		//echo $cols;

		$fetch = get_data($conn,"mails",$query,$cols,"","");
		//print_arr($fetch);

		$count = array();
		if(sizeof($fetch) > 0){
			foreach ($fetch as $key => $value) {
				$str = trim($value[$type]);
				$thread_id = $value["thread_id"];
				if($str != ""){

					$exp = array_values(array_unique(array_filter(explode("|", $str))));
					if(sizeof($exp) > 0){
						foreach ($exp as $ek => $ev) {
							$exp_value = explode(":", $ev);
							$action_user = $exp_value[0];
							$action_value = $exp_value[1];
							if(!isset($count[$thread_id][$action_user])){
								$count[$thread_id][$action_user] = 0;
							}
							$count[$thread_id][$action_user] = $count[$thread_id][$action_user] + $action_value;
						}
					}
				}
			} // end $fetch loop
		} // end sizeof fetch > 0
		
		// Generate thread string based on count fetched
		//print_arr($count);
		
		$updatedata = array();
		$count_str = array();
		if(sizeof($count) > 0){
			foreach ($count as $thread_id => $countarr) {
				$count_str[$thread_id] = "";
				foreach ($countarr as $userid => $value) {
					$count_str[$thread_id] .= "|".$userid.":".$value."|";
				}

				$updatedata[$thread_id]["thread_".$type] = $count_str[$thread_id];
				$updatedata[$thread_id]["id"] = $thread_id;

			}
		}
		//echo $count_str;
		//print_arr($updatedata);

		$ret = insert_update_data($conn,"mails",$updatedata,"id","","updateonly");
		//print_arr($ret);
	}

	return $ret;

}

function update_feature($conn,$POST,$table_name = "mails"){

	//print_arr($POST);
	//$POST["star"] = "0";
	$ret = array();
	$fetch = array();
	$index = $POST["index"]; // id
	$action = $POST["action"]; // star

	$query = "".$index." = '".$POST[$index]."'";

	if(isset($POST["multiple"]) && $POST["multiple"] == $index){
		$query = "".$index." IN (".$POST[$index].") ";
	}
	//echo $query;

	if(isset($POST["fromhere"]) && $POST["fromhere"] == 'timestamp'){
		$query = "thread_id = '".$POST["thread_id"]."' && timestamp >= '".$POST["timestamp"]."' ";
	}
	//echo $query;
	$cols = "id,".$index.",".$action."";
	if($action != "mail_category" && $table_name == "mails"){
		$cols .= ",thread_".$action."";
	}
	//echo $cols;
	$fetch = get_data($conn,$table_name,$query,$cols,"","");
	//print_arr($fetch);

	$save = array();
	if(sizeof($fetch) > 0){

		foreach ($fetch as $key => $value) {
			$str = trim($value[$action]);
			$id = $value["id"];
			if(strpos($str, "|".$POST["user_id"].":") === false){ 
				//echo "blank";
				$str .= "|".$POST["user_id"].":".$POST[$action]."|";
				$ret["user-".$POST["user_id"]."-".$action."-".$POST[$action]][] = $id;
			} else {
				//echo "not blank";
				$newstr = "";
				$exp = array_values(array_unique(array_filter(explode("|", $str))));
				if(sizeof($exp) > 0){
					//print_arr($exp);
					foreach ($exp as $ek => $ev) {
						$exp_value = explode(":", $ev);
						$action_user = $exp_value[0];
						$action_value = $exp_value[1];
						if($action_user == $POST["user_id"]){
							//echo "same user";
							//$exp[$ek] = "|".$POST["user_id"].":".$POST[$action]."|"; 
							$newstr .= "|".$POST["user_id"].":".$POST[$action]."|";
							$ret["user-".$POST["user_id"]."-".$action."-".$POST[$action]][] = $id;
						} else {
							//echo "diff user";
							//$exp[$ek] = "|".$action_user.":".$action_value."|"; 
							$newstr .= "|".$action_user.":".$action_value."|";
							//$ret[$action."-".$action_value][] = $id;
						}

					}
					/*foreach($exp as $ev){
						$newstr .= "".$ev."";
					}*/

					$str = $newstr;
				}

			}

			$save[$id][$action] = $str;
			$save[$id]["id"] = $id;

		}
		//print_arr($save);
		$affected_ids = insert_update_data($conn,$table_name,$save,"id","","updateonly");
		$ret["affected_ids"] = $affected_ids;
		//print_arr($update);
	}

	return $ret;


	//die();

}


?>