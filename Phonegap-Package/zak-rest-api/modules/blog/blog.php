<?php

include '../../lib/app.php';

$table_name = 'blogs';
$index_key = 'id';

if (($isUser || $isGuest) && $_POST['action'] == 'fetch-all') {
    $query = '';
    if (isset($_POST['status']) && $_POST['status'] == 'publish') {
        $query .= "status = 'publish'";
    }

    if (isset($_POST['blog_category']) && $_POST['blog_category'] != '') {
        if ($query != '') {
            $query .= ' AND ';
        }
        $query .= "blog_category = '" . $_POST['blog_category'] . "'";
    }

    $order = '';
    if (isset($_POST['order'])) {
        $order = $_POST['order'];
    }

    $limit = '';

    //print_arr($_POST);
    if (isset($_POST['limit'])) {
        $limit = $_POST['limit'];
    }
    //echo $limit;

    $fetch = [];
    $fetch = get_data($conn, $table_name, $query, 'all', $order, $limit);
    //print_arr($fetch);
    $items = [];

    // Fetch Users Data
    if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
        $users_arr = users_data_as_array($conn, 'users', 'array');
        //print_arr($users_arr);
    }

    // Fetch Users Data
    if (isset($_POST['category']) && $_POST['category'] == 'name') {
        $blog_categories_arr = blog_data_as_array($conn, 'blog_categories');
        //print_arr($blog_categories_arr);
    }

    foreach ($fetch as $key => $value) {
        //print_arr($value);

        if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
            $value['userinfo'] = assign_data_to_ids(
                $value['user_id'],
                $users_arr,
                'array'
            );
        }
        if (isset($_POST['category']) && $_POST['category'] == 'name') {
            $value['blog_category'] = assign_data_to_ids(
                $value['blog_category'],
                $blog_categories_arr
            );
        }
        if (isset($_POST['time'])) {
            $value['blog_disptime'] = displayTime(
                $value['blog_date'],
                $_POST['time']
            );
        }

        /*-----Attachment info-----*/
        $value['image'] = get_image_info($conn, $value);
        /*----------*/

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
elseif ($isUser && $_POST['action'] == 'fetch') {
    $ret = [];
    $ret['success'] = false;

    //print_r($_POST);

    // Fetch Users Data
    if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
        $users_arr = users_data_as_array($conn, 'users', 'array');
        //print_arr($users_arr);
    }

    // Fetch category Data
    if (isset($_POST['category']) && $_POST['category'] == 'name') {
        $blog_categories_arr = blog_data_as_array($conn, 'blog_categories');
        //print_arr($blog_categories_arr);
    }

    // Fetch category Data
    $blog_comments = [];

    $fetch = [];
    $fetch = get_data($conn, $table_name, $_POST[$index_key], 'all', '', '');
    //$fetch = get_data($conn,$table_name,"","all","","");
    //print_arr($fetch);
    if (sizeof($fetch) > 0) {
        $ret = $fetch;
        $ret['success'] = true;

        if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
            $ret['userinfo'] = assign_data_to_ids(
                $fetch['user_id'],
                $users_arr
            );
        }
        if (isset($_POST['category']) && $_POST['category'] == 'name') {
            $ret['blog_category'] = assign_data_to_ids(
                $fetch['blog_category'],
                $blog_categories_arr
            );
        }

        if (isset($_POST['load']) && $_POST['load'] == 'comments') {
            $comment_query =
                " module = 'blog:" . $_POST['id'] . "' AND status='publish' ";

            $blog_comments = get_data(
                $conn,
                'comments',
                $comment_query,
                'all',
                'timestamp DESC',
                ''
            );

            foreach ($blog_comments as $ckey => $comment) {
                $blog_comments[$ckey]['userinfo'] = [
                    'name' => '',
                    'username' => '',
                    'image' => 'images/user-bg.jpg',
                ];

                if ($comment['user_id'] != '' && $comment['user_id'] != '0') {
                    $blog_comments[$ckey]['userinfo'] =
                        $users_arr[$comment['user_id']];
                }
            }
        }

        $ret['comments'] = $blog_comments;

        /*-----Attachment info-----*/
        //$ret["image"] = get_image_info($conn,$fetch);
        /*----------*/

        $ret['attachment'] = [];
        if ($fetch['attachment'] != '') {
            //echo $fetch["attachment"];
            $ret['attachment'] = fetch_data_uploads(
                $conn,
                $fetch['attachment']
            );
        }

        if (isset($_POST['time'])) {
            if (isset($_POST['source']) && $_POST['source'] == 'app') {
                $ret['blog_date'] = timestamp_to_dmy(
                    $fetch['blog_date'],
                    $_POST['time']
                );
                $ret['blog_time'] = timestamp_to_time(
                    $fetch['blog_date'],
                    $_POST['time']
                );
                $ret['blog_disptime'] = displayTime(
                    $fetch['blog_date'],
                    $_POST['time']
                );
            } else {
                $ret['blog_date'] = timestamp_to_datestring(
                    $fetch['blog_date'],
                    $_POST['time']
                );
            }
        }

        $ret['description'] = format_message_string($fetch['description']);
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

    $_POST['title'] = mysqli_real_escape_string($conn, $_POST['title']);
    $_POST['description'] = mysqli_real_escape_string(
        $conn,
        $_POST['description']
    );

    if (
        isset($_POST['source']) &&
        $_POST['source'] == 'app' &&
        isset($_POST['time'])
    ) {
        $_POST['blog_date'] = concat_to_timestamp(
            $_POST['blog_date'],
            $_POST['blog_time'],
            $_POST['time']
        );
    } else {
        if (isset($_POST['blog_date'])) {
            $_POST['blog_date'] = datestring_to_timestamp($_POST['blog_date']);
        }
    }

    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);
    unset($savedata[0]['attachment']);
    unset($savedata[0]['old_attachment']);

    // timestamp is only added on insertion and not updation
    if ($savedata[0]['id'] == '') {
        $savedata[0]['timestamp'] = time();
    }

    $attachments = single_file_upload($conn, $_POST, $_FILES, 'attachment');

    // If attachment is compulsory, on empty it will not be updated
    if ($attachments != '') {
        $savedata[0]['attachment'] = $attachments;
    }
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

    manage_upload_module(
        $conn,
        $affected_ids,
        $_POST['id'],
        $attachments,
        'blogs'
    );

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'delete') {
    delete_item($conn, $_POST, $index_key, $table_name);
}
die();
?>