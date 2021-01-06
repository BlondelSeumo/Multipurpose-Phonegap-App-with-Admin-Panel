
var allMonths, dayArray = [], click = 0, dotw = [/Sun/gi,/Mon/gi,/Tue/gi,/Wed/gi, /Thu/gi,/Fri/gi,/Sat/gi];
function getAllDays(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    var dayToPush = new Date(date);
    days.push(dayToPush);
    date.setDate(date.getDate() + 1);
  }
  //console_log(month);
  return days;
}

function getUTCDate(){
  var d = new Date();
  var curDay = d.getUTCDate();
  return curYear;
}
function getYear(){
  var getyr = $("#months-cont").attr("data-year");
  if(getyr == ""){
    var d = new Date();
    var curYear = d.getFullYear();
    $("#months-cont").attr("data-year",curYear);
    return curYear;
  } else {
    return getyr;
  }
}
function changeYear(operator){
  var getyr = $("#months-cont").attr("data-year");
  if(operator == "+"){
    getyr++;
  } else {
    getyr--;
  }
  $("#months-cont").attr("data-year",getyr);

  $(".month").each(function(){
    mname = $(this).attr("data-month");
    $(this).html(mname+" "+getyr);
  });
}



function getCurrMonth(){
  var d = new Date();
  var curMonth = d.getMonth();
  return curMonth;
}
var month_name = function(query){
mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  return mlist[query];
};
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var todaydt = dd+"-"+mm+"-"+yyyy;
//if(dd < 10){ todaydt = "0"+todaydt;}
function addElements (query, id){
  //for onload, use activeIndex+1 as query value
  document.getElementById(id).innerHTML = '';
  var curYear = getYear();
  var allDays = getAllDays((query), getYear());
    for(var i = 0; i<allDays.length; i++){
      allDays[i] = allDays[i].toString();
    }
  var stopNow = false, counter = 0;
  for(var i = 0; i<dotw.length; i++){
    if(allDays[0].match(dotw[i])){
      stopNow = true;
    } else {
      if (!stopNow) {
        counter += 1;
      }
    }
  }
  for(var i=0; i<counter; i++){
    allDays.unshift(" ");
  }
  for(var i=0; i<allDays.length; i++){
    var singleDay = document.createElement('div');

      singleDay.className = 'day';
      singleDay.dataset.location = '';

      //Parse Day
    if(allDays[i]!==" "){
      console_log(allDays[i]);
      var spl = allDays[i].split(' ');
      var dayOTW = spl[2];
      singleDay.dataset.day = spl[0];
      /*if(dayOTW.charAt(0)==="0"){
        //allDays[i]=dayOTW.replace(/0/gi, '');
        allDays[i] = dayOTW;
      } else {
        allDays[i] = dayOTW;
      }*/
        allDays[i] = dayOTW;
      var caldt = allDays[i]+"-"+(query+1)+"-"+curYear;
      //if(allDays[i] < 10){ allDays[i] = "0"+allDays[i];}
      singleDay.dataset.title = allDays[i]+' '+month_name(query)+' '+curYear;
      if(todaydt == caldt){singleDay.className = 'day today';}

    } else{
      singleDay.className = 'day blank';
    }
    singleDay.innerHTML = allDays[i];  document.getElementById(id).appendChild(singleDay);
  }
  var allOfDays = document.querySelectorAll('#days .day');
var dayArray = [];
  for(var i = 0; i< allOfDays.length; i++){
      if(i === 6 || i === 13 || i === 20 || i === 27 || i === 34){
        // dayArray.push(i);
        // console_log(allOfDays[i]);
        allOfDays[i].outerHTML += '<div class="day-details"><div id="input-arrow"></div><div class="input"></div></div>'
      }
    }  
  //document.getElementById(id).innerHTML += '<div class="day-details"><div id="input-arrow"></div><div class="input"></div><div style="clear:both"></div>';
  console_log("query: "+query);
  load_month_events(query);

}
/*function whichChild(elem){
    var  i= 0;
    while((elem=elem.previousSibling)!=null) ++i;
    return i;
}*/

window.onload = function(){

}

$(document).ready(function(){

      //console_log( "ready!" );
      allMonths = document.querySelectorAll('.month');
      var monthCont = document.getElementById('months');
      for(var i=0; i<allMonths.length; i++){
        allMonths[i].innerHTML += ' ' + getYear();
      }
      var currmnth = getCurrMonth();
      //console_log(allMonths);
      console_log(currmnth);
      addElements(currmnth, 'days');
      allMonths[currmnth].className += ' active';
      var calWidth = $("#months .month.active").width();
      document.querySelector('#months .month:first-child').style.marginLeft = -(calWidth * (currmnth))+'px';
});

$(".arrowMt").unbind("click").click(function(e){
        if($("#calendar").length === 1){
          var currentActive = document.querySelector('#months .month.active');
          var calWidth = $("#months .month.active").width(); //Number(getComputedStyle(currentActive).width.replace(/px/gi,''));
          var activeIndex = 0;
          for(var i=0; i<allMonths.length; i++){
            if(allMonths[i].innerHTML === currentActive.innerHTML){
              activeIndex = i;
            }
          }
          if(e.target.id==='nextMt'){
                if(activeIndex<11) {
                console_log("+"+activeIndex+" "+calWidth);
                document.querySelector('#months .month:first-child').style.marginLeft = -(calWidth * (activeIndex+1))+'px';
                currentActive.className = 'month';
                allMonths[activeIndex+1].className += ' active';
                addElements((activeIndex+1), 'days');
                } else {
                // increment year                
                changeYear("+");
                console_log("-"+activeIndex+" "+calWidth);
                document.querySelector('#months .month:first-child').style.marginLeft = '0px';
                currentActive.className = 'month';
                allMonths[0].className += ' active';
                  addElements(0, 'days');
                }
          } else if(e.target.id==='lastMt'){
            if(activeIndex>0) {
                document.querySelector('#months .month:first-child').style.marginLeft = -(calWidth * (activeIndex-1))+'px';
                currentActive.className = 'month';
                allMonths[activeIndex-1].className += ' active';
                addElements((activeIndex-1), 'days');
            } else {
                changeYear("-");
                document.querySelector('#months .month:first-child').style.marginLeft = -(calWidth * 11) + 'px';
                currentActive.className = 'month';
                allMonths[11].className += ' active';
                addElements(11, 'days');
            }
        }
    } // if #calendar present

});


$(document).on( 'click', '#days .day', function (e){
                var dmy = e.currentTarget.dataset.title;
                if(dmy != ""){
                  load_events("response","day","","","",dmy);
                  $("#days .day").removeClass("loaded");
                  $(this).addClass("loaded");
                }
});

function load_month_events(mnthNum){
  console_log("load month: "+mnthNum);
  load_events("response","month",mnthNum,"",getYear());
}