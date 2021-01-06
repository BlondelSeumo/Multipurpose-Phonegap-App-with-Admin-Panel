<?php

include '../../lib/app.php';

$table_name = 'mails';
$index_key = 'id';

if ($isUser && $_POST['action'] == 'fetch-all') {
    $queryarr = [];
    $query = '';
    $limit = '';
    $trashquery = '';
    $starquery = '';
    $draftquery = '';
    $unreadquery = '';
    //print_arr($_POST);

    // Set limit
    $lstart = '0';
    $lcount = '10';
    if (
        isset($_POST['pagecount']) &&
        is_numeric($_POST['pagecount']) &&
        $_POST['pagecount'] > 0
    ) {
        $lcount = $_POST['pagecount'];
    }
    if (
        isset($_POST['currpage']) &&
        is_numeric($_POST['currpage']) &&
        $_POST['currpage'] > 0
    ) {
        $lstart = ($_POST['currpage'] - 1) * $lcount;
    }
    $limit = '' . $lstart . ', ' . $lcount . '';

    //echo "|||".$limit."|||";

    // Fetch Mail Category Data
    $mail_cat_arr = mails_data_as_array($conn, 'mail_categories', 'array');
    //print_arr($mail_cat_arr);
    $inbox_category = '';
    if (isset($_POST['cat'])) {
        foreach ($mail_cat_arr as $ckey => $carr) {
            if (trim($_POST['cat']) == trim($carr['slug'])) {
                $inbox_category = $ckey;
            }
        }
    }

    // Mail category Query
    if ($inbox_category != '') {
        $query .=
            ' mail_category LIKE "%cat-' .
            $_POST['user_id'] .
            '-' .
            $inbox_category .
            ',%" ';
    }
    //echo $query;

    // Starred Only
    // star page will have only non trashed and starred mails.
    if (isset($_POST['type']) && $_POST['type'] == 'star') {
        //if($query != ""){ $starquery .= " AND "; }
        $queryarr[] = " star LIKE '%|" . $_POST['user_id'] . ":1|%' ";
    }
    // Unread Mails
    // unread page will have non trashed and unread.
    elseif (isset($_POST['type']) && $_POST['type'] == 'unread') {
        //if($query != ""){ $unreadquery .= " AND "; }
        $queryarr[] = " mark_read NOT LIKE '%|" . $_POST['user_id'] . ":1|%' ";
    }

    // Trashed Only
    if (isset($_POST['type']) && $_POST['type'] == 'trash') {
        //if($query != ""){ $trashquery .= " AND "; }
        //$query .= "thread_trash > 0";
        $trashquery = " trash LIKE '%|" . $_POST['user_id'] . ":1|%' ";
        $queryarr[] = $trashquery;
    }
    // For Inbox and Sent (non trashed)
    else {
        //if($query != ""){ $query .= " AND "; }
        $trashquery = " trash NOT LIKE '%|" . $_POST['user_id'] . ":1|%' ";
        $queryarr[] = $trashquery;
    }

    // Drafts and Send
    if (isset($_POST['type']) && $_POST['type'] == 'draft') {
        //if($query != ""){ $draftquery .= " AND "; }
        $queryarr[] = " status = 'draft' ";
    } else {
        $queryarr[] = " status = 'send' ";
    }

    $impquery = '';
    if (sizeof($queryarr) > 0) {
        $impquery = implode(' AND ', $queryarr);
        if ($query != '') {
            $impquery = ' AND ' . $impquery;
        }
    }

    /*
	// Check if user_id is present (fetch mails regarding that user only)
	// fetch thread_id with where to_user_id = user_id
	// for Inbox display threads in inbox that have incoming message
	// for Sent display threads outgoing threads only
	//  Rest for all cases like star, search, trash, category - fetch both type of threads (incoming and outgoing)
	*/
    $user_mails_found = false;

    if (isset($_POST['user_id']) && $_POST['user_id'] != '') {
        $user_query = $query . $impquery;

        if ($user_query != '') {
            $user_query .= ' AND ';
        }

        // for sent (in app)
        if (
            isset($_POST['type']) &&
            in_array($_POST['type'], ['sent', 'draft'])
        ) {
            $user_query .= "from_user_id = '" . $_POST['user_id'] . "'";
        }

        // for starred and trash pages (in app)
        elseif (
            isset($_POST['type']) &&
            in_array($_POST['type'], ['star', 'trash', 'unread'])
        ) {
            $user_query .=
                "(from_user_id = '" .
                $_POST['user_id'] .
                "' OR to_user_id = '" .
                $_POST['user_id'] .
                "')";
        }

        // for any category
        elseif ($inbox_category != '') {
            $user_query .=
                "(from_user_id = '" .
                $_POST['user_id'] .
                "' OR to_user_id = '" .
                $_POST['user_id'] .
                "')";
        }

        // for any search string
        elseif (isset($_POST['search']) && $_POST['search'] != '') {
            $user_query .=
                "(from_user_id = '" .
                $_POST['user_id'] .
                "' OR to_user_id = '" .
                $_POST['user_id'] .
                "')";
        }

        // for inbox (in app)
        else {
            $user_query .= "to_user_id = '" . $_POST['user_id'] . "'";
        }

        //echo $user_query;
        $user_fetch = get_data(
            $conn,
            $table_name,
            $user_query,
            'id,thread_id',
            '',
            ''
        );
        //print_arr($user_fetch);
        if (sizeof($user_fetch) > 0) {
            foreach ($user_fetch as $urow) {
                $user_threads[] = $urow['thread_id'];
            }
            $user_threads = array_values(
                array_unique(array_filter($user_threads))
            );
            if (sizeof($user_threads) > 0) {
                $user_threads_str = implode(',', $user_threads);

                if ($user_threads_str != '') {
                    if ($query != '') {
                        $query .= ' AND ';
                    }
                    $query .= 'thread_id IN (' . $user_threads_str . ')';
                    //$user_found = true;
                } else {
                    //$user_found = false;
                }
            }

            $user_mails_found = true;
        } else {
            $user_mails_found = false;
            //echo "No mails";
        }
    } else {
        $user_mails_found = false;
        //echo "No mails";
    }

    $search_fetch = [];
    $search_found = true; // by default it is set as true (for non-search queries)
    $search_query = '';
    $search_str = '';
    $search_threads = [];
    $search_threads_str = '';

    // Select threads with search terms only
    if (
        isset($_POST['search']) &&
        $_POST['search'] != '' &&
        $user_mails_found
    ) {
        $search_found = false; // for search queries, by default it is false

        // Find all mails with with search term

        $search_query = $query;
        $search_str = mysqli_real_escape_string($conn, trim($_POST['search']));

        if ($search_query != '') {
            $search_query .= ' AND ';
        }
        $search_query .=
            "title LIKE '%" .
            $search_str .
            "%' OR message LIKE '%" .
            $search_str .
            "%' ";

        $search_fetch = get_data(
            $conn,
            $table_name,
            $search_query,
            'id,thread_id',
            '',
            ''
        );
        if (sizeof($search_fetch) > 0) {
            foreach ($search_fetch as $srow) {
                $search_threads[] = $srow['thread_id'];
            }
            $search_threads = array_values(
                array_unique(array_filter($search_threads))
            );
            if (sizeof($search_threads) > 0) {
                $search_threads_str = implode(',', $search_threads);

                if ($search_threads_str != '') {
                    if ($query != '') {
                        $query .= ' AND ';
                    }
                    $query .= 'thread_id IN (' . $search_threads_str . ')';
                    $search_found = true;
                } else {
                    $search_found = false;
                }
            }
        }
    }

    $items = [];
    $latest = [];

    if ($search_found && $user_mails_found) {
        $latest_child_query = $query;

        // Set query for parent id as 0
        if (isset($_POST['parent']) && $_POST['parent'] == 'eq0') {
            if ($query != '') {
                $query .= ' AND ';
            }
            $query .= "parent_id = '0'";
        }
        //echo $query;

        $fetch = [];
        $fetch = get_data(
            $conn,
            $table_name,
            $query,
            'all',
            'thread_updated DESC',
            $limit
        );
        //print_arr($fetch);

        // Fetch Users Data
        if (isset($_POST['from']) && $_POST['from'] == 'userimage') {
            $users_arr = users_data_as_array($conn, 'users', 'array');
            //print_arr($users_arr);
        }

        foreach ($fetch as $key => $value) {
            //print_arr($value);

            if (isset($_POST['time'])) {
                $value['disptime'] = displayTime(
                    $value['timestamp'],
                    $_POST['time']
                );
            }

            if (isset($_POST['from']) && $_POST['from'] == 'userimage') {
                if (isset($users_arr[$value['from_user_id']])) {
                    $value['from_user'] = $users_arr[$value['from_user_id']];
                } else {
                    $value['from_user'] = [
                        'name' => '',
                        'username' => '',
                        'image' => 'images/user-bg.jpg',
                    ];
                }
            }
            if (isset($_POST['to']) && $_POST['to'] == 'userimage') {
                if (isset($users_arr[$value['to_user_id']])) {
                    $value['to_user'] = $users_arr[$value['to_user_id']];
                } else {
                    $value['to_user'] = [
                        'name' => '',
                        'username' => '',
                        'image' => 'images/user-bg.jpg',
                    ];
                }
            }
            if (
                isset($_POST['mail_category']) &&
                $_POST['mail_category'] == 'name'
            ) {
                $value['mail_category_name'] = mail_category_name(
                    $mail_cat_arr,
                    $value['mail_category'],
                    $_POST['user_id']
                );
            }

            // Fetch count of unread mails in this thread
            /*$info_query = "thread_id = '".$value["thread_id"]."' AND (mark_read = '0' OR star = '1')";
			if(isset($_POST["user_id"]) && $_POST["user_id"] != ""){
				//$info_query = "thread_id = '".$value["thread_id"]."' AND (mark_read LIKE '%|".$_POST["user_id"].":1|%' OR star LIKE '%|".$_POST["user_id"].":1|%')";
				$info_query = "thread_id = '".$value["thread_id"]."'";
			}
			//echo $info_query;
			*/

            $value['unread'] = [];
            $value['star'] = [];

            if (isset($_POST['user_id']) && $_POST['user_id'] != '') {
                $info_query = "thread_id = '" . $value['thread_id'] . "'";

                $fetch_info = get_data(
                    $conn,
                    $table_name,
                    $info_query,
                    'id,mark_read,star,trash',
                    '',
                    ''
                );
                //print_arr($fetch_info);
                $value['unread-' . $_POST['user_id']] = [];
                $value['star-' . $_POST['user_id']] = [];
                $value['trash-' . $_POST['user_id']] = [];

                if (sizeof($fetch_info) > 0) {
                    foreach ($fetch_info as $farr) {
                        if (
                            isset($_POST['user_id']) &&
                            $_POST['user_id'] != ''
                        ) {
                            if (
                                strpos(
                                    $farr['star'],
                                    '|' . $_POST['user_id'] . ':1|'
                                ) !== false
                            ) {
                                $value['star-' . $_POST['user_id']][] =
                                    $farr['id'];
                            }
                            if (
                                strpos(
                                    $farr['mark_read'],
                                    '|' . $_POST['user_id'] . ':1|'
                                ) === false
                            ) {
                                $value['unread-' . $_POST['user_id']][] =
                                    $farr['id'];
                            }
                            if (
                                strpos(
                                    $farr['trash'],
                                    '|' . $_POST['user_id'] . ':1|'
                                ) !== false
                            ) {
                                $value['trash-' . $_POST['user_id']][] =
                                    $farr['id'];
                            }
                        }

                        /*if($farr["mark_read"] == "0"){
						$value["unread"][] = $farr["id"];
					}*/
                        /*if($farr["star"] == "1"){
						$value["star"][] = $farr["id"];
					}*/
                    } // end foreach
                } // end if sizeof fetch_info > 0
            } // end if user_id check

            $items[] = $value;
        }

        // Fetch latest message and time in the thread
        if ($latest_child_query != '') {
            // max(timestamp) will get the latest child in thread
            // note: max() only gets the column and not whole row.
            $newcols = 'thread_id, max(timestamp)';
            $newquery =
                $latest_child_query .
                ' AND ' .
                $trashquery .
                " AND status='send' GROUP BY thread_id ";
            $newfetch = get_data(
                $conn,
                $table_name,
                $newquery,
                $newcols,
                '',
                ''
            );
            //print_r($newfetch);
            $finalquery = '';
            if (sizeof($newfetch) > 0) {
                foreach ($newfetch as $row) {
                    $finalquery .=
                        "(thread_id='" .
                        $row['thread_id'] .
                        "' AND timestamp='" .
                        $row['max(timestamp)'] .
                        "') OR ";
                }
            }
            $finalquery = substr($finalquery, 0, -3);
            $finalcols = 'id,message,attachment,thread_id,timestamp';
            //echo $finalquery;
            $finalfetch = get_data(
                $conn,
                $table_name,
                $finalquery,
                $finalcols,
                '',
                ''
            );
            //print_r($finalfetch);

            foreach ($finalfetch as $finalvalue) {
                if (isset($_POST['time'])) {
                    $finalvalue['disptime'] = displayTime(
                        $finalvalue['timestamp'],
                        $_POST['time']
                    );
                }
                $latest[$finalvalue['thread_id']] = $finalvalue;
            }
        }

        foreach ($items as $key => $value) {
            $items[$key]['checked'] = false;
            $items[$key]['latest'] = $latest[$value['thread_id']];
            if (isset($_POST['source']) && $_POST['source'] == 'admin') {
                $items[$key]['latest']['short_msg'] = short_message_string(
                    $latest[$value['thread_id']]['message'],
                    120
                );
            } else {
                $items[$key]['latest']['short_msg'] = short_message_string(
                    $latest[$value['thread_id']]['message'],
                    40
                );
            }
        }
    } // end no search found

    //$arr["latest"] = $latest;
    $arr['items'] = $items;
    $arr['post'] = $_POST;
    $arr['search_threads'] = $search_threads;
    $arr['search_found'] = $search_found;

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

    //$fetch_thread_ids = fetch_mail_thread_ids($_POST[$index_key]);

    $fetch = [];
    $fetch = get_data($conn, $table_name, $_POST[$index_key], 'all', '', '');
    //$fetch = get_data($conn,$table_name,"","all","","");
    //print_arr($fetch);

    // Fetch Users Data
    if (isset($_POST['display']) && $_POST['display'] == 'userimage') {
        $users_arr = users_data_as_array($conn, 'users', 'array');
        //print_arr($users_arr);
    }

    if (sizeof($fetch) > 0) {
        $ret = $fetch;
        $ret['success'] = true;

        //foreach ($fetch as $key => $value) {

        if (isset($_POST['display']) && $_POST['display'] == 'userimage') {
            if (isset($users_arr[$fetch['from_user_id']])) {
                $ret['from_user'] = $users_arr[$fetch['from_user_id']];
            } else {
                $ret['from_user'] = [
                    'name' => '',
                    'username' => '',
                    'image' => 'images/user-bg.jpg',
                ];
            }

            if (isset($users_arr[$fetch['to_user_id']])) {
                $ret['to_user'] = $users_arr[$fetch['to_user_id']];
            } else {
                $ret['to_user'] = [
                    'name' => '',
                    'username' => '',
                    'image' => 'images/user-bg.jpg',
                ];
            }
        }

        $ret['attachment'] = [];
        $ret['old_attachment'] = '';
        if ($fetch['attachment'] != '') {
            //echo $fetch["attachment"];
            $ret['old_attachment'] = $fetch['attachment'];
            $ret['attachment'] = fetch_data_uploads(
                $conn,
                $fetch['attachment']
            );
        }

        $ret['message'] = format_message_string($fetch['message']);

        //}
        //print_arr($ret);

        //$arr["items"] = $ret;
        //return $ret;
        //print_arr($arr);
        //$jsonstring = json_encode(array_values($ret), JSON_PRETTY_PRINT);
        //$retarr["items"] = $jsonstring;
        //$retarr["success"] = true;
        //print_r($retarr);
    }
    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'fetch-thread') {
    $ret = [];
    $ret['success'] = false;

    //print_r($_POST);

    //$fetch_thread_ids = fetch_mail_thread_ids($_POST[$index_key]);
    $query = 'thread_id = ' . $_POST['thread_id'] . '';
    if (isset($_POST['loadtype']) && $_POST['loadtype'] == 'trash') {
        $query .= " AND trash LIKE '%|" . $_POST['user_id'] . ":1|%'";
    } else {
        $query .= " AND trash NOT LIKE '%|" . $_POST['user_id'] . ":1|%'";
    }

    $fetch = [];
    $fetch = get_data($conn, $table_name, $query, 'all', 'timestamp ASC', '');
    //$fetch = get_data($conn,$table_name,"","all","","");
    //print_arr($fetch);

    // Fetch Users Data
    if (isset($_POST['display']) && $_POST['display'] == 'userimage') {
        $users_arr = users_data_as_array($conn, 'users', 'array');
        //print_arr($users_arr);
    }
    if (isset($_POST['mail_category']) && $_POST['mail_category'] == 'name') {
        // Fetch Mail Category Data
        $mail_cat_arr = mails_data_as_array($conn, 'mail_categories', 'array');
        //print_arr($mail_cat_arr);
    }

    if (sizeof($fetch) > 0) {
        $ret['success'] = true;

        foreach ($fetch as $key => $value) {
            $ret['data'][$key] = $fetch[$key];
            if (isset($_POST['display']) && $_POST['display'] == 'userimage') {
                if (isset($users_arr[$fetch[$key]['from_user_id']])) {
                    $ret['data'][$key]['from_user'] =
                        $users_arr[$fetch[$key]['from_user_id']];
                } else {
                    $ret['data'][$key]['from_user'] = [
                        'name' => '',
                        'username' => '',
                        'image' => 'images/user-bg.jpg',
                    ];
                }

                if (isset($users_arr[$fetch[$key]['to_user_id']])) {
                    $ret['data'][$key]['to_user'] =
                        $users_arr[$fetch[$key]['to_user_id']];
                } else {
                    $ret['data'][$key]['to_user'] = [
                        'name' => '',
                        'username' => '',
                        'image' => 'images/user-bg.jpg',
                    ];
                }
            }

            if (
                isset($_POST['mail_category']) &&
                $_POST['mail_category'] == 'name'
            ) {
                $ret['data'][$key]['mail_category_name'] = mail_category_name(
                    $mail_cat_arr,
                    $fetch[$key]['mail_category'],
                    $_POST['user_id']
                );
            }

            $ret['data'][$key]['attachment'] = [];
            if ($fetch[$key]['attachment'] != '') {
                //echo $fetch["attachment"];
                $ret['data'][$key]['old_attachment'] =
                    $fetch[$key]['attachment'];
                $ret['data'][$key]['attachment'] = fetch_data_uploads(
                    $conn,
                    $fetch[$key]['attachment']
                );
            }

            if (isset($_POST['time'])) {
                $ret['data'][$key]['disptime'] = displayTime(
                    $fetch[$key]['timestamp'],
                    $_POST['time']
                );
            }

            $ret['data'][$key]['short_msg'] = short_message_string(
                $fetch[$key]['message'],
                40
            );
            $ret['data'][$key]['message'] = format_message_string(
                $fetch[$key]['message']
            );

            $ret['data'][$key]['open'] = false;
            if ($key == sizeof($fetch) - 1) {
                $ret['data'][$key]['open'] = true;
            }
        }
        //print_arr($ret);

        // Mark all mails in this thread as read (read = 1)
        if (isset($_POST['mark_read']) && $_POST['mark_read'] == 'true') {
            //echo "mark_read";
            $type = 'mark_read';
            $value = [];
            $value[$type] = '1';

            $POST = [];
            $POST['action'] = $type;
            $POST['index'] = 'thread_id';
            $POST['thread_id'] = $_POST['thread_id'];
            $POST[$type] = $value[$type];
            $POST['user_id'] = $_POST['user_id'];
            //print_arr($POST);
            $feature = update_feature($conn, $POST);
            $thread_counts = update_thread_counts($conn, $POST, $type);
        }
    }
    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'star') {
    $ret = [];
    $ret['success'] = false;

    //print_r($_POST);
    //$savedata = array();
    //$savedata[0] = $_POST;
    //unset($savedata[0]["action"]);
    //unset($savedata[0]["index"]);

    //$_POST["star"] = "1";
    //print_arr($savedata);
    //die();

    // Perform SQL operation
    if (isset($_POST['index'])) {
        $feature = update_feature($conn, $_POST);

        //$affected_ids = insert_update_data($conn,$table_name,$savedata,$_POST["index"]);
        $thread_counts = update_thread_counts($conn, $_POST, 'star');

        //print_arr($affected_ids);

        if (sizeof($thread_counts['updated']) > 0) {
            $ret['success'] = true;
            $ret['feature'] = $feature;
        }
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'trash') {
    $ret = [];
    $ret['success'] = false;

    //print_r($_POST);
    if (isset($_POST['index'])) {
        $feature = update_feature($conn, $_POST);

        //$affected_ids = insert_update_data($conn,$table_name,$savedata,$_POST["index"]);
        $thread_counts = update_thread_counts($conn, $_POST, 'trash');

        //print_arr($affected_ids);

        if (sizeof($thread_counts['updated']) > 0) {
            $ret['success'] = true;
            $ret['feature'] = $feature;
            //$ret["thread_counts"] = $thread_counts;
        }
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'mark_read') {
    $ret = [];
    $ret['success'] = false;

    //print_r($_POST);

    // Perform SQL operation
    if (isset($_POST['index'])) {
        $feature = update_feature($conn, $_POST);

        //$affected_ids = insert_update_data($conn,$table_name,$savedata,$_POST["index"]);
        $thread_counts = update_thread_counts($conn, $_POST, 'mark_read');

        //print_arr($affected_ids);

        if (sizeof($thread_counts['updated']) > 0) {
            $ret['success'] = true;
            $ret['feature'] = $feature;
            //$ret["thread_counts"] = $thread_counts;
        }
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'read') {
    $ret = [];
    $ret['success'] = false;
    $ret['count'] = '0';
    $ret['ids'] = [];

    //print_r($_POST);
    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);
    unset($savedata[0]['index']);

    //print_arr($savedata);

    // Perform SQL operation
    if (isset($_POST['index'])) {
        if ($_POST['index'] == 'idbelow') {
            unset($savedata[0]['timestamp']);

            //$query = "thread_id,timestamp|>=";
            $read_query =
                "thread_id = '" .
                $_POST['thread_id'] .
                "' AND timestamp >= '" .
                $_POST['timestamp'] .
                "' ";

            $affected_ids = insert_update_data(
                $conn,
                $table_name,
                $savedata,
                '',
                $read_query
            );
        } else {
            $affected_ids = insert_update_data(
                $conn,
                $table_name,
                $savedata,
                $_POST['index']
            );
        }

        //print_arr($affected_ids);

        if (sizeof($affected_ids['updated']) > 0) {
            $ret['count'] = sizeof($affected_ids['updated'][0]);
            $ret['ids'] = $affected_ids['updated'][0];
            $ret['success'] = true;
        }
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'set-category') {
    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';

    //print_r($_POST);
    //die;

    // Perform SQL operation
    if (isset($_POST['index'])) {
        $imp_ids = '';
        if (isset($_POST['thread_id']) && $_POST['thread_id'] != '') {
            $expids = array_values(
                array_unique(array_filter(explode(',', $_POST['thread_id'])))
            );
            if (sizeof($expids) > 0) {
                //print_arr($expids);
                $imp_ids = implode(',', $expids);
            }
        }
        if ($imp_ids != '') {
            $type = 'mail_category';
            $value = [];
            $value[$type] = $_POST['mail_category'];
            $POST = [];
            $POST['action'] = $type;
            $POST['index'] = 'thread_id';
            $POST['thread_id'] = $imp_ids;
            $POST[$type] = $value[$type];
            $POST['user_id'] = $_POST['user_id'];
            $POST['multiple'] = 'thread_id';
            //print_arr($POST);
            $feature = update_feature($conn, $POST);
        }

        if (sizeof($feature) > 0) {
            $ret['feature'] = $feature;
            $ret['mail_category'] = $_POST['mail_category'];
            $ret['success'] = true;
            $ret['msg'] = 'Category Applied Successfully';
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

    $_POST['title'] = mysqli_real_escape_string($conn, $_POST['title']);
    $_POST['message'] = mysqli_real_escape_string($conn, $_POST['message']);
    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);
    unset($savedata[0]['attachment']);
    unset($savedata[0]['source']);

    $thread_id = $savedata[0]['thread_id'];

    // timestamp is only added on insertion and not updation
    if ($savedata[0]['id'] == '') {
        unset($savedata[0]['id']);
        $savedata[0]['timestamp'] = time();
    }

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
    //echo "---------";
    //print_arr($affected_ids);
    //echo "---------";
    if (sizeof($affected_ids['inserted']) > 0) {
        // update thread id for new thread (for mail with parent id as 0)
        foreach ($affected_ids['inserted'] as $value) {
            $updatedata = [];
            $updatedata[0]['id'] = $value;
            $updatedata[0]['parent_id'] = '0';
            $updatedata[0]['thread_id'] = $value;
            $updatedata[0]['thread_updated'] = time();
            $update_thread_id = insert_update_data(
                $conn,
                $table_name,
                $updatedata,
                'id,parent_id'
            );
            //echo "----||-----";
            //print_arr($update_thread_id);
            //echo "----||-----";
            //print_arr($update_thread_id["inserted"]);
            if (sizeof($update_thread_id['updated']) > 0) {
                //echo "hello";
                $thread_id = $value;
            }
        }
        //echo "||".$thread_id."||";

        // set thread_updated time for child mails added in thread
        if (
            isset($savedata[0]['thread_id']) &&
            $savedata[0]['thread_id'] != ''
        ) {
            set_thread_updated($conn, $savedata[0]['thread_id']);
        }

        //}
        //echo "Data Added Successfully";
    } elseif (sizeof($affected_ids['updated']) > 0) {
        // set thread_updated time
        if (isset($savedata[0]['thread_id'])) {
            set_thread_updated($conn, $savedata[0]['thread_id']);
        }

        //echo "Data Updated Successfully";
    }

    if (sizeof($affected_ids['inserted']) > 0) {
        $ret['msg'] = 'Mailed Successfully';
        $ret['success'] = true;
    } elseif (sizeof($affected_ids['updated']) > 0) {
        $ret['msg'] = 'Mail Updated Successfully';
        $ret['success'] = true;
    }

    $module_id = manage_upload_module(
        $conn,
        $affected_ids,
        $_POST['id'],
        $savedata[0]['attachment'],
        'mail'
    );

    $ret['id'] = $module_id;

    /*if(isset($_POST["thread_id"]) && $_POST["thread_id"] != ""){
		$thread_id = $_POST["thread_id"];
	}*/

    /*------ update thread_mark_read count for user who sent mail------*/
    $POST = [];
    $type = 'mark_read';
    $value = [];
    $value[$type] = '1';
    $POST['action'] = $type;
    $POST['index'] = 'thread_id';
    $POST['thread_id'] = $thread_id;
    $POST[$type] = $value[$type];
    $POST['user_id'] = $_POST['from_user_id'];
    //print_arr($POST);

    $thread_counts = update_thread_counts($conn, $POST, $type);
    /*------- Update end--------*/

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
elseif ($isUser && $_POST['action'] == 'emptytrash') {
    // Fetch thread_id of all mails with trash = 1 (non parent mails only).
    //Parent mails will be deleted anyways. No need to update trash count for parent mails.
    //print_arr($_POST);
    $ret = [];
    $ret['msg'] = '';
    $ret['success'] = false;

    // ' mail_category LIKE "%cat-' .
    // $_POST['user_id'] .
    // '-' .
    // $inbox_category .
    // ',%" '

    if (isset($_POST['user_id']) && $_POST['user_id'] != '') {
        $fetch = [];
        $cols = 'id,thread_id';
        $query = "trash LIKE '%|" . $_POST['user_id'] . ":1|%' ";
        $fetch = get_data($conn, 'mails', $query, $cols, '', '');
        //print_arr($fetch);
        //die();
        $arr = [];
        foreach ($fetch as $row) {
            $arr[] = $row['thread_id'];
        }
        //print_r($arr);
        $ids = '';
        if (sizeof($arr) > 0) {
            $ids = implode(',', $arr);
        }

        // if ($ids != '') {
        //     // Delete all with trash = 1
        //     //$index_arr['trash'] = '1';
        //     //$action = delete_data($conn, $table_name, $index_arr);
        // }
        //echo $ids;
        //die();

        //print_r($action);
        //echo $action["delete"];

        // if ($action['delete'] == 'success') {
        //     // Update thread trash counts again for deleted mails.
        //     $type = 'trash';
        //     foreach ($fetch as $row) {
        //         $arr['thread_id'] = $row['thread_id'];
        //         //echo "update count";
        //         update_thread_counts($conn, $arr, $type);
        //     }

        //     $ret['msg'] = 'Trash Emptied Successfully';
        //     $ret['success'] = true;
        // }
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
    $msg = '';

    //print_r($_POST);
    $value = [];

    $type = '';
    $ret['type'] = $_POST['type'];

    if ($_POST['type'] == 'star') {
        $type = 'star';
        $value['star'] = '1';
        $msg = 'Starred Successfully';
    } elseif ($_POST['type'] == 'unstar') {
        $type = 'star';
        $value['star'] = '0';
        $msg = 'Unstarred Successfully';
    } elseif ($_POST['type'] == 'read') {
        $type = 'mark_read';
        $value['mark_read'] = '1';
        $msg = 'Marked as Read Successfully';
    } elseif ($_POST['type'] == 'unread') {
        $type = 'mark_read';
        $value['mark_read'] = '0';
        $msg = 'Marked as Unread Successfully';
    } elseif ($_POST['type'] == 'trash') {
        $type = 'trash';
        $value['trash'] = '1';
        $msg = 'Moved to trash Successfully';
    } elseif ($_POST['type'] == 'inbox') {
        $type = 'trash';
        $value['trash'] = '0';
        $msg = 'Moved to Inbox Successfully';
    }

    //die();

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
    $POST['thread_id'] = $imp_ids;
    $POST[$type] = $value[$type];
    $POST['user_id'] = $_POST['user_id'];
    $POST['multiple'] = $_POST['index'];

    //print_arr($POST);

    if (isset($POST['index'])) {
        $feature = update_feature($conn, $POST);

        $thread_counts = update_thread_counts($conn, $POST, $type);

        if (sizeof($thread_counts['updated']) > 0) {
            $ret['success'] = true;
            $ret['msg'] = $msg;
            $ret['feature'] = $feature;
        }
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

/*
echo "<br/>------------------------<br/>";
fetch_mail_thread_ids($conn,"97");
echo "<br/>------------------------<br/>";
fetch_mail_thread_ids($conn,"98");
*/

function set_thread_updated($conn, $thread_id)
{
    //echo "thread_id: ".$thread_id."<br/>";
    $updatedata = [];
    $updatedata[0]['id'] = $thread_id;
    $updatedata[0]['thread_updated'] = time();
    $update = insert_update_data(
        $conn,
        'mails',
        $updatedata,
        'id',
        '',
        'updateonly'
    );
    //echo "thread updated: ";print_arr($update);
    return $update;
}

function mail_category_name($mail_cat_arr, $mail_category, $user_id)
{
    //$mail_category = "|15:cat-15-1,cat-15-2,cat-15-3,||30:cat-15-1,cat-15-2,cat-15-3,|";

    $ret = [];
    if ($mail_category != '') {
        $expcat = array_values(
            array_unique(array_filter(explode('|', $mail_category)))
        );
        //print_arr($expcat);
        foreach ($expcat as $str) {
            $exp2 = array_filter(explode(':', $str));
            $struser = $exp2[0];
            if (
                $struser == $user_id &&
                isset($exp2[1]) &&
                trim($exp2[1]) != ''
            ) {
                $strcat = $exp2[1];
                $exp3 = array_filter(explode(',', $strcat));
                foreach ($exp3 as $catstr) {
                    $exp4 = array_filter(explode('-', $catstr));
                    if (sizeof($exp4) > 0) {
                        $catid = $exp4[2];
                        if (isset($mail_cat_arr[$catid]['name'])) {
                            $ret[] = $mail_cat_arr[$catid]['name'];
                        }
                    }
                }
            }
        }
    }

    return $ret;
}

die();
?>