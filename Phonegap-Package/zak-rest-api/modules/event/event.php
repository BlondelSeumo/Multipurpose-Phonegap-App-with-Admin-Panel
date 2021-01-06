<?php

include '../../lib/app.php';

$table_name = 'events';
$index_key = 'id';

if ($isUser && $_POST['action'] == 'fetch-all') {
    $ret = [];
    $ret['success'] = false;
    $ret['range'] = '';

    $query = '';

    if (isset($_POST['source']) && ($_POST['source'] = 'app')) {
        // fetch global and user events only
        if ($query != '') {
            $query .= ' AND ';
        }
        //echo "|".$_POST["user_id"]."|";
        if ($_POST['user_id'] == '' || $_POST['user_id'] == 'null') {
            //echo "nonlogged in";
            // for non logged in users
            $query .= "eventtype='global' AND active = '1' ";
        } else {
            //echo "logged in";
            // for logged in users
            $query .=
                "( (eventtype='global' AND active = '1') OR user_id='" .
                $_POST['user_id'] .
                "' OR (eventtype='users' AND users LIKE '%," .
                $_POST['user_id'] .
                ",%' AND active = '1') ) ";
        }
    } else {
        if (isset($_POST['active']) && $_POST['active'] == '1') {
            if ($query != '') {
                $query .= ' AND ';
            }
            $query .= "active = '1'";
        }
    }

    $stts = '';
    $endts = '';

    if (isset($_POST['loadtype']) && $_POST['loadtype'] != '') {
        $offset = $_POST['time'];
        if ($_POST['loadtype'] == 'month' && $_POST['month'] != '') {
            $monthNum = $_POST['month'] + 1;
            $year = $_POST['year'];
            $monthName = date('F', mktime(0, 0, 0, $monthNum, 10));
            $month_range = $monthName . ' ' . $year;
            $timestamp = strtotime($month_range);
            $first_dmy = date('01/m/Y 00:00:00', $timestamp);
            $last_dmy = date('t/m/Y 23:59:59', $timestamp);
            $stts = dmyhis_to_timestamp($first_dmy, $offset);
            $endts = dmyhis_to_timestamp($last_dmy, $offset);
            $stdtfull = timestamp_to_datestring($stts, $offset, '');
            $enddtfull = timestamp_to_datestring($endts, $offset, '');
            //echo $monthName." ".$first_dmy." ".$last_dmy." ".$stts." ".$endts." ".$stdtfull." ".$enddtfull." ";
            $ret['range'] = $month_range;
        } elseif ($_POST['loadtype'] == 'month' && $_POST['date'] != '') {
            $ret['range'] = $_POST['date'];
            $timestamp = strtotime($_POST['date']);
            $first_dmy = date('01/m/Y 00:00:00', $timestamp);
            $last_dmy = date('t/m/Y 23:59:59', $timestamp);
            $stts = dmyhis_to_timestamp($first_dmy, $offset);
            $endts = dmyhis_to_timestamp($last_dmy, $offset);
            $stdtfull = timestamp_to_datestring($stts, $offset, '');
            $enddtfull = timestamp_to_datestring($endts, $offset, '');
            //echo $_POST["date"]." ".$first_dmy." ".$last_dmy." ".$stts." ".$endts." ".$stdtfull." ".$enddtfull." ";
        } elseif ($_POST['loadtype'] == 'day' && $_POST['date'] != '') {
            $ret['range'] = $_POST['date'];
            $timestamp = strtotime($_POST['date']);
            $stts = $timestamp + $offset * 60;
            $endts = $stts + 24 * 60 * 60;
            $stdtfull = timestamp_to_datestring($stts, $offset, '');
            $enddtfull = timestamp_to_datestring($endts, $offset, '');
            //echo $_POST["date"]." ".$timestamp." ".$stts." ".$endts." ".$stdtfull." ".$enddtfull." ";
        } elseif ($_POST['loadtype'] == 'year' && $_POST['year'] != '') {
            $year = $_POST['year'];
            $ret['range'] = 'Year ' . $year;
            $strange = '1 January ' . $year;
            $timestamp = strtotime($strange);
            $first_dmy = date('01/01/Y 00:00:00', $timestamp);
            $last_dmy = date('31/12/Y 23:59:59', $timestamp);
            $stts = dmyhis_to_timestamp($first_dmy, $offset);
            $endts = dmyhis_to_timestamp($last_dmy, $offset);
            $stdtfull = timestamp_to_datestring($stts, $offset, '');
            $enddtfull = timestamp_to_datestring($endts, $offset, '');
            //echo $year." ".$strange." ".$timestamp." ".$first_dmy." ".$last_dmy;
            //echo " ".$stts." ".$endts." ".$stdtfull." ".$enddtfull." ";
        }

        if ($stts != '' && $endts != '') {
            if ($query != '') {
                $query .= ' AND ';
            }
            $query .= '(';
            $query .=
                "(from_date <= '" .
                $stts .
                "' AND to_date >= '" .
                $endts .
                "') OR";
            $query .=
                "(from_date BETWEEN '" . $stts . "' AND '" . $endts . "') OR";
            $query .= "(to_date BETWEEN '" . $stts . "' AND '" . $endts . "')";
            $query .= ')';
        }
    }

    //echo $query;
    $order = '';
    if (isset($_POST['order'])) {
        $order = $_POST['order'];
    }

    $limit = '';
    //print_arr($_POST);
    if (isset($_POST['limit'])) {
        $limit = $_POST['limit'];
    }

    //echo $query;

    //echo $limit;
    $fetch = [];
    $fetch = get_data($conn, $table_name, $query, 'all', $order, $limit);
    //print_arr($fetch);
    $items = [];

    // Fetch Users
    if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
        $users_arr = users_data_as_array($conn, 'users', 'array');
        //print_arr($users_arr);
    }

    // Fetch Contacts
    if (isset($_POST['contact']) && $_POST['contact'] == 'userimage') {
        $contacts_arr = contacts_data_as_array($conn, 'contacts', 'array');
        //print_arr($contacts_arr);
    }

    // Fetch category
    if (isset($_POST['category']) && $_POST['category'] == 'name') {
        $event_categories_arr = events_data_as_array($conn, 'event_categories');
        //print_arr($event_categories_arr);
    }

    $count = [];
    $daystart = 0;
    $dayend = 0;

    if (sizeof($fetch) > 0) {
        if (isset($_POST['loadtype']) && $_POST['loadtype'] == 'month') {
            //echo $first_dmy." ".$last_dmy." ".$stts." ".$endts." ".$stdtfull." ".$enddtfull." ";
            if ($daystart == 0) {
                $daystart = $stts;
            }
            for ($i = 0; $i <= 31; $i++) {
                if ($dayend < $endts) {
                    $dayend = $daystart + 24 * 60 * 60 - 1;
                    $fieldid = timestamp_to_datestring(
                        $daystart,
                        $offset,
                        '',
                        'dmy'
                    );
                    //$fieldid .= " - ".$daystart." - ".$dayend;
                    //$fieldid .= " - ".timestamp_to_datestring($daystart,$offset,"")."-".timestamp_to_datestring($dayend,$offset,"");
                    $count[$i]['date'] = $fieldid;
                    $count[$i]['tsstart'] = $daystart;
                    $count[$i]['tsend'] = $dayend;
                    $count[$i]['events'] = [];
                    $daystart = $dayend + 1;
                }
            }
        }
        //print_r($count);
    }

    //print_arr($users_arr);
    foreach ($fetch as $key => $value) {
        //print_arr($value);
        //echo $value["users"]."|";
        if (sizeof($count) > 0) {
            foreach ($count as $ck => $cv) {
                $tss = $cv['tsstart'];
                $tse = $cv['tsend'];
                $tsfr = $value['from_date'];
                $tsto = $value['to_date'];
                if (
                    ($tsfr >= $tss && $tsfr <= $tse) ||
                    ($tsto >= $tss && $tsto <= $tse) ||
                    ($tsfr <= $tss && $tsto >= $tse)
                ) {
                    $count[$ck]['events'][] = $value['id'];
                }
            }
        }

        if (isset($_POST['user']) && $_POST['user'] == 'userimage') {
            $value['users_str'] = assign_data_to_ids(
                $value['users'],
                $users_arr
            );
            $value['users_arr'] = assign_data_to_ids(
                $value['users'],
                $users_arr,
                'array'
            );
        }
        if (isset($_POST['contact']) && $_POST['contact'] == 'userimage') {
            $value['contacts_str'] = assign_data_to_ids(
                $value['contacts'],
                $contacts_arr
            );
            $value['contacts_arr'] = assign_data_to_ids(
                $value['contacts'],
                $contacts_arr,
                'array'
            );
        }
        if (isset($_POST['category']) && $_POST['category'] == 'name') {
            $value['event_category'] = assign_data_to_ids(
                $value['event_category'],
                $event_categories_arr
            );
        }
        if (isset($_POST['time'])) {
            $value['from_disptime'] = displayTime(
                $value['from_date'],
                $_POST['time']
            );
            $value['from_disptime_info'] = $value['from_disptime']['info'];
            $value['to_disptime'] = displayTime(
                $value['to_date'],
                $_POST['time']
            );
            $value['to_disptime_info'] = $value['to_disptime']['info'];
        }

        /*-----Attachment info-----*/
        if ($value['attachment'] != '') {
            $value['attachment'] = fetch_data_uploads(
                $conn,
                $value['attachment']
            );
        }

        $items[] = $value;
    }

    //print_r($count);

    $ret['count'] = $count;
    $ret['items'] = $items;
    //print_r($arr);
    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
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

        $ret['users_arr'] = [];
        if (isset($_POST['users']) && $_POST['users'] == 'array') {
            if (trim($fetch['users']) != '') {
                $expusers = array_values(
                    array_unique(
                        array_filter(explode(',', trim($fetch['users'])))
                    )
                );
                //print_arr($expusers);
                if (sizeof($expusers) > 0) {
                    $ret['users_arr'] = $expusers;
                }
            }
        }

        $ret['contacts_arr'] = [];
        if (isset($_POST['contacts']) && $_POST['contacts'] == 'array') {
            if (trim($fetch['contacts']) != '') {
                $expcontacts = array_values(
                    array_unique(
                        array_filter(explode(',', trim($fetch['contacts'])))
                    )
                );
                //print_arr($expcontacts);
                if (sizeof($expcontacts) > 0) {
                    $ret['contacts_arr'] = $expcontacts;
                }
            }
        }
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
                $ret['from_date'] = timestamp_to_dmy(
                    $fetch['from_date'],
                    $_POST['time']
                );
                $ret['to_date'] = timestamp_to_dmy(
                    $fetch['to_date'],
                    $_POST['time']
                );
                $ret['from_time'] = timestamp_to_time(
                    $fetch['from_date'],
                    $_POST['time']
                );
                $ret['to_time'] = timestamp_to_time(
                    $fetch['to_date'],
                    $_POST['time']
                );
            } else {
                $ret['from_date'] = timestamp_to_datestring(
                    $fetch['from_date'],
                    $_POST['time']
                );
                $ret['to_date'] = timestamp_to_datestring(
                    $fetch['to_date'],
                    $_POST['time']
                );
            }
        }
    }
    //print_arr($fetch);
    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
} elseif ($isUser && $_POST['action'] == 'save') {
    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';

    //print_r($_POST);
    //print_r($_FILES);

    if (
        isset($_POST['source']) &&
        $_POST['source'] == 'app' &&
        isset($_POST['time'])
    ) {
        $_POST['from_date'] = concat_to_timestamp(
            $_POST['from_date'],
            $_POST['from_time'],
            $_POST['time']
        );
        $_POST['to_date'] = concat_to_timestamp(
            $_POST['to_date'],
            $_POST['to_time'],
            $_POST['time']
        );
    } else {
        if (isset($_POST['from_date'])) {
            $_POST['from_date'] = datestring_to_timestamp($_POST['from_date']);
        }
        if (isset($_POST['to_date'])) {
            $_POST['to_date'] = datestring_to_timestamp($_POST['to_date']);
        }
    }

    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['source']);
    unset($savedata[0]['action']);
    unset($savedata[0]['attachment']);
    unset($savedata[0]['from_time']);
    unset($savedata[0]['to_time']);
    unset($savedata[0]['time']);

    $savedata = multi_file_uploader($conn, $_FILES, $_POST, $savedata);

    unset($savedata[0]['old_attachment']);

    // timestamp is only added on insertion and not updation
    /*if($savedata[0]["id"] == ""){
		$savedata[0]["timestamp"] = time();
	}*/

    // Single Uploader
    /*
	$attachment = single_file_upload($conn,$_POST,$_FILES,"attachment");
	//echo "|||".$attachment."|||";
	// If attachment is not compulsory, on empty it will be updated too
	$savedata[0]["attachment"] = $attachment;
	*/

    $savedata[0]['users'] = ',' . $savedata[0]['users'] . ',';
    $savedata[0]['contacts'] = ',' . $savedata[0]['contacts'] . ',';

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
    if (isset($savedata[0]['attachment'])) {
        //manage_upload_module($conn,$affected_ids,$_POST["id"],$attachment,"event");
        $module_id = manage_upload_module(
            $conn,
            $affected_ids,
            $_POST['id'],
            $savedata[0]['attachment'],
            'event'
        );

        $ret['id'] = $module_id;
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
} elseif ($isUser && $_POST['action'] == 'delete') {
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