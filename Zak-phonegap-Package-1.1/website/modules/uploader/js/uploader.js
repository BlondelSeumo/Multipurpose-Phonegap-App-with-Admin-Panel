// File Upload Delete Action
$(document).on("click", ".del-media", function (e) {
	console_log("del-media");
	var id = e.currentTarget.dataset.id;
	var fieldid = e.currentTarget.dataset.fieldid;

	// get string of ids
	var oldstr = $("#" + fieldid + "_disp").attr("data-id");
	//explode to array
	var oldids = oldstr.split(",");
	console_log(oldids);
	// Delete matching value
	oldids.splice($.inArray(id, oldids), 1);
	console_log(oldids);
	// regenarate string and apply new value
	var newstr = oldids.join(",");
	$("#" + fieldid + "_disp").attr("data-id", newstr);
	console_log(newstr);
	// remove image element
	$(".filemedia-" + id).remove();
});

$("input[type='file'].instant_upload").change(function () {
	var user = getUser();
	//console_log("upload file instantly and empty file element for next upload");
	var fieldid = $(this).attr("id");
	let uploadfrom = $(this).attr("data-from");
	console_log(fieldid);

	var form_data = new FormData();
	form_data.append("action", "instant-upload");
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);
	form_data.append("fieldid", fieldid);
	form_data.append("multiple", "true");
	form_data.append("uploadfrom", uploadfrom);

	var attachment = $("#" + fieldid).prop("files")[0];
	if (attachment == undefined) {
		attachment = "";
	}
	var ins = document.getElementById(fieldid).files.length;
	for (var x = 0; x < ins; x++) {
		form_data.append("" + fieldid + "[]", document.getElementById(fieldid).files[x]);
	}

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/file/file.php",
		data: form_data,
		processData: false,
		contentType: false,
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			ajax_loading();
			//$("#response").html('<p class="pad-15">Loading...</p>');
		},
		success: function (response) {
			ajax_loaded();
			console_log(response);
			let data = JSON.parse(response);
			check_user_token(data);

			if (data.success !== false) {
				if (data.savedata[0][fieldid] != undefined && data.savedata["save_uploads"] != undefined) {
					// append new files
					fileids = data.savedata[0][fieldid];
					fileinfo = data.savedata["save_uploads"];
					//console_log(fileids);

					if (fileids != "") {
						var idsarr = fileids.split(",");
						//console_log(idsarr);//
						//console_log(fileinfo);
						var i;
						var attachstr = "";
						var attachid = "";

						for (i = 0; i < idsarr.length; ++i) {
							filename = get_display_filename(fileinfo[i], "small");
							console_log(idsarr[i] + ": " + filename);
							attachstr += "<div class='filemedia filemedia-" + idsarr[i] + "' data-id='" + idsarr[i] + "'>";
							attachstr += "<img src='" + filename_url(filename) + "' class='responsive-img z-depth-1'>";
							attachstr +=
								"<i class='btn-small red lighten-2 del-media mdi mdi-close' data-id='" +
								idsarr[i] +
								"' data-fieldid='" +
								fieldid +
								"'></i></div>";
							attachid += idsarr[i] + ",";
						}
						var ele = $("#" + fieldid + "_disp");
						var old_str = ele.attr("data-id");
						ele.attr("data-id", old_str + "," + attachid);
						ele.append(attachstr);
						// clear input file field value
						var fileele = $("input[type='file'].instant_upload");
						//console_log(fileele.attr("id"));
						//console_log(fileele.val()+" value present");
						fileele.val("");
						$(".file-path-wrapper .file-path").val("");
						//console_log(fileele.val()+"value cleared");
					}
				}
			}
			//$("#response").html(msg);
		},
		error: errorHandling,
	});
});
