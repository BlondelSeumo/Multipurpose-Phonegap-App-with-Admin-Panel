//document.addEventListener('deviceready', function () {
//logout_oauth(function () {
var user = getUser()

var pathorigin = window.location.origin
console_log('pathorigin')
console_log(pathorigin)
if (pathorigin.indexOf('localhost') !== -1) {
  deauthenticateUser()
} else {
  let provider = user.provider
  setTimeout(function () {
    //alert("logout");
    console_log('provider' + provider)
    if (provider == 'google-pg') {
      googlepgLogoutonly()
    }
    deauthenticateUser()
  }, 1000)
}

var msg = ''
if (user.name != null) {
  msg = 'Hello ' + user.name + '!<br/><br/>'
} else {
  msg = 'Hello,<br/><br/>'
}
msg +=
  'Thank You for using our App.<br/>You have logged out successfully now.<br/>'
msg += 'You will be redirected to App Home page.<br/>'
msg += 'Redirecting...'

$('#response-logout').html(msg)

notifymsg = 'You have logged out successfully!'
notifyUser(notifymsg)

var location_page = 'ui-app-dashboard.html'

var url_string = window.location.href
var url = new URL(url_string)
var redirectto = url.searchParams.get('url')
if (redirectto != null && redirectto.trim() != '') {
  location_page = redirectto
}

setTimeout(function () {
  window.location.href = location_page
}, 2500)

//})
//})

// function logout_oauth(callback) {
//   callback()
// }
