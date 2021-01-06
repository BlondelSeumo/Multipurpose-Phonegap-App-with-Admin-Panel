$(document).ready(function () {
	let user = getUser();
	//alert("hi");
	var form_data = new FormData();
	form_data.append("limit", "0,8");
	form_data.append("action", "fetch-all");
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/client/client.php",
		data: form_data,
		processData: false,
		contentType: false,
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			$("#response").val("Connecting...");
		},
		success: function (response) {
			//console_log(response);
			var html = "";
			let data = JSON.parse(response);
			check_user_token(data);

			//console_log(data["items"][0].name);
			$.each(data["items"], function (i, v) {
				//console_log(i);
				//console_log(v);
				html += '<div class="col s6"><div class="client-box z-depth-1 center">';
				html += '<a href="' + v.url + '" title="' + encodeURI(v.name) + '">';
				html += '<img src="' + filename_url(v.image.name) + '" alt="' + v.name + '">';
				html += "</a></div></div>";
			});
			//console_log(html);
			$("#response").html(html);
		},
	});
});
//
