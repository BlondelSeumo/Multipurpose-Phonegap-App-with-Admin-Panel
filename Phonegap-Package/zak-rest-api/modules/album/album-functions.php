<?php
//

function albums_data_as_array($conn, $type, $format = "", $query = "", $order = "")
{
	$ret = [];

	if ($type == "albums") {
		$arr = get_data($conn, "albums", $query, "id,name", "", "");
		foreach ($arr as $key => $value) {
			if ($format == "array") {
				$ret[$value["id"]] = [];
				$ret[$value["id"]]["id"] = $value["id"];
				$ret[$value["id"]]["name"] = $value["name"];
			} else {
				$ret[$value["id"]] = $value["name"];
			}
		}
	}

	return $ret;
}

?>