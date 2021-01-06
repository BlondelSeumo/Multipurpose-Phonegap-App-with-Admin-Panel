function fetch_user_contacts(callback) {
	console_log("fetch_user_contacts");
	var form_data = new FormData();
	form_data.append("action", "fetch-all");
	//form_data.append('active', "1")
	form_data.append("user_id", user.id);
	form_data.append("id", "");
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/contact/contact.php",
		data: form_data,
		processData: false,
		contentType: false,
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			//$("#response").html('<p class="pad-15">Connecting...</p>');
		},
		success: function (response) {
			//console_log(response);
			let data = JSON.parse(response);
			check_user_token(data);

			//console_log(data.items);
			cathtml = "<option value='' disabled>Select Contacts</option>";
			$.each(data["items"], function (i, v) {
				cathtml +=
					'<option value="' +
					v.id +
					'" data-icon="' +
					filename_url(v.image.name) +
					'" class="circle">' +
					v.name +
					" (" +
					v.id +
					")</option>";
			});
			$("#contacts").html(cathtml);
			$("#contacts").formSelect();
			//console_log(cathtml);
			callback();
		},
		error: errorHandling,
	});
}
