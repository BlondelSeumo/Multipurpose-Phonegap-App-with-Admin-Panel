<?php

include '../../lib/app.php';

$table_name = 'portfolios';
$index_key = 'id';

if (($isUser || $isGuest) && $_POST['action'] == 'fetch-all') {
    //print_arr($_POST);

    $limit = '';
    if (isset($_POST['limit'])) {
        $limit = $_POST['limit'];
    }

    $order = '';
    if (isset($_POST['order'])) {
        $order = $_POST['order'];
    }

    $query = '';
    if (isset($_POST['active']) && $_POST['active'] == '1') {
        $query .= "active = '1'";
    }

    // Fetch Users Data
    if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
        $users_arr = users_data_as_array($conn, 'users', 'array');
        //print_arr($users_arr);
    }

    //echo $limit;
    $fetch = [];
    $fetch = get_data($conn, $table_name, $query, 'all', $order, $limit);
    //print_arr($fetch);
    $items = [];

    foreach ($fetch as $key => $value) {
        $attachment = $value['attachment'];
        $cover_image = $value['cover_image'];
        $image_id = '';
        $image = ['name' => 'images/user-bg.jpg'];
        $exp = [];

        if (strlen($attachment) > 0) {
            $exp = array_values(
                array_unique(array_filter(explode(',', $attachment)))
            );
        }
        if (sizeof($exp) > 0) {
            // If cover image is set
            if (
                $cover_image != '' &&
                $cover_image != '0' &&
                in_array($cover_image, $exp)
            ) {
                // check if attachment has this cover image id in it or not
                if (in_array($cover_image, $exp)) {
                    $image_id = $cover_image;
                }
            } else {
                // Get first image of attachment array as cover image
                $image_id = $exp[0];
            }
        }

        if ($image_id != '') {
            $get_image = fetch_data_uploads($conn, $image_id);
            if (sizeof($get_image) > 0) {
                $image = $get_image[0];
            }
        }

        $value['image'] = $image;

        if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
            $value['userinfo'] = assign_data_to_ids(
                $value['user_id'],
                $users_arr,
                'array'
            );
        }

        $items[] = $value;
    }

    $arr['items'] = $items;

    //print_r($arr);
    $jsonstring = json_encode($arr, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif (($isUser || $isGuest) && $_POST['action'] == 'fetch') {
    $ret = [];
    $ret['success'] = false;

    $fetch = [];
    $fetch = get_data($conn, $table_name, $_POST[$index_key], 'all', '', '');
    //$fetch = get_data($conn,$table_name,"","all","","");
    //print_arr($fetch);
    if (sizeof($fetch) > 0) {
        $ret = $fetch;
        $ret['success'] = true;

        $ret['attachment_arr'] = [];
        if (isset($_POST['attachment']) && $_POST['attachment'] == 'array') {
            if (trim($fetch['attachment']) != '') {
                $expattachment = array_values(
                    array_unique(
                        array_filter(explode(',', trim($fetch['attachment'])))
                    )
                );
                //print_arr($expattachment);
                if (sizeof($expattachment) > 0) {
                    $ret['attachment_arr'] = $expattachment;
                }
            }
        }

        $ret['attachment'] = [];
        //$ret["old_attachment"] = "";
        if ($fetch['attachment'] != '') {
            //echo $fetch["attachment"];
            //$ret["old_attachment"] = $fetch["attachment"];
            $ret['attachment'] = fetch_data_uploads(
                $conn,
                $fetch['attachment']
            );
        }
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

    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);
    //unset($savedata[0]["attachment"]);

    $savedata[0]['attachment'] = ',' . $savedata[0]['attachment'] . ',';

    //$savedata = multi_file_uploader($conn,$_FILES,$_POST,$savedata);

    // unset old_attachement, as there is no such column
    //unset($savedata[0]["old_attachment"]);

    //print_arr($savedata);

    // Perform sql operation
    $affected_ids = insert_update_data(
        $conn,
        $table_name,
        $savedata,
        $index_key
    );
    //print_arr($affected_ids);
    if (sizeof($affected_ids['inserted']) > 0) {
        $ret['msg'] = 'Data Added Successfully';
        $ret['success'] = true;
    } elseif (sizeof($affected_ids['updated']) > 0) {
        $ret['msg'] = 'Data Updated Successfully';
        $ret['success'] = true;
    }

    $id = $_POST['id'];
    $module_id = '';

    if (sizeof($affected_ids['updated']) > 0 && $id != '') {
        if ($id == $affected_ids['updated'][0][0]) {
            $module_id = $affected_ids['updated'][0][0];
        }
    } elseif (sizeof($affected_ids['inserted']) > 0 && $id == '') {
        $module_id = $affected_ids['inserted'][0];
    }
    $ret['id'] = $module_id;

    // Manage module details in attachment

    //$module_id = manage_upload_module($conn,$affected_ids,$_POST["id"],$savedata[0]["attachment"],"portfolio");

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'save-media') {
    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';

    //print_r($_POST);

    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);
    unset($savedata[0]['attachment']);

    $savedata = multi_file_uploader(
        $conn,
        $_FILES,
        $_POST,
        $savedata,
        'portfolio'
    );

    if ($savedata[0]['attachment'] != '') {
        $ret['attachment'] = $savedata[0]['attachment'];
        $ret['msg'] = 'Data Added Successfully';
        $ret['success'] = true;
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'save-attachment') {
    //print_r($_POST);

    $ret = [];
    $ret['msg'] = '';
    $ret['success'] = false;
    $ret['cover_image_msg'] = '';

    $savedata = [];

    if (sizeof($_POST['attachment']) > 0) {
        foreach ($_POST['attachment'] as $str) {
            $exp = explode('|#|#|', $str);
            $id = $exp[0];
            $title = $exp[1];
            $brief = $exp[2];
            $savedata[$id]['id'] = $id;
            $savedata[$id]['title'] = $title;
            $savedata[$id]['brief'] = $brief;
        }

        if (sizeof($savedata) > 0) {
            //print_arr($savedata);

            // Perform sql operation
            $affected_ids = insert_update_data(
                $conn,
                'uploads',
                $savedata,
                'id',
                '',
                'updateonly'
            );
            //print_arr($affected_ids);
            if (sizeof($affected_ids['inserted']) > 0) {
                $ret['msg'] = 'Data Added Successfully';
                $ret['success'] = true;
            } elseif (sizeof($affected_ids['updated']) > 0) {
                $ret['msg'] = 'Data Updated Successfully';
                $ret['success'] = true;
            }
        }
    }

    if (isset($_POST['cover_image']) && $_POST['cover_image'] != '') {
        $updatedata = [];
        $updatedata[0]['id'] = $_POST['id'];
        $updatedata[0]['cover_image'] = $_POST['cover_image'];
        $affected_ids = insert_update_data(
            $conn,
            $table_name,
            $updatedata,
            'id',
            '',
            'updateonly'
        );
        if (sizeof($affected_ids['updated']) > 0) {
            $ret['cover_image_msg'] = 'Cover Image Updated Successfully';
        }
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'delete') {
    $index_arr[$index_key] = $_POST[$index_key];
    $action = delete_data($conn, $table_name, $index_arr);
    //print_r($action);
    //echo $action["delete"];

    $ret = [];
    $ret['msg'] = '';
    $ret['success'] = false;

    if ($action['delete'] == 'success') {
        $ret['msg'] = 'Data Deleted Successfully';
        $ret['success'] = true;
    }
    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

die();
?>