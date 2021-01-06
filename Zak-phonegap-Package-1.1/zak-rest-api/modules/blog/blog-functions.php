<?php

function blog_data_as_array(
  $conn,
  $type,
  $format = "",
  $query = "",
  $order = ""
) {
  $ret = [];

  if ($type == "blog_categories") {
    $arr = get_data($conn, "blog_categories", "", "id,name", "", "");
    foreach ($arr as $key => $value) {
      $ret[$value["id"]] = $value["name"] . "";
    }
  }
  //
  return $ret;
}

?>