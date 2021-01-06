if (!APP_CSS_VARIABLES) {
	cssfile = "style";
	//console_log(localStorage.getItem("theme"));
	if (localStorage["theme"] != "deep-purple" && localStorage["theme"] != "" && localStorage["theme"] != undefined) {
		cssfile = "style-" + localStorage["theme"] + "";
		//console_log(cssfile);
	}
	$("link#main-style").attr("href", "assets/css/" + cssfile + ".css");
}

// for (var key in defaultval) {
// 	if (defaultval.hasOwnProperty(key)) {
// 		//console_log(key + " : " + defaultval[key]);
// 		localStorage[key] = "";
// 	}
// }
