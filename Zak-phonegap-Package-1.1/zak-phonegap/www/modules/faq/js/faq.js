$(document).ready(function () {
	//console_log("rest api:"+REST_API_URL);

	let user = getUser();
	var form_data = new FormData();
	form_data.append("limit", "0,4");
	form_data.append("active", "active");
	form_data.append("action", "fetch-all");
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/faq/faq.php",
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
				//console_log(v.name);
				//console_log(i);
				//console_log(v);
				html += '<li class="active"><div class="collapsible-header">';
				html += "" + v.question + "";
				html += '</div><div class="collapsible-body"><span>';
				html += "" + v.answer + "";
				html += "</span></div></li>";
			});
			//console_log(html);
			$("#response").html(html);
			$(document).ready(initCollapsible);
		},
	});

	function initCollapsible() {
		//console_log("init");
		if ($(".collapsible.expandable").length) {
			$(".collapsible.expandable").collapsible({
				accordion: false,
			});
		}
	}
});
