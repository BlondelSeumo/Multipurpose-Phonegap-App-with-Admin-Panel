$(document).ready(function () {
  var authentic = isUserAuthenticated()
  if (authentic) {
    let dispmsg =
      'It seems you are logged in. You must be logged out to perform this action.<br/>Redirecting to home page'
    notify(dispmsg)
    //$("#response-register").html(dispmsg);
    setTimeout(function () {
      window.location.href = 'ui-app-dashboard.html'
    }, 3500)
  }

  //console_log("login--");
  var user = getUser()

  $('#login-form').submit(function (e) {
    //$(document).on( 'click', '#login', function (e){
    e.preventDefault()

    var username = $('#username').val()
    var password = $('#password').val()

    //console_log(username + password);

    var form_data = new FormData()
    form_data.append('from', 'login')
    form_data.append('username', username)
    form_data.append('password', password)
    form_data.append('action', 'login')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)
    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/user/user.php',
      data: form_data,
      processData: false,
      contentType: false,
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        ajax_loading()
        //$("#response-login").val('Loading...');
      },
      success: function (response) {
        ajax_loaded()
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        //var msg = data.msg;
        if (data.msg != undefined) {
          notify(data.msg)
        }
        if (data.success !== false) {
          user_login_success(data)
        }

        //notify(msg);
        //console_log(data.msg);
        //$("#response-login").html(msg);
      },
    })
  })
})
