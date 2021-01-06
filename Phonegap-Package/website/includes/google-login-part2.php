<?php
if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);

    // get profile info
    $google_oauth = new Google_Service_Oauth2($client);
    $google_account_info = $google_oauth->userinfo->get();

    // echo '<pre>';
    // print_r($google_account_info);
    // echo json_encode($google_account_info);
    // echo '</pre>';

    $arr = [];
    $arr['email'] = $google_account_info->email;
    $arr['name'] = $google_account_info->name;
    $arr['image'] = $google_account_info->picture;
    $arr['provider'] = 'google-web';
    $oauth_response = json_encode($arr);

    echo '<script type="text/javascript">';
    echo "oauth_user('" . $oauth_response . "', '" . $arr['provider'] . "')";
    echo '</script>';
} else {
    echo '<script type="text/javascript">';
    echo 'window.top.location = "' . $client->createAuthUrl() . '"';
    echo '</script>';
}
?>