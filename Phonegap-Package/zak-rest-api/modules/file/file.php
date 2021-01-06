<?php

include '../../lib/app.php';

$table_name = 'uploads';
$index_key = 'id';

if ($isUser && $_POST['action'] == 'fetch-all') {
    //print_arr($_POST);

    $limit = '';
    if (isset($_POST['limit'])) {
        $limit = $_POST['limit'];
    }

    $query = '';
    if (isset($_POST['module']) && $_POST['module'] != '') {
        $query .= "module = '" . $_POST['module'] . "'";
    }

    $order = '';
    if (isset($_POST['order'])) {
        $order = $_POST['order'];
    }

    //echo $limit;
    $fetch = [];
    $fetch = get_data($conn, $table_name, $query, 'all', $order, $limit);
    //print_arr($fetch);
    $items = [];
    $attachmentname = [];

    // Fetch Users Data
    if (isset($_POST['display']) && $_POST['display'] == 'username') {
        $users_arr = users_data_as_array($conn, 'users');
        //print_arr($users_arr);
    }

    foreach ($fetch as $key => $value) {
        if (isset($_POST['display']) && $_POST['display'] == 'username') {
            $value['username'] = '';
            if (
                isset($users_arr[$value['auth_user']]) &&
                $value['auth_user'] != '' &&
                $value['auth_user'] != '0'
            ) {
                $value['username'] = $users_arr[$value['auth_user']];
            }
        }
        $value['moduleinfo'] = '' . $value['module'] . '';
        if ($value['module_id'] != '' && $value['module_id'] != '0') {
            $value['moduleinfo'] .= ' (' . $value['module_id'] . ')';
        }

        $items[] = $value;
        $attachmentname[$value['id']] = $value['name'];
        //$items[$value["id"]] = $value;
    }
    $arr['items'] = $items;
    $arr['attachmentname'] = $attachmentname;
    //print_r($arr);
    $jsonstring = json_encode($arr, JSON_PRETTY_PRINT);
    echo $jsonstring;
} elseif ($isUser && $_POST['action'] == 'fetch') {
    $ret = [];
    $ret['success'] = false;

    $fetch = [];
    $fetch = get_data($conn, $table_name, $_POST[$index_key], 'all', '', '');
    //$fetch = get_data($conn,$table_name,"","all","","");
    //print_arr($fetch);
    if (sizeof($fetch) > 0) {
        $ret = $fetch;
        $ret['success'] = true;
    }
    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'save') {
    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';

    //print_r($_POST);
    //print_r($_FILES);
    //die();

    $attachments = '';

    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);
    unset($savedata[0]['name']);
    unset($savedata[0]['old_name']);
    unset($savedata[0]['type']);
    unset($savedata[0]['source']);
    unset($savedata[0]['user_id']);

    //$image = single_file_upload($conn, $_POST, $_FILES, 'name');

    // If Image is compulsory, on empty it cannot be updated
    // if ($image != "") {
    // 	$savedata[0]["name"] = $image;
    // }

    if (isset($_FILES['name'])) {
        if (0 < $_FILES['name']['error']) {
            echo 'Error: ' . $_FILES['name']['error'] . ' ';
        } else {
            $allowed_file = check_allowed_file(
                $_FILES['name']['type'],
                $_FILES['name']['size'],
                $_FILES['name']['tmp_name']
            );
            if ($allowed_file) {
                $randno = rand() . '-';
                $filename = 'uploads/' . $randno . '' . $_FILES['name']['name'];
                $thumbname =
                    'uploads/' . $randno . 'thumb-' . $_FILES['name']['name'];
                $smallname =
                    'uploads/' . $randno . 'small-' . $_FILES['name']['name'];
                $type = $_FILES['name']['type'];
                $tmp_name = $_FILES['name']['tmp_name'];

                $thumb = ImageResize(
                    100,
                    100,
                    '../../' . $thumbname,
                    $tmp_name,
                    $type,
                    false
                );
                if (!$thumb) {
                    $thumbname = '';
                }

                $small = ImageResize(
                    100,
                    100,
                    '../../' . $smallname,
                    $tmp_name,
                    $type,
                    false
                );
                if (!$small) {
                    $smallname = '';
                }

                move_uploaded_file($tmp_name, '../../' . $filename);

                //$filename = "uploads/".rand()."-".$_FILES['name']['name'];
                //move_uploaded_file($_FILES['name']['tmp_name'], $filename);

                $savedata[0]['name'] = $filename;
                $savedata[0]['thumb'] = $thumbname;
                $savedata[0]['small'] = $smallname;
                $savedata[0]['type'] = $type;
                $savedata[0]['size'] = $_FILES['name']['size'];
                $savedata[0]['auth_user'] = $_POST['auth_user'];
                //$savedata[0]["module"] = "file";
            } // end file allowed
        }
    }
    //print_r($savedata);

    // Perform sql operation
    $affected_ids = insert_update_data(
        $conn,
        $table_name,
        $savedata,
        $index_key
    );
    //print_arr($affected_ids);

    if (sizeof($affected_ids['inserted']) > 0) {
        $attachments = implode(',', $affected_ids['inserted']);
        $ret['msg'] = 'Data Added Successfully';
        $ret['success'] = true;
    } elseif (sizeof($affected_ids['updated']) > 0) {
        $attachments = implode(',', $affected_ids['updated'][0]);
        $ret['msg'] = 'Data Updated Successfully';
        $ret['success'] = true;
    }

    // Add new media as album attachment
    if (
        isset($_POST['source']) &&
        $_POST['source'] == 'app' &&
        isset($_POST['type']) &&
        $_POST['type'] == 'albummedia'
    ) {
        if (
            sizeof($affected_ids['inserted']) > 0 &&
            isset($_POST['id']) &&
            $_POST['id'] == ''
        ) {
            // add this file to attachment of album
            $append = [];
            $append['attachment'] = ',' . $affected_ids['inserted'][0] . ',';
            $append_table = 'albums';
            $append_query = "id = '" . $_POST['module_id'] . "'";
            $append_result = fetch_and_append(
                $conn,
                $append_table,
                $append,
                $append_query
            );
            //print_r($append_result);
        }
    } else {
        $module = 'file';
        if (isset($_POST['module']) && $_POST['module'] != '') {
            $module = $_POST['module'];
        }

        manage_upload_module(
            $conn,
            $affected_ids,
            $_POST['id'],
            $attachments,
            $module
        );
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'instant-upload') {
    if (extension_loaded('gd')) {
        //echo "GD Loaded";
    }

    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';

    //print_arr($_POST);
    $checkauth = check_user_authorization(
        $conn,
        $_POST,
        'instant-upload-' . $_POST['uploadfrom']
    );
    if (!$checkauth) {
        //echo "not auth";
        $ret['success'] = false;
        $ret['msg'] = 'User Not Authorized';
    }

    if ($checkauth) {
        //print_r($_POST);
        //print_r($_FILES);

        $savedata = [];
        $savedata[0] = $_POST;
        unset($savedata[0]['action']);
        unset($savedata[0]['auth_type']);

        $fieldid = $_POST['fieldid'];

        if (isset($_POST['multiple']) && $_POST['multiple'] == 'true') {
            $savedata = multi_file_uploader(
                $conn,
                $_FILES,
                $_POST,
                $savedata,
                '',
                $fieldid,
                'true'
            );
        }
        if (sizeof($savedata) > 0) {
            $ret['success'] = true;
        }

        $ret['savedata'] = $savedata;
    } // end checkauth

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
} elseif ($isUser && $_POST['action'] == 'delete') {
    delete_item($conn, $_POST, $index_key, $table_name);
}
die();
?>