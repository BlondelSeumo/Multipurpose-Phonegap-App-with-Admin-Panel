<?php

include '../../lib/app.php';

$table_name = 'users';
$index_key = 'id';

if ($isUser && $_POST['action'] == 'fetch-all') {
    //print_arr($_POST);

    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';

    $checkauth = check_user_authorization($conn, $_POST);
    if (!$checkauth) {
        $ret['success'] = false;
        $ret['msg'] = 'User Not Authorized';
    }

    if ($checkauth) {
        $limit = '';
        if (isset($_POST['limit'])) {
            $limit = $_POST['limit'];
        }

        $query = '';
        if (isset($_POST['active']) && $_POST['active'] == '1') {
            $query .= "active = '1'";
        }

        if (isset($_POST['exclude']) && $_POST['exclude'] != '') {
            if ($query != '') {
                $query .= ' AND ';
            }
            $query .= "id != '" . $_POST['exclude'] . "'";
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
        $useridname = [];

        if (sizeof($fetch) > 0) {
            foreach ($fetch as $key => $value) {
                /*-----Attachment info-----*/
                $value['image'] = get_image_info($conn, $value, 'image');
                /*----------*/

                $items[] = $value;
                $useridname[$value['id']] = $value;
            }

            if (isset($_POST['addfield']) && ($_POST['addfield'] = 'checked')) {
                foreach ($items as $key => $value) {
                    $items[$key]['checked'] = false;
                }
            }
            $ret['items'] = $items; // array("items" => array($items));

            if (isset($_POST['format']) && ($_POST['format'] = 'useridname')) {
                $ret['useridname'] = $useridname;
            }

            $ret['success'] = true;
        }
    } // end checkauth
    //$ret['server'] = $_SERVER;
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

    //print_r($_POST);
    //die;

    if (isset($_POST['fetchtype']) && $_POST['fetchtype'] == 'profile-edit') {
        //echo "edit profile";
        $checkauth = check_user_authorization($conn, $_POST, 'profile-edit');
    } else {
        //echo "view profile";
        $checkauth = check_user_authorization($conn, $_POST, 'profile');
    }

    if (!$checkauth) {
        $ret['success'] = false;
        $ret['msg'] = 'User Not Authorized';
    }

    if ($checkauth) {
        $fetch = [];
        $fetch = get_data(
            $conn,
            $table_name,
            $_POST[$index_key],
            'all',
            '',
            ''
        );
        //$fetch = get_data($conn,$table_name,"","all","","");
        //print_arr($fetch);

        if (sizeof($fetch) > 0) {
            $ret = $fetch;
            $ret['success'] = true;

            $ret['image'] = ['0' => ['name' => 'images/user-bg.jpg']];

            if ($fetch['image'] != '') {
                //echo $fetch["attachment"];
                $ret['image'] = fetch_data_uploads($conn, $fetch['image']);
            }

            if (isset($_POST['time'])) {
                if (isset($_POST['source']) && $_POST['source'] == 'app') {
                    $ret['dob'] = timestamp_to_dmy(
                        $fetch['dob'],
                        $_POST['time']
                    );
                } else {
                    $ret['dob'] = timestamp_to_datestring(
                        $fetch['dob'],
                        $_POST['time'],
                        'ignoretime'
                    );
                }
            }

            $ret['labels_arr'] = [];
            global $APP_MODULES;
            if (in_array('label', $APP_MODULES)) {
                $ret['labels_arr'] = fetch_labels_arr($conn, $fetch['labels']);
            }
        }
    } // end check auth

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif (($isUser || $isGuest) && $_POST['action'] == 'login') {
    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';
    $ret['user'] = [];

    //print_arr($_POST);

    $savedata = [];
    $savedata[0] = $_POST;
    unset($savedata[0]['action']);

    $empty_values = false;

    // Check for empty values

    // From Lockscreen page
    if (isset($_POST['from']) && $_POST['from'] == 'lockscreen') {
        if (trim($savedata[0]['password']) == '') {
            $ret['msg'] = 'Please enter password';
            $empty_values = true;
        }
    }
    // From Login Page
    else {
        if (
            trim($savedata[0]['username']) == '' ||
            trim($savedata[0]['password']) == ''
        ) {
            $ret['msg'] = 'Please enter both username and password';
            $empty_values = true;
        }
    }

    if (!$empty_values) {
        if ($savedata[0]['username'] != '') {
            $savedata[0]['username'] = trim($savedata[0]['username']);
        }

        // Encrypt Password
        if ($savedata[0]['password'] != '') {
            $savedata[0]['password'] = md5($savedata[0]['password']);
        }

        $fetch = [];
        $query =
            "username = '" .
            trim($savedata[0]['username']) .
            "' AND password = '" .
            trim($savedata[0]['password']) .
            "' ";

        // Check for id in query (for login from lockscreen)
        if (isset($_POST['from']) && $_POST['from'] == 'lockscreen') {
            $query .= " AND id = '" . trim($savedata[0]['id']) . "' ";
        }

        // Check for id in query (for login from lockscreen)
        if (isset($_POST['from']) && $_POST['from'] == 'admin') {
            $query .= " AND usertype = 'admin' ";
        }

        $ret = login_user($conn, $table_name, $query, $ret);
    }
    //print_r($ret);
    //die();

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isGuest && $_POST['action'] == 'verification') {
    $ret = [];
    $ret['success'] = true;
    $ret['verified'] = false;

    if (
        trim($_POST['username']) == '' ||
        trim($_POST['phone']) == '' ||
        trim($_POST['email']) == '' ||
        trim($_POST['verification_code']) == ''
    ) {
        $ret['msg'] = 'Please fill in all the details.';
        $ret['success'] = false;
    } else {
        $fetch = [];
        $query =
            "username = '" .
            trim($_POST['username']) .
            "' AND email = '" .
            trim($_POST['email']) .
            "' AND phone='" .
            trim($_POST['phone']) .
            "' ";
        $fetch = get_data($conn, $table_name, $query, 'all', '', '');
        //echo $query;
        //print_arr($fetch);
        if (sizeof($fetch) == 1) {
            $verified = $fetch[0]['verified'];
            if ($verified == '0') {
                $verification_code = $fetch[0]['verification_code'];
                if ($verification_code == $_POST['verification_code']) {
                    // code matched, activate account.
                    $savedata = [];
                    $savedata[0]['id'] = $fetch[0]['id'];
                    $savedata[0]['verification_code'] = '0';
                    $savedata[0]['active'] = '1';
                    $savedata[0]['verified'] = '1';

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
                        $ret['msg'] =
                            'Account Verified and Activated Successfully.';
                        $ret['verified'] = true;
                        $ret['success'] = true;
                    }
                } else {
                    $ret['msg'] =
                        'Your verification code is incorrect. Please check and try again.';
                    $ret['verified'] = false;
                    $ret['success'] = false;
                }
            } elseif ($verified == '1') {
                $ret['msg'] = 'Your account is already verified.';
                $ret['verified'] = true;
                $ret['success'] = false;
            }
        } else {
            $ret['msg'] = 'Incorrect Details. Please check and try again.';
            $ret['success'] = false;
        }
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
} elseif (
    ($isUser && $_POST['action'] == 'check_available') ||
    ($isGuest &&
        !isset($_POST['id']) &&
        isset($_POST['formtype']) &&
        $_POST['formtype'] == 'app-access' &&
        $_POST['action'] == 'check_available')
) {
    $ret = [];
    $ret['success'] = true;

    //print_arr($_POST);

    if (
        trim($_POST['username']) == '' ||
        trim($_POST['phone']) == '' ||
        trim($_POST['email']) == ''
    ) {
        $ret['msg'] =
            'Please fill in your username, email and phone to check availability.';
        $ret['success'] = false;
    } else {
        $present = [];
        $present['username'] = false;
        $present['email'] = false;
        $present['phone'] = false;
        $msg = '';
        $count = 0;

        //print_arr($_POST);

        $fetch = [];
        $query =
            "username = '" .
            trim($_POST['username']) .
            "' OR email = '" .
            trim($_POST['email']) .
            "' OR phone='" .
            trim($_POST['phone']) .
            "' ";

        // for updates do not compare with same id row
        if (isset($_POST['id']) && $_POST['id'] != '') {
            $query =
                ' ( ' . $query . " ) AND id != '" . trim($_POST['id']) . "' ";
        }

        $fetch = get_data(
            $conn,
            $table_name,
            $query,
            'id,username,email,phone',
            '',
            ''
        );
        //echo $query;
        //print_arr($fetch);
        if (sizeof($fetch) > 0) {
            foreach ($fetch as $row) {
                if (trim($_POST['username']) == trim($row['username'])) {
                    $present['username'] = true;
                }
                if (trim($_POST['email']) == trim($row['email'])) {
                    $present['email'] = true;
                }
                if (trim($_POST['phone']) == trim($row['phone'])) {
                    $present['phone'] = true;
                }
            }

            // Compose Message
            if ($present['username']) {
                $msg .= 'Username, ';
                $count++;
            }
            if ($present['email']) {
                $msg .= 'Email, ';
                $count++;
            }
            if ($present['phone']) {
                $msg .= 'Phone, ';
                $count++;
            }

            if ($count > 0) {
                $msg = substr($msg, 0, -2);
                $msg .= ' is already taken. Please enter different details.';
            }

            $ret = $present;
            $ret['msg'] = $msg;
            $ret['success'] = false;
        }
    } // end else

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
} elseif (
    ($isUser && $_POST['action'] == 'save') ||
    ($isGuest &&
        !isset($_POST['id']) &&
        isset($_POST['formtype']) &&
        $_POST['formtype'] == 'app-access' &&
        $_POST['action'] == 'save')
) {
    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';

    //print_r($_POST); //die;
    if (isset($_POST['formtype']) && $_POST['formtype'] == 'app-access') {
        $checkauth = true;
    } else {
        $checkauth = check_user_authorization($conn, $_POST, 'profile-edit');
    }

    if (!$checkauth) {
        $ret['success'] = false;
        $ret['msg'] = 'User Not Authorized';
    }

    if ($checkauth) {
        $id = '';
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
        }

        if (isset($_POST['dob'])) {
            if (isset($_POST['source']) && $_POST['source'] == 'app') {
                $_POST['dob'] = dmy_to_timestamp($_POST['dob'], $_POST['time']);
            } else {
                $_POST['dob'] = datestring_to_timestamp(
                    $_POST['dob'],
                    'ignoretime'
                );
            }
        }
        //print_r($_POST);
        //die();

        $savedata = [];
        $savedata[0] = $_POST;
        unset($savedata[0]['action']);
        unset($savedata[0]['image']);
        unset($savedata[0]['old_image']);
        unset($savedata[0]['source']);
        unset($savedata[0]['confirm_password']);
        unset($savedata[0]['time']);
        unset($savedata[0]['reauthenticate']);
        unset($savedata[0]['auth_type']);
        unset($savedata[0]['formtype']);

        // Encrypt Password
        if (isset($savedata[0]['password'])) {
            if ($savedata[0]['password'] != '') {
                $savedata[0]['password'] = md5($savedata[0]['password']);
            }
            // Update is done if id is set. Do not update password
            elseif (
                isset($savedata[0]['id']) &&
                $savedata[0]['id'] != '' &&
                $savedata[0]['password'] == ''
            ) {
                unset($savedata[0]['password']);
            }
        }

        $image = single_file_upload($conn, $_POST, $_FILES, 'image');

        // If Image is compulsory, on empty it cannot be updated
        if ($image != '') {
            $savedata[0]['image'] = $image;
        }
        //print_arr($savedata);
        //die();
        // Perform sql operation
        $affected_ids = insert_update_data(
            $conn,
            $table_name,
            $savedata,
            $index_key
        );
        //print_arr($affected_ids);
        if (sizeof($affected_ids['inserted']) > 0) {
            $ret['msg'] = 'New Registration Successful';
            $ret['success'] = true;
        } elseif (sizeof($affected_ids['updated']) > 0) {
            $ret['msg'] = 'User Updated Successfully';
            $ret['success'] = true;
        }

        // Update module it in file uploads table
        manage_upload_module($conn, $affected_ids, $id, $image, 'user');

        //send email verification code, if registration done from app
        // send code only for new user registration
        if (isset($_POST['source']) && $_POST['source'] == 'app') {
            //echo "send code";
            if (sizeof($affected_ids['inserted']) > 0) {
                if (
                    $affected_ids['inserted'][0] != '' &&
                    $affected_ids['inserted'][0] != '0'
                ) {
                    $query = "id = '" . $affected_ids['inserted'][0] . "' ";
                    $fetch = get_data(
                        $conn,
                        $table_name,
                        $query,
                        'all',
                        '',
                        ''
                    );
                    //print_arr($fetch);
                    $send_code = send_code(
                        $conn,
                        $fetch[0],
                        '',
                        'verification_code'
                    );
                    $ret['msg'] = $send_code['msg'];
                    $ret['success'] = $send_code['success'];
                }
            }
        }

        //die();

        if (isset($_POST['reauthenticate']) && $_POST['reauthenticate'] != '') {
            $query = " id = '" . $_POST['reauthenticate'] . "' ";
            $fetch = get_data($conn, $table_name, $query, 'all', '', '');
            if (sizeof($fetch) > 0) {
                // Fetch User Image
                $image_arr = ['0' => ['name' => 'images/user-bg.jpg']];

                if ($fetch[0]['image'] != '') {
                    $image_arr = fetch_data_uploads($conn, $fetch[0]['image']);
                }
                $fetch[0]['image'] = $image_arr;

                $ret['user'] = $fetch[0];
                $ret['user']['token'] = generate_user_token($fetch[0]);
            }
        }
    } // end checkauth

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'delete') {
    delete_item($conn, $_POST, $index_key, $table_name);
}
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isUser && $_POST['action'] == 'resetpassword') {
    //print_r($_POST);

    $ret = [];
    $ret['msg'] = '';
    $ret['success'] = false;

    $checkdata = [];
    $checkdata[0] = $_POST;
    //unset($checkdata[0]["action"]);

    // Check for all the entered values are correct

    if ($checkdata[0]['username'] != '') {
        $checkdata[0]['username'] = trim($checkdata[0]['username']);
    }
    if ($checkdata[0]['email'] != '') {
        $checkdata[0]['email'] = trim($checkdata[0]['email']);
    }

    if ($checkdata[0]['phone'] != '') {
        $checkdata[0]['phone'] = trim($checkdata[0]['phone']);
    }

    // Encrypt Old Password
    if ($checkdata[0]['old_password'] != '') {
        $checkdata[0]['old_password'] = md5($checkdata[0]['old_password']);
    }

    $fetch = [];
    $query =
        "username = '" .
        trim($checkdata[0]['username']) .
        "' AND phone = '" .
        trim($checkdata[0]['phone']) .
        "' AND email = '" .
        trim($checkdata[0]['email']) .
        "' AND password = '" .
        trim($checkdata[0]['old_password']) .
        "' ";

    $fetch = get_data($conn, $table_name, $query, 'all', '', '');
    //echo $query;
    //print_arr($fetch);

    if (sizeof($fetch) == '1') {
        // Update password
        if (trim($_POST['password']) != '' && isset($fetch[0]['id'])) {
            $savedata = [];
            // Encrypt Password
            $savedata[0]['password'] = md5(trim($_POST['password']));
            $savedata[0]['id'] = $fetch[0]['id'];

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
                $ret['msg'] = 'Password Changed Successfully';
                $ret['success'] = true;
            }
        }
    } else {
        $ret['msg'] = 'Incorrect Details. Please check and try again';
        $ret['success'] = false;
    }

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

// Forgot password
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif ($isGuest && $_POST['action'] == 'forgotpassword') {
    //print_r($_POST);

    $ret = [];
    $ret['msg'] = '';
    $ret['success'] = false;
    $ret['code_sent'] = false;
    $ret['password_updated'] = false;

    // URL for forgot password in mail
    $set_password_url = '';
    if (isset($_POST['set_password_url'])) {
        $set_password_url = $_POST['set_password_url'];
    }

    // If account details are accurate, then send verification code to this account
    //if($_POST["code_sent"] == "false"){

    // check for account details

    $checkdata = [];
    $checkdata[0] = $_POST;
    //unset($checkdata[0]["action"]);

    // Check for all the entered values are correct

    if ($checkdata[0]['username'] != '') {
        $checkdata[0]['username'] = trim($checkdata[0]['username']);
    }
    if ($checkdata[0]['email'] != '') {
        $checkdata[0]['email'] = trim($checkdata[0]['email']);
    }

    if ($checkdata[0]['phone'] != '') {
        $checkdata[0]['phone'] = trim($checkdata[0]['phone']);
    }

    $fetch = [];
    $query =
        "username = '" .
        trim($checkdata[0]['username']) .
        "' AND phone = '" .
        trim($checkdata[0]['phone']) .
        "' AND email = '" .
        trim($checkdata[0]['email']) .
        "' ";

    // Code sent is true, then check for code as well in query along with username,email and phone
    if ($_POST['code_sent'] == 'true') {
        $query .=
            " AND code = '" .
            trim($checkdata[0]['code']) .
            "' AND code != '0' ";
    }

    $fetch = get_data($conn, $table_name, $query, 'all', '', '');
    //echo $query;
    //print_arr($fetch);

    if (sizeof($fetch) == '1') {
        // Account details matched
        if (isset($fetch[0])) {
            // If no code is sent yet, send code on email
            if ($_POST['code_sent'] == 'false') {
                $send_code = send_code(
                    $conn,
                    $fetch[0],
                    $set_password_url,
                    'forgotpassword'
                );
                $ret['msg'] = $send_code['msg'];
                $ret['success'] = $send_code['success'];
                $ret['code_sent'] = $send_code['code_sent'];
            }
            // Update password
            elseif ($_POST['code_sent'] == 'true') {
                $savedata = [];

                // Encrypt Password
                $savedata[0]['password'] = md5(trim($_POST['password']));
                $savedata[0]['id'] = $fetch[0]['id'];
                $savedata[0]['code'] = '0';

                $affected_ids = insert_update_data(
                    $conn,
                    'users',
                    $savedata,
                    'id',
                    '',
                    'updateonly'
                );
                if (sizeof($affected_ids['updated']) > 0) {
                    $ret['msg'] = 'Password Updated Successfully';
                    $ret['success'] = true;
                    $ret['password_updated'] = true;
                }
            }
        }
    }
    // Acccount details not matched
    else {
        $ret['msg'] = 'Incorrect Details. Please check and try again';
        $ret['success'] = false;
    }

    //}

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

// OAuth User Register and Login
//---------------------------------------
//	API Post Action
//----------------------------------------
elseif (($isUser || $isGuest) && $_POST['action'] == 'oauth') {
    $ret = [];
    $ret['success'] = false;
    $ret['msg'] = '';
    $ret['user'] = [];

    //print_r($_POST);
    $fetch = [];
    $query = "email = '" . trim($_POST['email']) . "' ";
    $fetch = get_data(
        $conn,
        $table_name,
        $query,
        'id,email,name,image',
        '',
        ''
    );
    //echo $query;
    //print_arr($fetch);

    if (sizeof($fetch) > 0) {
        // User already registered , update image if empty, undefined or has url
        // echo 'user present';
        //print_r($fetch);
        $image = trim($fetch[0]['image']);
        if (
            $image == '' ||
            $image == 'undefined' ||
            strpos($image, '://') !== false
        ) {
            //echo 'update image';
            if ($_POST['image'] != 'undefined') {
                $savedata = [];
                $savedata[0]['image'] = $_POST['image'];
                $savedata[0]['id'] = $fetch[0]['id'];
                //print_r($savedata);
                $affected_ids = insert_update_data(
                    $conn,
                    $table_name,
                    $savedata,
                    $index_key
                );
                //print_r($affected_ids);
            }
        }
    } else {
        // Register User and login
        $savedata = [];
        $savedata[0] = $_POST;
        unset($savedata[0]['action']);
        unset($savedata[0]['from']);
        unset($savedata[0]['auth_user']);
        unset($savedata[0]['provider']);
        $savedata[0]['usertype'] = 'user';
        $savedata[0]['active'] = '1';
        $savedata[0]['verified'] = '1';

        // In case if user has no image in oauth account.
        if ($_POST['image'] == 'undefined') {
            unset($savedata[0]['image']);
        }
        $affected_ids = insert_update_data(
            $conn,
            $table_name,
            $savedata,
            $index_key
        );
    }

    $ret = login_user($conn, $table_name, $query, $ret, $_POST['provider']);

    $jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
    echo $jsonstring;
}

die();
?>