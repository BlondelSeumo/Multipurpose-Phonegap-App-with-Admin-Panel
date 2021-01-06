<?php

function print_arr($arr)
{
    echo '<pre>';
    print_r($arr);
    echo '</pre>';
}

function delete_data($conn, $table, $index_arr = '', $custom_condition = '')
{
    //DELETE FROM `team` WHERE `team`.`id` = 1"

    $ret = [];
    $condition = '';

    if (is_array($index_arr) && sizeof($index_arr) > 0) {
        foreach ($index_arr as $key => $value) {
            $condition .= $key . " = '" . $value . "' AND ";
        }

        $condition = substr($condition, 0, -4);
        //echo $condition."<br>";
    } else {
        $condition = $custom_condition;
    }

    if (trim($condition) != '') {
        $condition = ' WHERE ' . $condition;

        $query = ' DELETE FROM ' . $table . ' ' . $condition . ' ';
        //echo $check;
        $check_query = $conn->query($query);
        if ($check_query) {
            $ret['delete'] = 'success';
        }
    }

    return $ret;
}

function insert_update_data(
    $conn,
    $table,
    $rows,
    $index_key = '',
    $custom_condition = '',
    $sqltype = ''
) {
    //echo $table;	print_arr($rows);

    $ts = time();
    $return = ['inserted' => [], 'updated' => []];

    foreach ($rows as $row) {
        $query = '';
        foreach ($row as $column => $value) {
            if (trim($column) != '') {
                $query .=
                    ' ' .
                    $column .
                    " = \"" .
                    mysqli_real_escape_string($conn, trim($value)) .
                    "\", ";
            }
        }
        //echo "|||". $query."|||<br>";

        // check if row is present or not based on index columns
        // if present, then update else insert
        $update = false;
        $insert = false;
        $updateID = [];

        $totrows = 0;
        $condition = ''; // based on index key columns
        if ($index_key != '') {
            $keys = explode(',', $index_key);
            foreach ($keys as $key) {
                $operator = '=';
                if (strpos($key, '|') !== false) {
                    $expkey = explode('|', $key);
                    $key = $expkey[0];
                    $operator = $expkey[1];
                }

                if (isset($row[$key])) {
                    //echo $key;
                    if ($row[$key] != '') {
                        $condition .=
                            $key .
                            ' ' .
                            $operator .
                            " '" .
                            $row[$key] .
                            "' AND ";
                    }
                }
            }

            $condition = substr($condition, 0, -4);
        } elseif ($custom_condition != '') {
            $condition = $custom_condition;
        }
        //echo $condition."<br>";

        if (trim($condition) != '') {
            $condition = ' WHERE ' . $condition;

            $check = ' SELECT id FROM ' . $table . ' ' . $condition . ' ';
            //echo $check;
            $check_query = $conn->query($check);
            $totrows = mysqli_num_rows($check_query);
        }
        //echo "total rows: ".$totrows;

        if ($totrows > 0) {
            //echo "update".$totrows;
            $update = true;

            // get id
            while ($check_result = mysqli_fetch_object($check_query)) {
                //echo "<pre>";	print_r($check_result);	echo "</pre>";
                $updateID[] = $check_result->id;
            }
            //print_arr($updateID); echo "<br>";
            //echo "update<hr>";
        } else {
            //echo "insert<hr>";
            $insert = true;
        }

        if ($sqltype == 'updateonly') {
            $insert = false;
        }
        if ($sqltype == 'insertonly') {
            $update = false;
        }

        //echo $updateID;
        if ($update && sizeof($updateID) > 0) {
            //echo "------ update $updateID ---------";
            $query .= " updated = \"" . $ts . "\" ";
            $updateIDstr = implode(',', $updateID);

            $sql = $conn->query(
                ' UPDATE ' .
                    $table .
                    ' SET ' .
                    $query .
                    ' WHERE id IN (' .
                    $updateIDstr .
                    ') '
            );

            //echo " UPDATE ".$table." SET ".$query." WHERE id IN (".$updateIDstr.") ";
            $return['updated'][] = $updateID;
        } elseif ($insert) {
            //echo "------ insert ---------";
            $query .= " updated = \"" . $ts . "\" ";
            //echo $query;
            //echo "INSERT INTO ".$table." SET ".$query." ";
            $sql = $conn->query(
                'INSERT INTO ' . $table . ' SET ' . $query . ' '
            );
            //echo "||".mysqli_insert_id($conn)."||";
            if (mysqli_insert_id($conn) != '0') {
                $return['inserted'][] = mysqli_insert_id($conn);
            }
        }
    }

    return $return;
}

function get_data($conn, $table, $query, $cols, $order = '', $limit = '')
{
    //echo $limit;
    if (is_numeric($query)) {
        $where = "id='" . $query . "'";
        $singlearr = true;
    } else {
        $where = $query;
        $singlearr = false;
    }

    $condition = ' WHERE ' . $where . ' ';

    if (trim($query) == '') {
        $condition = '';
    }

    if (trim($order) != '') {
        $order = ' ORDER BY ' . trim($order) . ' ';
    }

    if (trim($limit) != '') {
        $limit = ' LIMIT ' . trim($limit) . ' ';
    }

    $ret = [];
    $newarr = [];

    if ($cols == 'all') {
        $cols = '*';
    }
    $sql =
        ' SELECT ' .
        $cols .
        ' FROM ' .
        $table .
        ' ' .
        $condition .
        ' ' .
        $order .
        ' ' .
        $limit .
        ' ';
    //echo $sql."<br>";
    //if($showquery){echo $sql."<br>";}

    //if($nonenglish == "true"){
    $querystr = $conn->query('SET NAMES utf8'); //for non english languages
    //}

    $querystr = $conn->query($sql);

    $totrows = 0;
    if ($querystr) {
        $totrows = mysqli_num_rows($querystr);
    }

    if ($totrows > 0) {
        $inc = 0;
        while ($result = mysqli_fetch_object($querystr)) {
            //echo "<pre>";	print_r($result);	echo "</pre>";
            $arr = [];
            foreach ($result as $key => $value) {
                if ($singlearr) {
                    $ret[$key] = $value;
                } else {
                    $ret[$inc][$key] = $value;
                }
            }
            $inc = $inc + 1;
        }
    }
    //$ret["sql"] = $sql;
    return $ret;
}

function insert_data($conn, $table, $rows, $index)
{
    //echo $table;	print_arr($rows);

    $ts = getts();
    $return = [];

    foreach ($rows as $row) {
        $query = '';
        foreach ($row as $column => $value) {
            if (trim($column) != '') {
                $query .= ' ' . $column . " = \"" . $value . "\", ";
            }
        }

        $query .= " created = \"" . $ts . "\" ";
        $sql = $conn->query('INSERT INTO ' . $table . ' SET ' . $query . ' ');
        $return[] = mysqli_insert_id($conn);
    }

    return $return;
}

function get_data_by_id($conn, $table, $id, $col)
{
    $ret = '';
    $query = $id;
    $fetch = get_data($conn, $table, $query, $col, '', '');
    //print_arr($fetch);
    if (sizeof($fetch) > 0) {
        $ret = $fetch[$col];
    }
    return $ret;
}

function delete_item($conn, $POST, $index_key, $table_name)
{
    $ret = [];
    $ret['msg'] = '';
    $ret['success'] = false;
    $ret['trash'] = false;

    //print_r($POST);
    if (isset($POST['module']) && $POST['module'] == 'shooting-match') {
        $checkauth = check_user_authorization(
            $conn,
            $POST,
            'delete-shooting-match'
        );
    } else {
        $checkauth = check_user_authorization($conn, $POST, 'delete');
    }

    if (!$checkauth) {
        $ret['success'] = false;
        $ret['msg'] = 'User Not Authorized';
    }

    if ($checkauth) {
        if (isset($POST['trash']) && $POST['trash'] == 'trash') {
            //echo "trash item";
            $savedata = [];
            $savedata[0][$index_key] = $POST[$index_key];
            $savedata[0]['trash'] = '1';

            $affected_ids = insert_update_data(
                $conn,
                $table_name,
                $savedata,
                $index_key,
                '',
                'updateonly'
            );
            //print_arr($affected_ids);
            if (sizeof($affected_ids['updated']) > 0) {
                $ret['msg'] = 'Data Deleted Successfully';
                $ret['trash'] = true;
                $ret['success'] = true;
            }
        } else {
            $index_arr[$index_key] = $POST[$index_key];
            $action = delete_data($conn, $table_name, $index_arr);
            //print_r($action);
            //echo $action["delete"];

            if ($action['delete'] == 'success') {
                $ret['msg'] = 'Data Deleted Successfully';
                $ret['success'] = true;
            }
        }
    } // end checkauth

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

function assign_data_to_ids($ids, $arr, $format = '')
{
    $ret = '';
    $retarr = [];
    $uexp = array_unique(array_filter(explode(',', $ids)));
    //echo "***".$ids; print_arr($uexp);
    //echo "***";
    foreach ($uexp as $uid) {
        //echo "--|".$uid."|--";
        if (isset($arr[$uid])) {
            //print_arr($arr[$uid]);
            if ($format == 'array') {
                //$retarr[$uid] = $uid; //$arr[$uid];
                $retarr[] = $arr[$uid];
            } else {
                if (is_array($arr[$uid])) {
                    $ret .= $arr[$uid]['name'] . ', ';
                } else {
                    $ret .= $arr[$uid] . ', ';
                }
            }
        }
    }
    if ($ret != '') {
        $ret = substr($ret, 0, -2);
    }

    if ($format == 'array') {
        return $retarr;
    } else {
        return $ret;
    }
}

function get_module_id($conn, $affected_ids, $id)
{
    $module_id = '';

    if (sizeof($affected_ids['updated']) > 0 && $id != '') {
        if ($id == $affected_ids['updated'][0][0]) {
            $module_id = $affected_ids['updated'][0][0];
        }
    } elseif (sizeof($affected_ids['inserted']) > 0 && $id == '') {
        $module_id = $affected_ids['inserted'][0];
    }

    return $module_id;
}

function fetch_and_append($conn, $table_name, $append, $query)
{
    $ret = [];

    //print_r($append);
    $cols = 'id,';
    foreach ($append as $col => $colv) {
        $cols .= $col . ',';
    }
    if ($cols != '') {
        $cols = substr($cols, 0, -1);
    }

    $fetch = get_data($conn, $table_name, $query, $cols, '', '');
    //print_r($fetch);
    $updatedata = [];
    if (sizeof($fetch) > 0) {
        foreach ($fetch as $key => $value) {
            $updatedata[$key]['id'] = $value['id'];
            foreach ($append as $col => $addv) {
                $updatedata[$key][$col] = $value[$col] . $addv;
            }
        }
        //print_r($updatedata);
        if (sizeof($updatedata) > 0) {
            $affected_ids = insert_update_data(
                $conn,
                $table_name,
                $updatedata,
                'id'
            );
            $ret = $affected_ids;
        }
    }

    return $ret;
}

function short_message_string($message, $length = '')
{
    $append = '';
    $ret = strip_tags($message);
    $ret = str_replace("\\n", '', $ret);
    if (strlen($ret) > $length) {
        $append = '...';
    }
    if ($length != '') {
        $ret = substr($ret, 0, $length);
    }
    return $ret . $append;

    //$message1 = '<p style="color:white;background:black;">Hello world <i>wassup</i></p>';
    //$message = preg_replace("/[^a-zA-Z0-9_.-\s]/", "", html_entity_decode($message1));
    //return $message;
    //return html_entity_decode(strip_tags($message));
    //return $message;
}
function format_message_string($message)
{
    $ret = str_replace("\\n", '<p>&nbsp;</p>', $message);
    $ret = stripslashes($ret);
    $ret = str_replace('\\', '', $ret);
    $ret = str_replace(
        '<p>&nbsp;</p><p></p><p>&nbsp;</p>',
        '<p>&nbsp;</p>',
        $ret
    );
    $ret = str_replace('<p>&nbsp;</p><p></p>', '<p>&nbsp;</p>', $ret);
    $ret = str_replace('<p></p><p>&nbsp;</p>', '<p>&nbsp;</p>', $ret);
    $ret = str_replace('<p>&nbsp;</p><p>&nbsp;</p>', '<p>&nbsp;</p>', $ret);
    $ret = str_replace(
        '<p>&nbsp;</p>',
        '<p class="empty-para">&nbsp;</p>',
        $ret
    );
    return $ret;
}

?>