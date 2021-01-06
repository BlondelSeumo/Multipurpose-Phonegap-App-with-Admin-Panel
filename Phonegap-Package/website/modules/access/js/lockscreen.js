$(document).ready(function () {
	var authentic = isUserAuthenticated();
	if (!authentic) {
		$("#response-lockscreen").html("It seems you are not logged in.<br/>Redirecting to login page");
		setTimeout(function () {
			window.location.href = "ui-pages-login.html";
		}, 2500);
	} else {
		var user = getUser();
		var userinfo = "";
		//console_log(user);
		if (user["image"] != "" && user["image"] != null) {
			userinfo +=
				"<div><img class='text-center z-depth-1 img-responsive' style='width:80px;border-radius:50%;height:80px;' src='" +
				filename_url(user["image"]) +
				"'></div>";
		}
		if (user["name"] != "" && user["name"] != null) {
			userinfo += "<h5 class='text-center white-text'>Hello, " + user["name"] + "</h5>";
		}
		$("#response-userinfo").html(userinfo);
		$("#response-lockscreen").html("Please enter your password to continue");
	}

	$("#lockscreen-form").submit(function (e) {
		//$(document).on( 'click', '#lockscreen', function (e){
		e.preventDefault();

		if (authentic) {
			//console_log("allow submit");
			var user = getUser();
			var id = user.id;
			var username = user.username;
			var password = $("#password").val();

			//console_log(username + password + id);

			var form_data = new FormData();
			form_data.append("from", "lockscreen");
			form_data.append("id", id);
			form_data.append("username", username);
			form_data.append("password", password);
			form_data.append("action", "login");
			form_data.append("auth_user", user.id);
			form_data.append("auth_type", user.usertype);
			form_data.append("auth_token", user.token);

			$.ajax({
				type: "POST",
				url: REST_API_URL + "modules/user/user.php",
				data: form_data,
				processData: false,
				contentType: false,
				crossDomain: true,
				cache: false,
				beforeSend: function () {
					$("#response-lockscreen").val("Loading...");
				},
				success: function (response) {
					console_log(response);
					let data = JSON.parse(response);
					check_user_token(data);

					var msg = data.msg;
					if (data.success !== false) {
						authenticateUser(data.user);
						var user = getUser();
						var notifymsg = "Welcome " + user.name + "! You have logged in successfully!";
						notifyUser(notifymsg);
						var url_string = window.location.href;
						var url = new URL(url_string);
						var redirect = url.searchParams.get("url");
						//$("h5").append(" "+page);
						if (redirect != null && redirect.trim() != "") {
							//$("h5").append(" Redirect to: "+redirect);
							window.location.href = redirect;
						} else {
							//console_log("redirect to home");
							window.location.href = "ui-app-dashboard.html";
						}
					}
					//console_log(data.msg);
					$("#response-lockscreen").html(msg);
				},
			});
		} // end authentic else
	});
});
