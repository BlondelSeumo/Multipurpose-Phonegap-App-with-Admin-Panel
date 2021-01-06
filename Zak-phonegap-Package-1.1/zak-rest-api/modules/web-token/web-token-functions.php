<?php
require_once "jwt.php";

$authenticateUserToken = true;

// No User token for account activation / verification
if (isset($_POST["verification_code"]) && isset($_POST['action']) && $_POST['action'] == "verification") {
	$authenticateUserToken = false;
}

// No user token for Registration Process
if (
	isset($_POST["formtype"]) &&
	$_POST["formtype"] == "app-access" &&
	isset($_POST['action']) &&
	($_POST['action'] == "save" || $_POST['action'] == "check_available")
) {
	$authenticateUserToken = false;
}
if (isset($_POST['action']) && in_array($_POST['action'], ["login", "forgotpassword"])) {
	$authenticateUserToken = false;
}

if (isset($_POST['action']) && in_array($_POST['action'], ["app-guest"])) {
	$authenticateUserToken = false;
}
//print_r($_POST); echo "authenticateusertoken:".$authenticateUserToken;
//die;

$isGuest = false;
$isUser = false;

if (!$authenticateUserToken) {
	if (
		isset($_POST["auth_user"]) &&
		isset($_POST["from"]) &&
		$_POST["from"] == "lockscreen" &&
		isset($_POST["id"]) &&
		$_POST["id"] == $_POST["auth_user"]
	) {
		$isUser = true;
	} else {
		$isGuest = true;
	}
}

if ($authenticateUserToken && authenticate_appbased_user_token()) {
	$requestBy = authenticate_user_token();
	if ($requestBy == "isGuest") {
		$isGuest = true;
	} elseif ($requestBy == "isUser") {
		$isUser = true;
	}
	//echo "isUser:".$isUser." "."isGuest:".$isGuest."<br/>";
}

function authenticate_user_token()
{
	//print_r($_POST);
	global $APP_KEY;
	$isGuest = false;
	$isUser = false;
	$valid_request = false;

	if (isset($_POST["auth_token"]) && isset($_POST["auth_user"]) && isset($_POST["auth_type"])) {
		$token = $_POST["auth_token"];
		$auth_user = $_POST["auth_user"];
		$auth_type = $_POST["auth_type"];

		if (!is_null($token)) {
			//echo "token present";
			try {
				$payload = JWT::decode($token, $APP_KEY, ['HS256']);
				//echo "try";
				//print_r($payload);
				if (isset($payload->usertype) && $payload->usertype == "guest") {
					$retWT = [
						'usertype' => $payload->usertype,
						'exp' => $payload->exp,
						'iss' => $payload->iss,
					];
					$isGuest = true;
				} else {
					$retWT = [
						'userid' => $payload->userid,
						'username' => $payload->username,
						'exp' => $payload->exp,
						'iss' => $payload->iss,
					];
					$isUser = true;
				}
			} catch (Exception $e) {
				//print_r($e);
				//echo "catch";
				$retWT = ['error' => $e->getMessage()];
			}

			//print_r($retWT);
			$ret["retWT"] = $retWT;

			if (isset($retWT["error"])) {
				if ($retWT["error"] == "Expired token") {
					$valid_request = false;
					$ret["user_token"] = "expired";
				} else {
					$valid_request = false;
					$ret["user_token"] = "invalid-token";
				}
			} elseif (isset($retWT["exp"]) && time() > $retWT["exp"]) {
				$valid_request = false;
				$ret["user_token"] = "expired";
			} elseif ($isUser && $retWT["userid"] != $auth_user) {
				$valid_request = false;
				$ret["user_token"] = "invalid-user";
			} elseif ($isGuest && (($auth_user != "null" && $auth_user != "") || ($auth_type != "null" && $auth_type != ""))) {
				$valid_request = false;
				$ret["user_token"] = "invalid-guest";
			} else {
				$valid_request = true;
			}
		}
	}

	unset($_POST["auth_token"]);
	unset($_POST["auth_type"]);

	if (!$valid_request) {
		$ret["success"] = false;
		$ret["isGuest"] = $isGuest;
		$ret["isUser"] = $isUser;
		$jsonstring = json_encode($ret, JSON_PRETTY_PRINT);
		echo $jsonstring;
		die();
	} else {
		if ($isGuest) {
			return "isGuest";
		} elseif ($isUser) {
			return "isUser";
		}
	}

	return "";
}

function generate_user_token($user)
{
	$token = '';
	$userid = $user["id"];
	$username = $user["username"];
	$seconds = 24 * 60 * 60; // 24 hours
	//$seconds = 15;
	$exp = time() + $seconds * 1;
	$iss = $_SERVER['HTTP_HOST'];
	// create a token
	$payloadArray = [];
	$payloadArray['userid'] = $userid;
	$payloadArray['username'] = $username;
	if (isset($nbf)) {
		$payloadArray['nbf'] = $nbf;
	}
	if (isset($exp)) {
		$payloadArray['exp'] = $exp;
	}
	if (isset($iss)) {
		$payloadArray['iss'] = $iss;
	}
	global $APP_KEY;
	$token = JWT::encode($payloadArray, $APP_KEY);

	return $token;
}

function generate_guest_token()
{
	$token = '';
	$usertype = "guest";
	$seconds = 2 * 60 * 60; // 2 hours
	//$seconds = 20;
	$exp = time() + $seconds * 1;
	$iss = $_SERVER['HTTP_HOST'];
	// create a token
	$payloadArray = [];
	$payloadArray['usertype'] = $usertype;
	if (isset($nbf)) {
		$payloadArray['nbf'] = $nbf;
	}
	if (isset($exp)) {
		$payloadArray['exp'] = $exp;
	}
	if (isset($iss)) {
		$payloadArray['iss'] = $iss;
	}
	global $APP_KEY;
	$token = JWT::encode($payloadArray, $APP_KEY);
	return $token;
}

?>