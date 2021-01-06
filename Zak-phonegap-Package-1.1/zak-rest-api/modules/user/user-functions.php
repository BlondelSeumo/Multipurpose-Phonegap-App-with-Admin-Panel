<?php

function send_code($conn, $data, $set_password_url, $type)
{
    $ret = [];
    $ret['success'] = false;
    $ret['code_sent'] = false;
    $ret['msg'] =
        'Your account is registered but email verification code was not sent. Please contact app administrator.';

    $code = mt_rand(100001, 100999);
    $to = $data['email'];

    global $APP_FROM_EMAIL;
    $headers = 'From: ' . $APP_FROM_EMAIL;

    //print_arr($data);
    $savedata = [];
    $savedata[0]['id'] = $data['id'];
    $msg = '';
    $subject = '';
    $txt = '';

    if ($type == 'forgotpassword') {
        $savedata[0]['code'] = $code;

        $msg =
            'Verification code has been sent on your email id. Please check and enter the code to continue.';

        $subject = 'Forgot Password? Your Verification Code is here';
        if ($set_password_url != '') {
            $txt =
                'Hello ' .
                $data['name'] .
                ', Your verification code is: ' .
                $code .
                '. You can enter the code on same page or visit ' .
                $set_password_url .
                ' to reset password. Thank You';
        } else {
            $txt =
                'Hello ' .
                $data['name'] .
                ', Your verification code is: ' .
                $code .
                '. You can enter the code in your app and reset your password. Thank You';
        }
    } elseif ($type == 'verification_code') {
        $savedata[0]['verification_code'] = $code;

        $msg =
            'Verification code has been sent on your email id. To activate your account, please check and enter the code on account verification page.';

        $subject =
            'Thank You for Registration. Your Account Verification Code.';
        $txt =
            'Hello ' .
            $data['name'] .
            ', Your account verification code is: ' .
            $code .
            '. You can enter the code on account activation page in the mobile app. Thank You';
    }

    $affected_ids = insert_update_data(
        $conn,
        'users',
        $savedata,
        'id',
        '',
        'updateonly'
    );
    //echo "Send code for verification:";
    //print_arr($affected_ids);
    //echo $to;
    //echo $txt;
    //echo $headers;
    //echo $subject;

    if (sizeof($affected_ids['updated']) > 0) {
        if (mail($to, $subject, $txt, $headers)) {
            // enter code in database for user
            $ret['success'] = true;
            $ret['code_sent'] = true;
            $ret['msg'] = $msg;
        }
    }

    return $ret;
}

function users_data_as_array(
    $conn,
    $type,
    $format = '',
    $query = '',
    $order = ''
) {
    $ret = [];
    if ($type == 'users') {
        $arr = get_data(
            $conn,
            'users',
            $query,
            'id,name,username,image,position',
            $order,
            ''
        );
        foreach ($arr as $key => $value) {
            if ($format == 'array') {
                $ret[$value['id']] = [];
                $ret[$value['id']]['id'] = $value['id'];
                $ret[$value['id']]['name'] = $value['name'];
                $ret[$value['id']]['username'] = $value['username'];
                $ret[$value['id']]['image'] = $value['image'];
                $ret[$value['id']]['image'] = get_image_info(
                    $conn,
                    $value,
                    'image'
                );
                $ret[$value['id']]['position'] = $value['position'];
            } elseif ($format == 'name') {
                $ret[$value['id']] = $value['name'] . '';
            } else {
                $ret[$value['id']] =
                    $value['name'] . ' (' . $value['username'] . ')';
            }
        }
    }

    return $ret;
}

function login_user($conn, $table_name, $query, $ret, $provider = '')
{
    $fetch = get_data($conn, $table_name, $query, 'all', '', '');
    //echo $query;
    //print_arr($fetch);

    if (sizeof($fetch) == '1') {
        // Fetch User Image
        $image_arr = ['0' => ['name' => 'images/user-bg.jpg']];

        if ($fetch[0]['image'] != '') {
            $image_arr = fetch_data_uploads($conn, $fetch[0]['image']);
        }
        $fetch[0]['image'] = $image_arr;

        if (isset($fetch[0]['active']) && $fetch[0]['active'] == '1') {
            $ret['success'] = true;
            $ret['msg'] = 'Login Successful';
            $ret['user'] = $fetch[0];
            //token
            $ret['user']['token'] = generate_user_token($fetch[0]);
            $ret['user']['provider'] = $provider;
        } else {
            $ret['success'] = false;
            $ret['msg'] = 'Account Inactive. Please contact Administrator';
        }
    } else {
        $ret['success'] = false;
        $ret['msg'] = 'Incorrect Username & Password. Please try again.';
    }

    return $ret;
}

?>