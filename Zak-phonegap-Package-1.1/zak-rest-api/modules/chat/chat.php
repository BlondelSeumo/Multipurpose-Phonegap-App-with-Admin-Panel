<?php

include '../../lib/app.php';
$table_name = 'chats';
$index_key = 'id';

if ($isUser && $_POST['action'] == 'fetch-all') {
    $limit = '';
    //print_arr($_POST);
    if (isset($_POST['limit'])) {
        $limit = $_POST['limit'];
    }
    //echo $limit;

    $fetch = [];
    $fetch = get_data($conn, $table_name, '', 'all', '', $limit);
    //print_arr($fetch);
    $items = [];

    // Fetch Users Data
    if (isset($_POST['display']) && $_POST['display'] == 'username') {
        $users_arr = users_data_as_array($conn, 'users', 'name');
        //print_arr($users_arr);
    }

    foreach ($fetch as $key => $value) {
        //print_arr($value);
        if (isset($_POST['display']) && $_POST['display'] == 'username') {
            if (isset($users_arr[$value['from_user_id']])) {
                $value['from_user_id'] = $users_arr[$value['from_user_id']];
            }
            if (isset($users_arr[$value['to_user_id']])) {
                $value['to_user_id'] = $users_arr[$value['to_user_id']];
            }
        }
        /*-----Attachment info-----*/
        $value['attachment'] = get_image_info(
            $conn,
            $value,
            'attachment',
            'empty'
        );
        /*----------*/

        if (isset($_POST['time'])) {
            $disptime = displayTime($value['timestamp'], $_POST['time']);
            $value['disptime'] = $disptime['info'];
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
elseif ($isUser && $_POST['action'] == 'fetch-chat') {
    //print_arr($_POST);
    $ret = fetch_chat($conn, $_POST);

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'fetch-users') {
    $ret = [];
    $ret['success'] = false;
    $ret['items'] = [];
    $ret['post'] = $_POST;

    $unread_count = [];
    $user_with_msg = [];
    $user_no_msg = [];
    $items = [];

    $user_query = '';
    $allow_fetch = true;

    if (isset($_POST['user_id']) && $_POST['user_id'] != '') {
        if (isset($_POST['load']) && $_POST['load'] == 'friends') {
            $allow_fetch = false;

            $friends = get_friend_connection_ids(
                $conn,
                $_POST['user_id'],
                'friends'
            );
            $ret['friends'] = $friends;
            //print_arr($friends);
            if (sizeof($friends) > 0) {
                $user_id = $_POST['user_id'];
                if (
                    isset($friends[$user_id]) &&
                    sizeof($friends[$user_id]) > 0
                ) {
                    $impids = implode(',', $friends[$user_id]);
                    $user_query = 'id IN (' . $impids . ')';

                    $allow_fetch = true;
                }
            } else {
                $allow_fetch = false;
            }
        }

        if ($allow_fetch) {
            $users_arr = users_data_as_array(
                $conn,
                'users',
                'array',
                $user_query,
                'name ASC'
            );
            //print_arr($users_arr);

            // Query 0 for mark_read = 0 messages
            $order0 = 'timestamp ASC';
            $limit0 = '';

            // Query 1 for mark_read = 1 messages
            $order1 = 'timestamp DESC';
            $limit1 = ' 0,1 ';
            $msg_str = '';

            foreach ($users_arr as $uid => $user) {
                $query =
                    " ((from_user_id = '" .
                    $_POST['user_id'] .
                    "' AND to_user_id = '" .
                    $uid .
                    "') OR (from_user_id = '" .
                    $uid .
                    "' AND to_user_id = '" .
                    $_POST['user_id'] .
                    "')) ";

                // First look for mark_read = 0 messages
                $query0 = $query . " AND mark_read='0'";

                $fetch0 = [];
                $fetch0 = get_data(
                    $conn,
                    'chats',
                    $query0,
                    'all',
                    $order0,
                    $limit0
                );
                $unread_count[$uid] = 0; //sizeof($fetch0);
                if (sizeof($fetch0) > 0) {
                    // count messages from $uid to logged in user_id as unread
                    foreach ($fetch0 as $key => $row) {
                        if ($row['from_user_id'] == $uid) {
                            $unread_count[$uid]++;
                        }
                    }

                    $user_with_msg[$uid] = get_message_str($conn, $fetch0);
                }
                //print_arr($fetch0);

                // If not unread message found
                // Fetch last mark_read=1 message.

                $fetch1 = [];
                if (sizeof($fetch0) == 0) {
                    $query1 = $query . " AND mark_read='1'";

                    $fetch1 = get_data(
                        $conn,
                        'chats',
                        $query1,
                        'all',
                        $order1,
                        $limit1
                    );
                    //print_arr($fetch1);
                    if (sizeof($fetch1) > 0) {
                        $user_with_msg[$uid] = get_message_str($conn, $fetch1);
                    }
                }

                if (sizeof($fetch0) == 0 && sizeof($fetch1) == 0) {
                    $user_no_msg[$uid]['msg'] = '';
                    $user_no_msg[$uid]['ts'] = '';
                }
            }

            //print_arr($unread_count);
            //print_arr($user_with_msg);

            $inc = 0;
            // If user messages are found, then generate return array
            foreach ($user_with_msg as $uid => $msg) {
                $items[$inc] = $users_arr[$uid];
                $items[$inc]['message'] = $msg;
                $items[$inc]['unread'] = $unread_count[$uid];
                $inc++;
            }

            foreach ($user_no_msg as $uid => $msg) {
                $items[$inc] = $users_arr[$uid];
                $items[$inc]['message'] = $msg;
                $items[$inc]['unread'] = '0'; //$unread_count[$uid];
                $inc++;
            }
        } // end if allow_fetch

        $ret['items'] = $items;
    }

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
        if ($fetch['attachment'] != '') {
            //echo $fetch["attachment"];
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
    //print_r($_FILES);
    //die();
    //echo "|||".json_decode($_POST["attachment"])."|||";

    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);
    unset($savedata[0]['attachment']);
    unset($savedata[0]['old_attachment']);
    unset($savedata[0]['source']);
    unset($savedata[0]['last_message']);
    unset($savedata[0]['last_message_ts']);
    unset($savedata[0]['unread_ids']);
    unset($savedata[0]['time']);

    // timestamp is only added on insertion and not updation
    if ($savedata[0]['id'] == '') {
        $savedata[0]['timestamp'] = time();
    }

    $attachment = single_file_upload($conn, $_POST, $_FILES, 'attachment');
    //echo $attachment;
    // If attachment is not compulsory, on empty it will be updated too
    $savedata[0]['attachment'] = $attachment;

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

    // Update module it in file uploads table
    manage_upload_module(
        $conn,
        $affected_ids,
        $_POST['id'],
        $attachment,
        'chat'
    );

    // Fetch messages to display after last message id
    if (isset($_POST['source']) && $_POST['source'] == 'app') {
        $getchat = [];
        $getchat['user_id'] = $_POST['from_user_id'];
        $getchat['id'] = $_POST['to_user_id'];
        $getchat['source'] = $_POST['source'];
        $getchat['action'] = 'fetch-chat';
        $getchat['last_message'] = $_POST['last_message'];
        $getchat['last_message_ts'] = $_POST['last_message_ts'];
        $getchat['unread_ids'] = $_POST['unread_ids'];
        $getchat['time'] = $_POST['time'];

        $ret = fetch_chat($conn, $getchat);
        //print_arr($ret);
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
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'bulk') {
    $ret = [];
    $ret['success'] = false;

    //print_r($_POST);

    $msg = '';
    if ($_POST['type'] == 'star') {
        $type = 'star';
        $value['star'] = '1';
        $msg = 'Starred Successfully';
    } elseif ($_POST['type'] == 'unstar') {
        $type = 'star';
        $value['star'] = '0';
        $msg = 'Unstarred Successfully';
    }

    $imp_ids = '';
    if (isset($_POST['ids']) && $_POST['ids'] != '') {
        $expids = array_values(
            array_unique(array_filter(explode(',', $_POST['ids'])))
        );
        if (sizeof($expids) > 0) {
            //print_arr($expids);
            $imp_ids = implode(',', $expids);
        }
    }

    $POST = [];
    $POST['action'] = $type;
    $POST['index'] = $_POST['index'];
    $POST['id'] = $imp_ids;
    $POST[$type] = $value[$type];
    $POST['user_id'] = $_POST['user_id'];
    $POST['multiple'] = $_POST['index'];

    //print_r($POST);

    if (isset($POST['index'])) {
        $feature = update_feature($conn, $POST, 'chats');
        $ret['success'] = true;
        $ret['msg'] = $msg;
        $ret['feature'] = $feature;
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

function fetch_chat($conn, $POST)
{
    //print_r($POST);
    $ret = [];
    $ret['success'] = false;

    $limit = '';
    if (isset($POST['limit'])) {
        $limit = $POST['limit'];
    }

    $query = '';
    if (
        isset($POST['user_id']) &&
        $POST['user_id'] != '' &&
        isset($POST['id']) &&
        $POST['id'] != ''
    ) {
        $query .=
            " (from_user_id = '" .
            $POST['user_id'] .
            "' AND to_user_id = '" .
            $POST['id'] .
            "') OR (from_user_id = '" .
            $POST['id'] .
            "' AND to_user_id = '" .
            $POST['user_id'] .
            "')";

        if (isset($POST['last_message']) && $POST['last_message'] != '') {
            if ($query != '') {
                $query =
                    '(' .
                    $query .
                    ") AND id > '" .
                    $POST['last_message'] .
                    "' ";
            }
        }
    }

    $order = 'timestamp ASC';

    //echo $limit;
    $fetch = [];
    $fetch = get_data($conn, 'chats', $query, 'all', $order, $limit);
    //print_arr($fetch);
    $items = [];

    if (sizeof($fetch) > 0) {
        // Fetch user details
        $user_query = 'id IN (' . $POST['user_id'] . ',' . $POST['id'] . ')';
        $users_arr = users_data_as_array($conn, 'users', 'array', $user_query);
        //print_arr($users_arr);
        $ret['success'] = true;

        $ids = '';
        $grpdt = '';
        foreach ($fetch as $key => $value) {
            if (isset($POST['time'])) {
                $value['disptime'] = displayTime(
                    $value['timestamp'],
                    $POST['time']
                );
            }
            if (isset($value['disptime'])) {
                $newgrpdt = $value['disptime']['tsdate'];
                if ($grpdt != $newgrpdt) {
                    // insert date element
                    $daterow = $value['disptime'];
                    $daterow['rowtype'] = 'date';
                    $items[] = $daterow;
                    $grpdt = $newgrpdt;
                }
            }

            $value['rowtype'] = 'message';
            $value['disptime'] = displayTime(
                $value['timestamp'],
                $POST['time']
            );
            $value['from_user'] = $users_arr[$value['from_user_id']];
            $value['to_user'] = $users_arr[$value['to_user_id']];
            if ($value['attachment'] != '') {
                $value['attachment'] = get_image_info(
                    $conn,
                    $value,
                    'attachment'
                );
            }

            if ($value['type'] == 'reply' && $value['type_id'] != '') {
                $value['reply'] = get_chat_message(
                    $conn,
                    $users_arr,
                    $value['type_id']
                );
            }

            $items[] = $value;
            $ids .= $value['id'] . ',';
        }

        $ret['items'] = $items;

        // Update ids as mark_read = 1
        if ($ids != '') {
            $ids = substr($ids, 0, -1);
        }

        // Update mark_read=1 only if logged in user_id is equal to to_user_id
        // update only mark_read=0 ids
        $update_data = [];
        $update_data[0]['mark_read'] = '1';
        $condition =
            'id IN (' .
            $ids .
            ") AND to_user_id = '" .
            $POST['user_id'] .
            "' AND mark_read='0' ";
        $affected_ids = insert_update_data(
            $conn,
            'chats',
            $update_data,
            '',
            $condition,
            'updateonly'
        );
        $ret['mark_read'] = $affected_ids;
    }

    $ret['unread_ids'] = [];
    if (isset($POST['unread_ids']) && $POST['unread_ids'] != '') {
        //$ret["unread_ids"] = $POST["unread_ids"];

        $exp = array_values(
            array_unique(array_filter(explode(',', $POST['unread_ids'])))
        );
        if (sizeof($exp) > 0) {
            $impids = implode(',', $exp);
            $query = 'id IN (' . $impids . ')';
            $fetch = get_data($conn, 'chats', $query, 'id,mark_read', '', '');
            $ret['unread_ids'] = $fetch;
        }

        //$ret["unread_ids"] = $exp;
    }

    return $ret;
}

function get_chat_message($conn, $users_arr, $id)
{
    $ret = [];
    $ret['userinfo'] = [];
    $ret['fetch'] = [];
    $query = "id = '" . $id . "'";
    $fetch = get_data($conn, 'chats', $query, 'all', '', '');
    if (sizeof($fetch) > 0) {
        $ret = $fetch[0];
        $user_id = $fetch[0]['from_user_id'];
        if (isset($users_arr[$user_id])) {
            $ret['userinfo'] = $users_arr[$user_id];
        }
    }

    return $ret;
}

function get_message_str($conn, $fetch)
{
    $ret = [];
    $ts = '';
    $msg_str = '';
    $msg_str = $fetch[0]['message'];
    $ts = $fetch[0]['timestamp'];
    if ($msg_str == '' && $fetch[0]['attachment'] != '') {
        $attachinfo = get_image_info(
            $conn,
            ['attachment' => $fetch[0]['attachment']],
            'attachment'
        );
        $msg_str = $attachinfo['type'];
    }

    $ret['msg'] = $msg_str;
    $ret['ts'] = $ts;
    if (isset($_POST['time'])) {
        $ret['disptime'] = displayTime($ts, $_POST['time']);
    }

    return $ret;
}

die();
?>