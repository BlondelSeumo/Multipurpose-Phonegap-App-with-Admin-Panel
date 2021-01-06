//$(document).ready(function () {

function load_team_members(element = "", limit = "") {
	if (element == "") {
		element = "response";
	}

	//response-team
	let user = getUser();

	//alert("hi");
	var form_data = new FormData();
	form_data.append("limit", limit); //"0,4"
	form_data.append("action", "fetch-all");
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/team/team.php",
		data: form_data,
		processData: false,
		contentType: false,
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			$("#" + element).val("Connecting...");
		},
		success: function (response) {
			console_log(response);
			var html = "";
			let data = JSON.parse(response);
			check_user_token(data);

			//console_log(data["items"][0].name);
			$.each(data["items"], function (i, v) {
				//console_log(v.name);
				//console_log(i);
				//console_log(v);

				html += '<div class="col s12 pad-0">';
				html += '<a class="img-wrap" href="' + filename_url(v.image.name) + '" data-fancybox="images" data-caption="' + v.name + '">';
				html += '<img class="z-depth-1" style="width: 100%;" src="' + filename_url(v.image.name) + '">';
				html += "</a>";
				html += '<h6 class="bot-0">' + v.name + "</h6>";
				html += '<span class="text-upper light small">' + v.position + "</span>";
				html += '<div class="spacer"></div>';
				html += "</div>";
			});
			$("#" + element).html(html);
		},
	});
}
//});
