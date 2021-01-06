<?php

header('Access-Control-Allow-Origin: *');
date_default_timezone_set('UTC');

include 'connection.php';
include 'variables.php';

$GLOBALS['APP_MODULES'] = [];
global $APP_MODULES;

$GLOBALS['APP_KEY'] = 'MY-SECRET-WEB-TOKEN-KEY';
global $APP_KEY;

$GLOBALS['ALLOW_UPLOAD_TYPE'] = ['image/*'];
global $ALLOW_UPLOAD_TYPE;

$GLOBALS['APP_FROM_EMAIL'] = 'fromemail@mydomain.com';
global $APP_FROM_EMAIL;

include 'functions.php';

require '../app/app-functions.php';
require '../app/app-time-functions.php';
require '../app/app-manage-thread-functions.php';
require '../file/file-functions.php';
require '../user/user-functions.php';
require_once '../web-token/web-token-functions.php';
require '../blog/blog-functions.php';
require '../friend/friend-functions.php';
require '../follower/follower-functions.php';
require '../contact/contact-functions.php';
require '../event/event-functions.php';
require '../mail/mail-functions.php';
require '../album/album-functions.php';

?>