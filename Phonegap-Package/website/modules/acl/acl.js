ACL()

function console_log(data) {
  //console.log(data)
}

function authenticateUser(user) {
  // console_log('authenticateUser')
  //console_log(user);
  //console_log(user.image[0]["name"]);
  let d = new Date()
  let ts = d.getTime()

  image = get_display_filename(user.image[0], 'thumb')

  localStorage.setItem('id', user.id)
  localStorage.setItem('name', user.name)
  localStorage.setItem('username', user.username)
  localStorage.setItem('image', image)
  localStorage.setItem('usertype', user.usertype)
  localStorage.setItem('account_type', user.account_type)
  localStorage.setItem('logints', ts) // when user logged in
  localStorage.setItem('token', user.token)
  localStorage.setItem('provider', user.provider)
}

function isUserAuthenticated() {
  let authentic = localStorage.getItem('username') !== null
  // console_log('isUserAuthenticated: ' + authentic)
  return authentic
}

function isAuthExpired() {
  var d = new Date()
  var ts = d.getTime()
  var logints = ''

  var diff = AUTHEXPIREMILLISECONDS
  //var diff = 10000;
  var expire = true

  if (localStorage.getItem('logints') !== null) {
    logints = localStorage.getItem('logints')
    if (ts - logints < diff) {
      expire = false
    }
  }

  //console_log('isAuthExpired: ' + expire)
  return expire
}

function deauthenticateUser() {
  console_log('deauthenticateUser')
  localStorage.removeItem('id')
  localStorage.removeItem('name')
  localStorage.removeItem('username')
  localStorage.removeItem('image')
  localStorage.removeItem('usertype')
  localStorage.removeItem('account_type')
  localStorage.removeItem('logints')
  localStorage.removeItem('token')
  localStorage.removeItem('provider')
}

function getUser() {
  var user = {}
  user['id'] = localStorage.getItem('id')
  user['name'] = localStorage.getItem('name')
  user['username'] = localStorage.getItem('username')
  user['image'] = localStorage.getItem('image')
  user['usertype'] = localStorage.getItem('usertype')
  user['account_type'] = localStorage.getItem('account_type')
  user['logints'] = localStorage.getItem('logints')
  user['token'] = localStorage.getItem('token')
  user['provider'] = localStorage.getItem('provider')

  // console_log(user)

  return user
}

function getToken() {
  return localStorage.getItem('token')
}

function authenticateGuest(token) {
  // console_log('authenticateGuest')
  localStorage.setItem('token', token)
}
//
function deauthenticateGuest() {
  // console_log('deauthenticateGuest')
  localStorage.removeItem('token')
}

function ACL() {
  // console_log(localStorage)
  //console_log(restricted);

  // Get Current Page
  var path = window.location.pathname
  var page = path.split('/').pop()
  var page = page.replace('.php', '.html')
  // console_log(page)

  var pageRestriced = restricted.indexOf(page)

  //console_log(pageRestriced);

  // IF page is restricted, then check authenticity
  if (pageRestriced > -1) {
    // page needs a logged in user
    //console_log("Please login");
    //$(".pagetitle").append(" - Please login");

    //   console_log('----------||--------')
    //   console_log('isUserAuthenticated:' + isUserAuthenticated())
    //console_log(getUser());
    //  console_log('isAuthExpired: ' + isAuthExpired())

    var authentic = isUserAuthenticated()
    var expired = isAuthExpired()
    if (!authentic) {
      window.location.href = 'ui-pages-login.html?url=' + page
    } else if (expired) {
      window.location.href = 'ui-pages-lockscreen.html?url=' + page
    }
    //   console_log('----------||--------')
  }

  /*
       var pageAccess = access.indexOf(page);
       if(pageAccess > -1){
          var url_string = window.location.href;
          var url = new URL(url_string);
          var redirect = url.searchParams.get("url");
          $("h5").append(" "+page);
          if(redirect != null){
             $("h5").append(" Redirect to: "+redirect);
          }
       }*/
}

function unauthroized_access_redirect(allowed_usertype = '') {
  let user = getUser()
  let usertype = user.usertype

  let allow = true
  if (usertype != allowed_usertype) {
    allow = false
  }
  if (!allow) {
    window.location.href = 'ui-app-dashboard.html'
  }
}
