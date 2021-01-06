$(document).ready(function () {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var getid = url.searchParams.get("id");
	//console_log(getid);

	var user = getUser();
	var id = "";

	if (getid == null || getid == "" || getid == "0") {
		id = user.id;
	} else {
		id = getid;
	}

	label_module = APP_MODULES.indexOf("label") > -1 ? true : false;
	available_module = APP_MODULES.indexOf("available") > -1 ? true : false;

	var form_data = new FormData();
	form_data.append("action", "fetch");
	form_data.append("id", id);
	form_data.append("user_id", user.id);
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);
	//form_data.append('friends', "count");
	//form_data.append('followers', "count");
	//form_data.append('following', "count");

	if (getid != null && getid != user.id) {
		//form_data.append('visibility', 'friends');
		//form_data.append('active', '1');
	} else {
		// form_data.append('visibility', 'myalbums');
	}

	var action_btn = "";
	if (user.id == id) {
		action_btn = '<a class="btn btn-small" href="ui-app-profile-edit.html">Edit Profile</a>';
	}
	$("#ui-profile #actions").append(action_btn);

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/user/user.php",
		data: form_data,
		processData: false,
		contentType: false,
		crossDomain: true,
		cache: false,
		beforeSend: function (request) {
			ajax_loading();
			$("#response").val("Loading...");
		},
		success: function (response) {
			ajax_loaded();
			console_log(response);
			let data = JSON.parse(response);
			check_user_token(data);

			var html = "";
			if (data.success !== false) {
				if (data.name != "") {
					$("#name").html(data.name);
					$("#profileimg").attr("alt", data.name);
				}
				if (data.position != "") {
					$("#position").html(data.position);
				}
				if (data.location != "") {
					$("#location").html(data.location);
				}
				if (data.brief != "") {
					$("#brief").html(data.brief);
				}
				// if ($("#profileimg").length) {
				// 	$("#profileimg").attr("src", filename_url(data.image[0].name));
				// }
				if ($("#ui-profile .primg").length) {
					$("#ui-profile .primg").css("background-image", "url(" + filename_url(data.image[0].name) + ")");
				}

				if (label_module) {
					update_labels(data.labels_arr, id);
				}
				if (available_module) {
					update_available(data.available, id);
				}
			}

			$("#response").html(html);
		},

		error: errorHandling,
	});
});

$(document).on("click", '[data-load="tab"]', function (e) {
	if (!$(this).hasClass("loaded")) {
		var datatype = $(this).attr("data-type");
		if (datatype == "friends") {
			load_friends("response-friends");
		}
		if (datatype == "followers") {
			load_followers("response-followers");
		}
		if (datatype == "following") {
			load_following("response-following");
		}
		if (datatype == "albums") {
			load_albums("response-albums", id, "profile");
		}

		console_log("loaded: " + datatype);
		$(this).addClass("loaded");
	}
});
