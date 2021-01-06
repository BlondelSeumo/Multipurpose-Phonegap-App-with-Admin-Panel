var user = getUser();
var tzoffset = getUserTimeZone();

var url_string = window.location.href;
var url = new URL(url_string);
var getid = url.searchParams.get("id");
//console_log(getid);

if (getid != null) {
	load_chat(getid, user);
} // end getid

setInterval(function () {
	load_chat(getid, user);
}, 5000);

function load_chat(getid, user) {
	var last_message = $("#last_message").attr("data-id");
	var last_message_ts = $("#last_message").attr("data-ts");
	//console_log("---"+last_message);

	var unread = get_unread_messages();

	//alert("hi");
	var form_data = new FormData();
	form_data.append("user_id", user.id);
	form_data.append("id", getid);
	form_data.append("source", "app");
	form_data.append("action", "fetch-chat");
	form_data.append("last_message", last_message);
	form_data.append("last_message_ts", last_message_ts);
	form_data.append("unread_ids", unread);
	form_data.append("time", tzoffset);
	form_data.append("auth_user", user.id);
	form_data.append("auth_type", user.usertype);
	form_data.append("auth_token", user.token);

	$.ajax({
		type: "POST",
		url: REST_API_URL + "modules/chat/chat.php",
		data: form_data,
		processData: false,
		contentType: false,
		crossDomain: true,
		cache: false,
		beforeSend: function () {
			//$("#response").html('<p class="pad-15">Connecting...</p>');
		},
		success: function (response) {
			//$("#response").html('');
			console_log(response);
			let data = JSON.parse(response);
			check_user_token(data);

			update_status(data.unread_ids);
			if (data.success == true) {
				var generate = [];
				generate = generate_messages(data.items, user);
				$("#response").append(generate["html"]);
				$("#last_message").attr("data-id", generate["last_message"]);
				$("#last_message").attr("data-ts", generate["last_message_ts"]);
				scroll_down();
				//console_log("last_message: "+generate["last_message"]);
			}
		},
		error: errorHandling,
	});
}

$("#form").submit(function (e) {
	e.preventDefault();

	var last_message = $("#last_message").attr("data-id");
	var last_message_ts = $("#last_message").attr("data-ts");
	var unread = get_unread_messages();

	var message = $("#message").val();
	var id = "";
	if (getid != null) {
		id = getid;
	}

	var attachment = $("#attachment").prop("files")[0];
	if (attachment == undefined) {
		attachment = "";
	}

	var reply_to = $(".chat-form .reply-area").attr("data-id");
	//console_log("reply_to"+reply_to);

	if (message != "" || attachment != "") {
		var form_data = new FormData();
		form_data.append("action", "save");
		form_data.append("from_user_id", user.id);
		form_data.append("to_user_id", id);
		form_data.append("message", message);
		form_data.append("attachment", attachment);
		form_data.append("old_attachment", "");
		form_data.append("id", "");
		form_data.append("source", "app");
		form_data.append("last_message", last_message);
		form_data.append("last_message_ts", last_message_ts);
		form_data.append("unread_ids", unread);
		form_data.append("auth_user", user.id);
		form_data.append("auth_type", user.usertype);
		form_data.append("auth_token", user.token);
		form_data.append("time", tzoffset);

		if (reply_to != "") {
			form_data.append("type", "reply");
			form_data.append("type_id", reply_to);
		}

		$.ajax({
			type: "POST",
			url: REST_API_URL + "modules/chat/chat.php",
			data: form_data,
			processData: false,
			contentType: false,
			crossDomain: true,
			cache: false,
			beforeSend: function () {
				ajax_loading();
				//$("#response").html('<p class="pad-15">Connecting...</p>');
			},
			success: function (response) {
				ajax_loaded();
				console_log(response);
				let data = JSON.parse(response);
				check_user_token(data);

				//var msg = data.msg;
				update_status(data.unread_ids);
				if (data.success !== false) {
					var generate = [];
					generate = generate_messages(data.items, user);
					$("#response").append(generate["html"]);
					$("#last_message").attr("data-id", generate["last_message"]);
					$("#last_message").attr("data-ts", generate["last_message_ts"]);
					//console_log("last_message: "+generate["last_message"]);

					$("#message").val("");
					$("#attachment").val("");
					$(".file-path").val("").removeClass("valid");
					empty_reply();
					scroll_down();
				}
				//$("#response").html(msg);
			},
			error: errorHandling,
		});
	}
});

function generate_messages(items, user) {
	//console_log(items);
	html = "";
	$.each(items, function (i, v) {
		//first check if date is alraeady displayed
		if ($("#response .date-bubble[data-id='" + v.tsdate + "']").length == 0 && v.rowtype == "date") {
			console_log("date: " + v.daydate);
			html += '<li class="date-bubble" data-id="' + v.tsdate + '" data-type="date-bubble">';
			html += '<div class="btn btn-small">' + v.daydate + "</div>";
			html += "</li>";
		}

		//console_log(v);
		// check if message is already display by setinterval or not
		if ($("#response #message-" + v.id).length == 0 && v.rowtype == "message") {
			//console_log("message: "+v.id);

			// console_log(v.id+" length 0");

			last_message = v.id;
			last_message_ts = v.timestamp;
			var name = v.from_user.name;
			//var image = v.from_user.image.name;
			var image = get_display_filename(v.from_user.image, "thumb");

			var side = "leftside";
			var status = "";
			var icon = "";
			if (v.from_user_id == user.id) {
				side = "rightside";
				var status = "read";
				var icon = "mdi-check-all primary-text";
				if (v.mark_read == 0) {
					status = "unread";
					icon = "mdi-check";
				}
			}

			var replymsg = "";
			if (v.type == "reply" && v.reply != undefined) {
				replymsg +=
					'<div class="replyinfo replyinfo-' + v.reply.id + '" id="' + v.reply.id + '" data-id="' + v.reply.id + '" data-type="replyinfo">';
				replymsg += '<div class="replyfrom">' + v.reply.userinfo.name + "</div>";
				replymsg += '<div class="replymsg">' + v.reply.message + "</div>";
				replymsg += "</div>";
			}

			var star_class = "unstar";
			if (v.star.indexOf("|" + user.id + ":1|") > -1) {
				star_class = "star";
			}

			html +=
				'<li class="' +
				side +
				" msg-bubble message " +
				star_class +
				" " +
				status +
				'" data-id="' +
				v.id +
				'" id="message-' +
				v.id +
				'" data-type="msg-bubble">';
			html += '<div class="msg-area z-depth-1">';
			html += '<img src="' + filename_url(image) + '" alt="' + name + '" title="' + name + '" class="circle userpic">';
			html += replymsg;
			html += '<div class="fromname">' + name + "</div>";
			html += '<p class="msg">' + v.message + "</p>";
			if (v.message != "" && v.attachment != "") {
				html += '<div class="spacer"></div>';
			}
			if (v.attachment != "") {
				html += '<div class="row ui-mediabox">';
				html += '<div class="col s6">';
				html +=
					'<a class="img-wrap" href="' +
					filename_url(v.attachment.name) +
					'" data-fancybox="images" data-caption="' +
					v.attachment.title +
					'">';
				html += '<img class="z-depth-1" style="width: 100%;" src="' + filename_url(v.attachment.name) + '">';
				html += "</a>";
				html += "</div>";
				html += "</div>";
			}
			html += "</div>";
			if (status != "") {
				html += '<span class="time tick"><i class="mdi ' + icon + '"></i></span>';
			}
			html += '<span class="time" title="' + v.disptime.full + '"><i class="mdi mdi-star"></i> ' + v.disptime.info + "</span>";
			html += "</li>";
			console_log(last_message);
		} // if message already present
	});

	var ret = [];
	ret["html"] = html;
	ret["last_message"] = last_message;
	ret["last_message_ts"] = last_message_ts;
	return ret;
}

function get_unread_messages() {
	var unread = "";
	if ($(".message.unread").length > 0) {
		//console_log("unread messages: "+$(".message.unread").length);

		$(".message.unread").each(function () {
			msgid = $(this).attr("data-id");
			unread += msgid + ",";
		});
		//console_log(unread);
	}
	return unread;
}

function update_status(unread_ids) {
	//console_log("update_status");

	if (unread_ids.length > 0) {
		//console_log("|||");
		$.each(unread_ids, function (i, v) {
			if (v.mark_read == "1") {
				$("#message-" + v.id)
					.removeClass("unread")
					.addClass("read");
				$("#message-" + v.id + " .tick i")
					.removeClass("mdi-check")
					.addClass("mdi-check-all primary-text");
			}
		});
	}
}

function scroll_down() {
	$("html, body").animate({ scrollTop: $(document).height() }, 10);

	$(window).load(function () {
		//console_log("scroll down");
		//console_log($(document).height());
		$("html, body").animate({ scrollTop: $(document).height() }, 10);
		//$("HTML, BODY").animate({ scrollBottom: 0 }, 400, 'swing');
	});
}

var timeoutId = 0;
var allow_scrollto = true;
$(document)
	.on("pointerdown", ".msg-bubble", function (e) {
		console_log("pointerdown");
		//$(".pagetitle+p").html("mousedown");
		var bubbleid = $(this).attr("id");
		var ele = $(".msg-bubble#" + bubbleid);
		if (ele.hasClass("selected")) {
			ele.removeClass("selected");
			chat_action_bar();
			allow_scrollto = false;
		} else {
			allow_scrollto = true;
			timeoutId = setTimeout(function () {
				select_bubble(bubbleid, ele);
			}, 400);
		}
	})
	.on("pointerup", ".msg-bubble", function (e) {
		//$(".pagetitle+p").html("mouseup");
		console_log("pointerup");
		clearTimeout(timeoutId);

		var bubbleid = $(this).attr("id");

		if ($("#" + bubbleid + " .replyinfo").length > 0) {
			if (!$(this).hasClass("selected") && allow_scrollto) {
				console_log("scroll to parent message");
				scrollto_parentmsg(bubbleid);
			}
		}
	});

function scrollto_parentmsg(bubbleid) {
	console_log("clicked: " + bubbleid);
	console_log("go to parent: " + $("#" + bubbleid + " .replyinfo").attr("id"));
	var reply_msg_id = $("#" + bubbleid + " .replyinfo").attr("id");
	//scrolltopos = $("#"+bubbleid).offset().top - 200;
	scrolltopos = $("#message-" + reply_msg_id).offset().top - 200;
	//console_log(scrolltopos);
	$("html, body").animate({
		"scrollTop": scrolltopos,
	});
	$(".msg-bubble.selected").removeClass("selected");
	$("#message-" + reply_msg_id).addClass("selected");
	chat_action_bar();
}

function select_bubble(bubbleid, ele) {
	//$(".pagetitle+p").html("select");
	console_log("select element");
	ele.addClass("selected");
	chat_action_bar();
}

function chat_action_bar() {
	let selected = $(".msg-bubble.selected");
	let count = $(".chat-bar .select-count");
	let reply = $(".chat-bar .msg-reply");
	let star = $(".chat-bar .msg-star");
	let unstar = $(".chat-bar .msg-unstar");
	let selectedstar = $(".msg-bubble.selected.star");
	let selectedunstar = $(".msg-bubble.selected.unstar");

	if (selected.length > 0) {
		$(".chat-bar").addClass("show");
		count.addClass("show").html(selected.length);
	} else {
		$(".chat-bar").removeClass("show");
		count.removeClass("show").html("");
	}

	if (selected.length == 1) {
		reply.addClass("show");
	} else {
		reply.removeClass("show");
	}

	if (selectedunstar.length > 0) {
		star.addClass("show");
		unstar.removeClass("show");
	} else if (selectedstar.length > 0 && selectedunstar.length == 0) {
		unstar.addClass("show");
		star.removeClass("show");
	}
}

$(document).on("click", ".chat-bar .msg-star", function (e) {
	chatToggleStar("star");
});

$(document).on("click", ".chat-bar .msg-unstar", function (e) {
	chatToggleStar("unstar");
});

function chatToggleStar(type) {
	let selected = $(".msg-bubble.selected");
	if (selected.length > 0) {
		let idsstr = selected_chat_ids();

		var form_data = new FormData();
		form_data.append("action", "bulk");
		form_data.append("type", type);
		form_data.append("ids", idsstr);
		form_data.append("user_id", user.id);
		form_data.append("index", "id");
		form_data.append("auth_user", user.id);
		form_data.append("auth_type", user.usertype);
		form_data.append("auth_token", user.token);

		$.ajax({
			type: "POST",
			url: REST_API_URL + "modules/chat/chat.php",
			data: form_data,
			processData: false,
			contentType: false,
			crossDomain: true,
			cache: false,
			beforeSend: function () {
				//$("#response").html('<p class="pad-15">Connecting...</p>');
			},
			success: function (response) {
				console_log(response);
				let data = JSON.parse(response);
				check_user_token(data);

				if (data.success == true) {
					var notifymsg = data.msg;
					notify(notifymsg);

					var field = "user-" + user.id + "-star-";
					if (type == "star") {
						field += "1";
					} else if (type == "unstar") {
						field += "0";
					}
					if (data.feature[field] != undefined && data.feature[field].length > 0) {
						$.each(data.feature[field], function (si, sv) {
							console_log(sv);
							var msgele = $(".msg-bubble#message-" + sv);
							if (type == "star") {
								msgele.addClass("star").removeClass("unstar");
							} else if (type == "unstar") {
								msgele.removeClass("star").addClass("unstar");
							}
							$(".msg-bubble.selected").removeClass("selected");
							chat_action_bar();
						});
					}
				}
			},
			error: errorHandling,
		});
	}
}
//

function selected_chat_ids() {
	let idsstr = "";
	$(".msg-bubble.selected").each(function () {
		var id = $(this).attr("data-id");
		idsstr += id + ",";
	});
	console_log(idsstr);
	return idsstr;
}

$(document).on("click", ".chat-bar .msg-reply", function (e) {
	let selected = $(".msg-bubble.selected");
	let reply_area = ".chat-form .reply-area";

	if (selected.length == 1) {
		let id = selected.attr("id");
		let replyid = selected.attr("data-id");
		let bubble = $("#" + id + " .msg-area");

		$(reply_area + " .bubble-wrap").html("");
		bubble.clone().prependTo(reply_area + " .bubble-wrap");
		$(reply_area).addClass("show");
		$(".msg-bubble.selected").removeClass("selected");
		$(reply_area).attr("data-id", replyid);
		chat_action_bar();
	}
});

function empty_reply() {
	let reply_area = ".chat-form .reply-area";
	$(reply_area + " .bubble-wrap").html("");
	$(reply_area).attr("data-id", "");
	$(reply_area).removeClass("show");
}

$(document).on("click", ".reply-area .delete-reply", function (e) {
	empty_reply();
});
