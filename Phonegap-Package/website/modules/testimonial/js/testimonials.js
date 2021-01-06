function load_testimonials() {
	let user = getUser();

	//alert("hi");
	var form_data = new FormData();
	form_data.append("order", "id DESC");
	form_data.append("limit", "0,4");
	form_data.append("action", "fetch-all");
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/testimonial/testimonial.php",
		data: form_data,
		processData: false,
		contentType: false,
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			$("#response").val("Connecting...");
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

				html += "<li>";
				html += '<p class="center"><i class="mdi mdi-format-quote-open"></i>';
				html += "" + v.message + "";
				html += '<i class="mdi mdi-format-quote-close"></i></p>';
				html += '<div class=" center-align"><div class="row userinfo">';
				html += '<img src="' + filename_url(v.image.name) + '" alt="" class="circle responsive-img">';
				html += '<div class="left-align"><span class=""><strong>';
				html += "" + v.name + "";
				html += '</strong><br><span class="small">';
				html += "" + v.position + "";
				html += "</span></span></div></div></div>";
				html += "</li>";
			});
			//console_log(html);
			$("#response-testimonial").html(html);
			$(document).ready(initSlider_testimonial);
		},
	});
}

function initSlider_testimonial() {
	//console_log("init slider");
	if ($(".slider4").length > 0) {
		$(".slider4").slider({
			indicators: false,
			height: 220,
		});
	}
}
