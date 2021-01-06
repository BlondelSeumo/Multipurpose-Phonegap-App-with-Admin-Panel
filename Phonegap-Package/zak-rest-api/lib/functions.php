<?php
// Common app related functions

function authenticate_appbased_user_token()
{
	return true;
}

function check_user_authorization($conn, $POST, $type = "")
{
	// Your ACL based authorizations and conditions can be done here.
	return true;
}

?>