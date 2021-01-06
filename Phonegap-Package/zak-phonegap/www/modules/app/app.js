$(document).ready(function () {
  //console_log(defaultval.theme);

  generate_app_guest_token(function () {
    window.location.reload()
  })
  load_include_files(defaultval)
  app_dimensions()

  /***************** Load Include Files ******************/

  function load_include_files(defaultval) {
    //console_log("load files");
    // load header-topbar
    var user = getUser()

    if ($('#header-topbar').length) {
      $('#header-topbar').load('../includes/header-topbar.html', function () {
        app_header_branding(function () {
          pull_to_refresh_init()
          check_notifications()
          usertype_body_class()
        })
      })
    }

    let left_nav = ''
    if (user.usertype == 'admin') {
      left_nav = APP_NAVIGATION_ADMIN
    } else if (user.usertype == 'user') {
      left_nav = APP_NAVIGATION_USER
    } else {
      left_nav = APP_NAVIGATION_DEFAULT
    }
    if ($('#slide-nav').length && left_nav != '') {
      $('#slide-nav').load(left_nav, function () {
        navigation_user_info(user)
      })
    }

    if ($('#slide-settings').length) {
      $('#slide-settings').load(
        '../includes/right-navigation.html',
        function () {},
      )
    }

    if ($('#page-footer').length) {
      $('#page-footer').load('../includes/page-footer.html', function () {})
    }

    if ($('#footer-menu').length) {
      $('#footer-menu').load('../includes/footer-menu.html', function () {})
    }

    $(window).load(function () {
      // initiate sidenav after loading navigation
      initiate_sidenav()
      // Set site global values for settings panel
      global_settings(defaultval)

      // notify message at bottom of app, after app loads.
      notifyUser()

      // Notifications count in top bar

      app_loaded()
      //app_header_branding(function(){});
    })
  }

  function check_notifications() {
    if ($('nav .nav-notifications').length) {
      let user = getUser()

      console_log('check for notifications count')
      console_log(user.id)

      let authentic = isUserAuthenticated()
      let expired = isAuthExpired()

      if (user.id != null && user.id != '' && authentic && !expired) {
        var form_data = new FormData()
        form_data.append('user_id', user.id)
        form_data.append('action', 'fetch-count')
        form_data.append('auth_user', user.id)
        form_data.append('auth_type', user.usertype)
        form_data.append('auth_token', user.token)
        $.ajax({
          type: 'POST',
          url: REST_API_URL + 'modules/notification/notification.php',
          data: form_data,
          processData: false,
          contentType: false,
          crossDomain: true,
          cache: false,
          beforeSend: function () {
            console_log('checking for notifications')
          },
          success: function (response) {
            console_log(response)
            let data = JSON.parse(response)
            check_user_token(data)

            if (data.success == true) {
              var noti_count = $('.badge.notification-count')
              if (data.count > 0) {
                noti_count.html(data.count)
                noti_count.removeClass('count-0')
                noti_count.addClass('count-' + data.count)
              } else {
                noti_count.addClass('count-0')
                noti_count.html('')
                noti_count.hide()
              }
            }
          },
          error: errorHandling,
        })
      } // end check user id
    }
  }

  function usertype_body_class() {
    let user = getUser()
    let authentic = isUserAuthenticated()
    let expired = isAuthExpired()

    if (user.id != null && user.id != '' && authentic && !expired) {
      $('body').addClass('isUser')
    } else {
      $('body').addClass('isGuest')
    }
  }

  function initiate_sidenav() {
    //console_log("load completed");

    // load sidemenu
    if ($('.sidemenu').length) {
      $('.sidemenu').sidenav({
        onOpenStart: function () {
          $('.sidesettings').sidenav('close')
          //console_log("onopen");
        },
      })

      const ps1 = new PerfectScrollbar('.sidemenu', {
        suppressScrollX: true,
      })
    }

    // load sitesettings
    if ($('.sidesettings').length) {
      $('.sidesettings').sidenav({
        onOpenStart: function () {
          $('.sidemenu').sidenav('close')
          //console_log("onopen");
        },
        edge: 'right',
      })

      const ps2 = new PerfectScrollbar('.sidesettings', {
        suppressScrollX: true,
      })
    }
  }

  function global_settings(defaultval) {
    // Set default values in localstorage if no value is set yet
    for (var key in defaultval) {
      if (defaultval.hasOwnProperty(key)) {
        //console_log(key + " : " + defaultval[key]);
        if (localStorage.getItem(key) == '') {
          //console_log("set now: ");
          localStorage[key] = defaultval[key]
        }
      }
      //console_log(key+": "+localStorage[key]);

      // Set body tag attributes based on localstorage
      // Also Set Settings checked values based on localstorage
      if (localStorage.getItem(key) != '') {
        $('body').attr('data-' + key, localStorage[key])
        $(".appsettings[data-type='" + key + "']").removeClass('active')
        $(
          ".appsettings[data-type='" +
            key +
            "'][data-value='" +
            localStorage[key] +
            "']",
        ).addClass('active')
      }
    }

    /*console_log(localStorage.site_mode);
        type = "site_mode";
        value = localStorage.site_mode;
        $("body").attr('data-'+type,value);*/

    /*// loop and active mark default values
        for (var key in defaultval) {
          if(defaultval.hasOwnProperty(key)){
            //console_log(key + " : " + defaultval[key]);
            //$(".appsettings[data-type='"+key+"'][data-value='"+defaultval[key]+"']").addClass("active");
          }
        }*/
  }

  // on click any link apply settings
  $(document).on('click', '.appsettings', function (e) {
    e.preventDefault()

    var type = $(this).attr('data-type')
    var value = $(this).attr('data-value')

    //console_log(type+value);

    $(".appsettings[data-type='" + type + "']").removeClass('active')
    $(
      ".appsettings[data-type='" + type + "'][data-value='" + value + "']",
    ).addClass('active')

    if (!APP_CSS_VARIABLES) {
      if (type == 'theme') {
        if (value != '' && value != defaultval[type]) {
          $('link#main-style').attr(
            'href',
            'assets/css/style-' + value + '.css',
          )
        } else {
          $('link#main-style').attr('href', 'assets/css/style.css')
        }
        //console_log(type+value);
        localStorage[type] = value
      }
    }

    // site mode related settings here.
    if (type == 'site_mode') {
      if (value == 'dark') {
        var set_sitemode = {
          header: 'dark',
          menu: 'dark',
          footer: 'dark',
          footer_menu_style: 'dark',
        }
        site_mode_settings(set_sitemode)
      } else if (value == 'light') {
        var set_sitemode = {
          header: 'light',
          menu: 'light',
          footer: 'light',
          footer_menu_style: 'light',
        }
        site_mode_settings(set_sitemode)
      }
    }

    var attr = 'data-' + type + ''
    $('body').attr(attr, value)
    //console_log(type+value);
    localStorage[type] = value
  })

  // on click any link apply settings
  $(document).on('click', '.nav-site-mode', function (e) {
    e.preventDefault()
    var active = $(".appsettings[data-type='site_mode'].active")
    var mode = active.attr('data-value')
    if (mode == 'light') {
      //console_log("set dark");
      var set_sitemode = {
        header: 'dark',
        menu: 'dark',
        footer: 'dark',
        footer_menu_style: 'dark',
        site_mode: 'dark',
      }
      site_mode_settings(set_sitemode)
    } else {
      //console_log("set light");
      var set_sitemode = {
        header: 'light',
        menu: 'light',
        footer: 'light',
        footer_menu_style: 'light',
        site_mode: 'light',
      }
      site_mode_settings(set_sitemode)
    }
  })

  function site_mode_settings(obj) {
    $.each(obj, function (type, value) {
      //console_log( type + ": " + value );
      $(".appsettings[data-type='" + type + "']").removeClass('active')
      $(
        ".appsettings[data-type='" + type + "'][data-value='" + value + "']",
      ).addClass('active')
      $('body').attr('data-' + type, value)
      localStorage[type] = value
    })
  }
})

function generate_app_guest_token(callback) {
  //deauthenticateGuest();
  // if there is no token, generate guest token.
  let token = getToken()
  console_log('app_token:' + token)
  if (token == null || token == '') {
    let user = getUser()
    if (user.id == null || user.id == '') {
      var form_data = new FormData()
      form_data.append('action', 'app-guest')
      $.ajax({
        type: 'POST',
        url: REST_API_URL + 'modules/web-token/web-token.php',
        data: form_data,
        processData: false,
        contentType: false,
        crossDomain: true,
        cache: false,
        beforeSend: function () {
          //console_log("checking for notifications");
        },
        success: function (response) {
          console_log(response)
          let data = JSON.parse(response)
          if (data.guest_token != undefined) {
            authenticateGuest(data.guest_token)

            var path = window.location.pathname
            var page = path.split('/').pop()
            var page = page.replace('.php', '.html')
            if (page != 'ui-pages-logout.html') {
              callback()
            }
          }
          //check_user_token(data);
        },
        error: errorHandling,
      })
    } // end user.id check
  } else {
    console_log('Token already present')
  }
}

// NotifyUser on next page load, after any particular action
function notifyUser(msg = '') {
  if (msg != '') {
    localStorage.setItem('notification', msg)
  } else if (localStorage.getItem('notification') !== null) {
    M.toast({
      html: localStorage.getItem('notification'),
      classes: 'primary-bg white-text',
      displayLength: 6500,
    })
    localStorage.removeItem('notification')
  }
}

function errorHandling(XMLHttpRequest, textStatus, errorThrown) {
  let msg = ''
  if (XMLHttpRequest.readyState == 4) {
    // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
    //console_log(XMLHttpRequest); console_log(textStatus); console_log(errorThrown);
    msg =
      'Could Not Connect (' +
      XMLHttpRequest.statusText +
      ': ' +
      XMLHttpRequest.statusText +
      '). Please contact administrator.'
    //$("#response").html(msg);
    notify(msg)
  } else if (XMLHttpRequest.readyState == 0) {
    // Network error (i.e. connection refused, access denied due to CORS, etc.)
    //console_log(XMLHttpRequest); console_log(textStatus); console_log(errorThrown);
    //$("#response").html(msg);
    msg =
      'Network Error (' +
      XMLHttpRequest.statusText +
      ': ' +
      XMLHttpRequest.statusText +
      '). Please check your internet connection. If issue persists, please contact administrator.'
    notify(msg)
  } else {
    // something weird is happening
    //console_log(XMLHttpRequest); console_log(textStatus); console_log(errorThrown);
    msg =
      'Error (' +
      XMLHttpRequest.statusText +
      ': ' +
      XMLHttpRequest.statusText +
      '). Please contact administrator.'
    //$("#response").html(msg);
    notify(msg)
  }
}

$(document).ready(function () {
  $(document).on('click', '.back-button', function (e) {
    e.preventDefault()
    $('.sidemenu').sidenav('close')
    $('.sidesettings').sidenav('close')
    window.history.back()
  })

  $(document).on('click', '.menu-close', function (e) {
    $('.sidemenu').sidenav('close')
  })
})

/********************Equal Height*******************/

$(window).load(function () {
  // Select and loop the container element of the elements you want to equalise
  $('.equal-height').each(function () {
    // Cache the highest
    var highestBox = 0

    // Select and loop the elements you want to equalise
    $('.col', this).each(function () {
      // If this box is higher than the cached highest then store it
      if ($(this).height() > highestBox) {
        highestBox = $(this).height()
      }
    })

    // Set the height of all those children to whichever was highest
    $('.col', this).height(highestBox)
  })
})

function fixNavbar() {
  var $totop = $('.backtotop'),
    $tobottom = $('.backtobottom'),
    $nav = $('nav.fixedtop'),
    totop = 200,
    tobottom = 200,
    offset = 0,
    logoHeight = 56,
    //distance   = offset + logoHeight,
    distance = 0,
    scroll = $(window).scrollTop()

  // if (scroll >= distance) {
  // 	$nav.css({
  // 		position: "fixed",
  // 		top: "0",
  // 		right: "0",
  // 		left: "0",
  // 	});
  // 	$("body").addClass("fixedtopbar");
  // } else {
  // 	$nav.css({
  // 		position: "relative",
  // 		top: "auto",
  // 		right: "auto",
  // 		left: "auto",
  // 	});
  // 	$("body").removeClass("fixedtopbar");
  // }

  if (scroll >= totop) {
    $totop.css({
      display: 'inline-block',
    })
    $tobottom.css({
      display: 'none',
    })
  } else {
    $totop.css({
      display: 'none',
    })
    $tobottom.css({
      display: 'inline-block',
    })
  }
}
var lastScrollTop = 0
function scrolling_direction() {
  let st = $(this).scrollTop()
  if (st > lastScrollTop) {
    console_log('down')
  } else if (st == lastScrollTop) {
    //do nothing
    //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
  } else {
    console_log('up')
  }
  lastScrollTop = st
}

$(document).ready(function () {
  $(document).on('click', '.backtotop', function (e) {
    $('HTML, BODY').animate({ scrollTop: 0 }, 400, 'swing')
  })
  $(document).on('click', '.backtobottom', function (e) {
    $('HTML, BODY').animate({ scrollTop: $(document).height() }, 400, 'swing')
  })
})

$(window).scroll(function () {
  fixNavbar()
  //scrolling_direction();
})
$(window).resize(function () {
  app_dimensions()
})

function app_loaded() {
  console_log('### app_loaded called')
  //document.addEventListener("DOMContentLoaded", function(){
  $('.preloader-background').delay(10).fadeOut('slow')
  //});
}
function ajax_loading() {
  console_log('### ajax_loading called')
  $('.ajaxloader-background').delay(10).fadeIn('fast')
}
function ajax_loaded() {
  console_log('### ajax_loaded called')
  $('.ajaxloader-background').delay(10).fadeOut('slow')
}

function app_dimensions() {
  let appheight = $(window).height() - 60
  if (!$('body').hasClass('isfullscreen')) {
    $('body').height(appheight)
    console_log('appheight set to:' + appheight)
  }
  $('body.loginpage').height(appheight - 60)
}

function navigation_user_info(user) {
  let dispimg = $('.user-wrap .imgarea img')
  let dispname = $('.user-wrap .infoarea .name a')
  if (dispimg.length) {
    if (user.image != null && user.image != undefined) {
      dispimg.attr('src', filename_url(user.image))
    }
  }
  if (dispname.length) {
    if (user.name != null && user.name != undefined) {
      dispname.html(user.name)
    }
  }
}

$(document).on('click', '.eye-icon', function (e) {
  let passele = $(this).parent().find('input')
  let currtype = passele.attr('type')
  console_log(currtype)
  if (currtype == 'password') {
    passele.attr('type', 'text')
  } else {
    passele.attr('type', 'password')
  }
})

function check_user_token(res) {
  let user_token = ''
  console_log('check_user_token')
  console_log(res)
  console_log('user_token:' + res.user_token)
  let user = getUser()

  if (res.user_token != undefined && res.user_token != '') {
    user_token = res.user_token
    console_log(user_token)
    let path = window.location.pathname
    let page = path.split('/').pop()

    if (user_token == 'invalid-token' || user_token == 'invalid-user') {
      deauthenticateUser()
      notifymsg = 'Please login to continue using this app.'
      notifyUser(notifymsg)
      if (page == 'ui-pages-login.html') {
        page = ''
      }
      window.location.href = 'ui-pages-login.html?url=' + page
    } else if (user_token == 'invalid-guest') {
      // let the request be invalid everytime.
    } else if (user_token == 'expired' && (user.id == null || user.id == '')) {
      // guest user expired
      console_log('guest token expired - regenerate')
      deauthenticateUser()
      generate_app_guest_token(function () {
        console_log('window reload')
        setTimeout(function () {
          window.location.href = window.location.href
        }, 10)
      })
    } else if (user_token == 'expired') {
      notifymsg = 'Please re-enter your password to continue using this app.'
      notifyUser(notifymsg)
      if (page == 'ui-pages-lockscreen.html') {
        page = ''
      }
      window.location.href = 'ui-pages-lockscreen.html?url=' + page
    }
  }
}

function delete_item(
  e,
  module,
  id,
  module_name = '',
  module_file = '',
  trash = '',
) {
  var checkmode = check_app_mode(e)
  if (!checkmode['allow']) {
    notify(checkmode['msg'])
  } else {
    if (module_file == '') {
      module_file = module
    }

    let user = getUser()

    var form_data = new FormData()
    form_data.append('id', id)
    form_data.append('action', 'delete')
    form_data.append('trash', trash)
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)
    form_data.append('module', module)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/' + module + '/' + module_file + '.php',
      data: form_data,
      processData: false,
      contentType: false,
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        ajax_loading()
        //$("#response").html('<p class="pad-15">Connecting...</p>');
      },
      success: function (response) {
        ajax_loaded()
        console_log(response)
        var html = ''
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.success === true) {
          html = data.msg
          $('#item-' + id).hide()
          M.toast({
            html: module_name + ' deleted successfully',
            classes: 'primary-bg white-text',
            displayLength: 6500,
          })
        } else {
          M.toast({
            html: data.msg,
            classes: 'primary-bg white-text',
            displayLength: 6500,
          })
        }
      },
      error: errorHandling,
    })
  } // end check mode
}

function notify(instantmsg) {
  //  console_log(instantmsg)
  M.toast({
    html: instantmsg,
    classes: 'primary-bg white-text',
    displayLength: 6500,
  })
}

function getUserTimeZone() {
  let tzoffset = new Date().getTimezoneOffset()
  return tzoffset
}

function escape_str(str) {
  var newstr = str.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
    return '&#' + i.charCodeAt(0) + ';'
  })
  return newstr
}

function get_display_filename(obj, type = 'small') {
  let name = obj.name
  let thumb = ''
  let small = ''
  if (obj.thumb != undefined) {
    thumb = obj.thumb
  }
  if (obj.small != undefined) {
    small = obj.small
  }

  let filename = small
  if (type == 'name') {
    filename = name
  }
  if (type == 'thumb') {
    filename = thumb
  }
  if (filename == '') {
    if (type == 'thumb' && small != '') {
      filename = small
    } else if (type == 'small' && thumb != '') {
      filename = thumb
    } else if (name != '') {
      filename = name
    }
  }
  //console_log(obj.name+" thumb:"+thumb+" small:"+small+" filename:"+filename);

  return filename
}

function filename_url(file) {
  if (file.indexOf('://') !== -1) {
    return file
  } else {
    return REST_API_URL + file
  }
}

function check_app_mode(event, msg = '') {
  console_log(event)
  let ret = []
  ret['allow'] = true
  ret['msg'] = ''
  let user = getUser()

  /*------------------------------------------------------------
   Comment/Uncomment these lines to enable/disable demo mode
  ------------------------------------------------------------*/
  /*********Start Demo Mode**********/
  if (APP_DEMO_ACCOUNT_RESTRICTIONS == true && user.account_type == 'demo') {
    // if (event.length > 0) {
    //  console_log('event obj')
    event.preventDefault()
    //}
    if (msg === '') {
      msg =
        '<a href="ui-pages-logout.html?url=ui-pages-login.html">You cannot update data in this demo account. For full access, please register as new user.</a>'
    }
    ret['allow'] = false
    ret['msg'] = msg
  }
  /*********End Demo Mode**********/

  return ret
}

function masonry_after_loading_images(selector) {
  console_log('waiting for images to load')
  Promise.all(
    Array.from(document.querySelectorAll(selector + ' img'))
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.onload = img.onerror = resolve
          }),
      ),
  ).then(() => {
    console_log('images finished loading')
    if ($(selector).length) {
      $(selector).masonry({
        itemSelector: '.col',
      })
    }
  })
}

//
function pull_to_refresh_init() {
  $('.scroll,.pull-to-refresh')
    .pullToRefresh({
      refresh: 200,
    })
    .on('refresh.pulltorefresh', function () {
      $('.reloading').fadeIn()
      setTimeout(function () {
        location.reload()
      }, 500)
    })
}
