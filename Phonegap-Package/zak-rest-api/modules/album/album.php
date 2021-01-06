<?php

include '../../lib/app.php';

$table_name = 'albums';
$index_key = 'id';

if ($isUser && $_POST['action'] == 'fetch-all') {
    $fetch = [];
    $items = [];
    $fetch_albums = true;
    $ret = [];

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

    // Fetch of albums of logged in user in app
    if (isset($_POST['visibility']) && $_POST['visibility'] == 'myalbums') {
        if (isset($_POST['owner']) && $_POST['owner'] != '') {
            if ($query != '') {
                $query .= ' AND ';
            }
            $query .= "user_id = '" . $_POST['owner'] . "'";
        }
    } elseif (
        isset($_POST['visibility']) &&
        $_POST['visibility'] == 'friends'
    ) {
        // check if app logged in user is friend of album owner
        // if yes, then fetch albums with visibility as friends and public
        $fr_query = '';
        $fr_fetch = [];
        $fr_query =
            "(friendby = '" .
            $_POST['user_id'] .
            "' AND friendto = '" .
            $_POST['owner'] .
            "' AND status='accept') OR (friendby = '" .
            $_POST['owner'] .
            "' AND friendto = '" .
            $_POST['user_id'] .
            "' AND status='accept') ";
        //echo $fr_query;

        $fr_fetch = get_data($conn, 'friend', $fr_query, 'all', '', '');
        //print_arr($fr_fetch);
        if (sizeof($fr_fetch) > 0) {
            // fetch friends and public albums if user is friend of album owner
            if ($query != '') {
                $query .= ' AND ';
            }
            $query .=
                " user_id = '" .
                $_POST['owner'] .
                "' AND (visibility = 'public' OR visibility = 'friends') ";
        } else {
            if ($query != '') {
                $query .= ' AND ';
            }
            $query .=
                " user_id = '" .
                $_POST['owner'] .
                "' AND (visibility = 'public') ";
        }
    }

    //echo $query;
    if ($fetch_albums) {
        //echo $limit;

        // Fetch Users Data
        if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
            $users_arr = users_data_as_array($conn, 'users', 'array');
            //print_arr($users_arr);
        } elseif (isset($_POST['display']) && $_POST['display'] == 'username') {
            $users_arr = users_data_as_array($conn, 'users', 'name');
            //print_arr($users_arr);
        }

        $fetch = get_data($conn, $table_name, $query, 'all', $order, $limit);
        //print_arr($fetch);

        foreach ($fetch as $key => $value) {
            if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
                $value['userinfo'] = assign_data_to_ids(
                    $value['user_id'],
                    $users_arr,
                    'array'
                );
            } elseif (
                isset($_POST['display']) &&
                $_POST['display'] == 'username'
            ) {
                $value['username'] = $users_arr[$value['user_id']];
            }

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

            $items[] = $value;
        }

        $ret['items'] = $items;
    } // end $fetch_albums

    //print_r($ret);
    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'fetch') {
    $ret = [];
    $ret['success'] = false;

    $fetch = [];
    $fetch = get_data($conn, $table_name, $_POST[$index_key], 'all', '', '');
    //$fetch = get_data($conn,$table_name,"","all","","");
    //print_arr($fetch);
    if (sizeof($fetch) > 0) {
        $ret = $fetch;
        $ret['success'] = true;

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
    unset($savedata[0]['attachment']);

    $savedata = multi_file_uploader($conn, $_FILES, $_POST, $savedata);

    // unset old_attachement, as there is no such column
    unset($savedata[0]['old_attachment']);

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

    if (isset($savedata[0]['attachment'])) {
        $module_id = manage_upload_module(
            $conn,
            $affected_ids,
            $_POST['id'],
            $savedata[0]['attachment'],
            'albums'
        );

        $ret['id'] = $module_id;
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