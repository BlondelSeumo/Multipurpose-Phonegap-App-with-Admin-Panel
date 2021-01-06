function index_start_buttons(callback) {
  console_log('----------||--------')
  console_log(isUserAuthenticated())
  console_log(getUser())
  console_log(isAuthExpired())
  console_log('----------||--------')

  let str = ''
  if (!isUserAuthenticated() || isAuthExpired()) {
    str +=
      '<a href="ui-pages-login.html" class="waves-light btn-large bg-primary">Login</a>'
    str +=
      '<a href="ui-pages-register.html" class="waves-light btn-large bg-primary">Register</a>'
  } else {
    str +=
      '<a href="ui-app-dashboard.html" class="waves-light btn-large bg-primary">Go to Dashboard</a>'
  }

  $('.index-start').html(str)
  callback()
}

function user_login_success(data) {
  authenticateUser(data.user)
  var user = getUser()
  var notifymsg = 'Welcome ' + user.name + '! You have logged in successfully!'
  notifyUser(notifymsg)

  var url_string = window.location.href
  var url = new URL(url_string)
  var redirect = url.searchParams.get('url')
  //$("h5").append(" "+page);
  if (redirect != null && redirect.trim() != '') {
    //$("h5").append(" Redirect to: "+redirect);
    var redirectto = redirect
  } else {
    //console_log("redirect to home");
    var redirectto = 'ui-app-dashboard.html'
  }
  //alert(redirectto);
  setTimeout(function () {
    window.location.href = redirectto
  }, 10)
}

function notify_to_login() {
  let user = getUser()
  if (user.id == '' || user.id == null) {
    let notifymsg =
      "<a href='ui-pages-login.html'>Please Log in to access all features of this app.</a>"
    notify(notifymsg)
  }
}

function show_demo_login_info() {
  if (!APP_DEMO_ACCOUNT_RESTRICTIONS) {
    $('.demo-login').hide()
  }
}

function show_demo_lockscreen_info() {
  let user = getUser()
  if (user.account_type == 'demo' && APP_DEMO_ACCOUNT_RESTRICTIONS) {
    $('.demo-lockscreen').show()
  }
}
