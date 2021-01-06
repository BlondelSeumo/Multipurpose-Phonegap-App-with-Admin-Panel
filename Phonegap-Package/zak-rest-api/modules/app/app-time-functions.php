<?php


function displayTime($ts,$offset,$type = ""){

	$ret = array();
	$ret["full"] = "";
	$ret["info"] = "";
	$ret["time"] = "";
	$ret["date"] = "";
	$ret["daydate"] = "";
	$ret["tsdate"] = "";
	$ret["todaydate"] = "";
	$ret["dmystr"] = "";
	$ret["display"] = "";
	$ret["dmy"] = "";

	if($ts != ""){
		$now = time();
		$nowts = $now - ($offset * 60);
		$dispts = $ts - ($offset * 60);

		$tsdate = date("Y-m-d",$dispts);
		$nowdate = date("Y-m-d",$nowts);
		$dmy = date("d/m/Y",$dispts);

		$full = date("D, M d Y, h:i a",$dispts);
		$daydate = date("D, M d Y",$dispts);
		$info = date("M d, h:i a",$dispts);
		$time = date("h:i a",$dispts);
		$date = date("M d",$dispts);
		$dmystr = date("d F Y",$dispts);
		$display = $date;
		if($tsdate == $nowdate){
			$display = $time;
		}

		$ret["full"] = $full;
		$ret["info"] = $info;
		$ret["time"] = $time;
		$ret["date"] = $date;
		$ret["daydate"] = $daydate;
		$ret["tsdate"] = $tsdate;
		$ret["todaydate"] = $nowdate;
		$ret["dmy"] = $dmy;
		$ret["dmystr"] = $dmystr;

		$ret["display"] = $display;
	}
	
	return $ret;
	//return date("Y-m-d H:i:s",$dispts);

}

// datestring_to_timestamp()
// Converts Sat Apr 29 1989 00:00:00 GMT+0530 to utc timestamp
function datestring_to_timestamp($date,$ignoretime = ""){

	$exp = explode(" ", $date);
	$month = $exp[1];
	//echo $date."<br/>";

	$m = date('m', strtotime($month . '01'));
	$d = $exp[2];
	$y = $exp[3];

	if($ignoretime == "ignoretime"){
		$his = "00:00:00";
		$h = "00";
		$i = "00";
		$s = "00";
		$timeOffset = 0;
	} else {
		$his = $exp[4];
		$texp = explode(":", $his); 
		$h = $texp[0];
		$i = $texp[1];
		$s = $texp[2];
		$gmt = $exp[5];
		$dateTimeZone = new DateTimeZone($gmt);
		$dateTime = new DateTime("now", $dateTimeZone);
		$timeOffset = $dateTimeZone->getOffset($dateTime); //19800
	}


	//echo $d."/".$m."/".$y." ".$h.":".$i.":".$s."(".$timeOffset.")";
	//echo "<br/>";
	$ts = mktime($h, $i, $s, $m, $d, $y) - $timeOffset; // subtract offset
	//echo $ts."<br/>";
	//echo date("D M d Y h:i:s a",$ts);
	return $ts;

}

function dmy_to_timestamp($date,$offset){

	$exp = explode("/", $date);
	$d = $exp[0];
	$m = $exp[1];
	$y = $exp[2];
	$h = "00";
	$i = "00";
	$s = "00";

	// since d/m/y format has no timezone specified, offset is 0;
	$timeOffset = 0; //-($offset * 60); // offset is -330, so add 19800 in $ts

	$ts = mktime($h, $i, $s, $m, $d, $y) + $timeOffset;
	//echo date("D M d Y h:i:s a",$ts);
	return $ts;
}

function dmyhis_to_timestamp($date,$offset){

	$exp = explode(" ", $date);

	$expd = explode("/", $exp[0]);
	$d = $expd[0];
	$m = $expd[1];
	$y = $expd[2];

	$expt = explode(":", $exp[1]);
	$h = $expt[0];
	$i = $expt[1];
	$s = $expt[2];

	$timeOffset = ($offset * 60); // offset is -330, so substract 19800 in $ts

	$ts = mktime($h, $i, $s, $m, $d, $y) + $timeOffset;
	return $ts;

}

function timestamp_to_datestring($ts,$offset,$ignoretime = "",$format = ""){

	if($ts == "") {return ""; }

	$tzoffset = -($offset * 60); //convert offset

	if($ignoretime == "ignoretime"){
		$tzoffset = 0;
	}

	$dispts = $ts + $tzoffset; // offset is -330 // add offset.
	if($format == "dmy"){
		$dmy = date("d F Y",$dispts);
		return $dmy;
	} else{
		//return format Tue Oct 26 1999 00:00:00 am
		$full = date("D M d Y h:i:s a",$dispts);	
		//echo $full;
		return $full;
	}
}
function timestamp_to_dmy($ts,$offset,$format = ""){

	if($ts == "") {return ""; }

	// since d/m/y format has no timezone specified, offset is 0;
	$dispts = $ts; // + ($offset * 60); // offset is -330
	$full = date("d/m/Y",$dispts);	
	//echo date("D M d Y h:i:s a",$dispts);;
	return $full;
}

function concat_to_timestamp($date,$time,$offset){

	$expd = explode("/", $date);
	$d = $expd[0];
	$m = $expd[1];
	$y = $expd[2];

	$exp = explode(" ", $time);

	$expt = explode(":", $exp[0]);
	$h = $expt[0];
	$i = $expt[1];
	$s = "00";

	if($exp[1] == "PM"){
		$h = $h + 12;
	}
	//echo $d."/".$m."/".$y." ".$h.":".$i.":".$s." ".$offset." <br/> ";
	$timeOffset = ($offset * 60); // offset is -330, so substract 19800 in $ts

	$ts = mktime($h, $i, $s, $m, $d, $y) + $timeOffset;
	//echo $ts." ";
	return $ts;
}
function timestamp_to_time($ts,$offset,$format = ""){

	if($ts == "") {return ""; }

	$dispts = $ts - ($offset * 60); // offset is -330
	$full = date("h:i A",$dispts);	
	//echo date("D M d Y h:i:s a",$dispts);;
	return $full;
}

?>