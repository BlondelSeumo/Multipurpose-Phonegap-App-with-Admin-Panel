function googlepgLogin() {
  window.plugins.googleplus.login(
    {},
    function (result) {
      //alert(JSON.stringify(result));
      oauth_user(JSON.stringify(result), 'google-pg')
    },
    function (error) {
      //alert(JSON.stringify(error));
    },
  )
}

////

function googlepgLogoutonly() {
  window.plugins.googleplus.logout(function (msg) {
    //alert(msg);
  })
}
function googlepgLogout(callback) {
  //if (window.plugins != undefined) {
  window.plugins.googleplus.logout(function (msg) {
    //alert(msg);
    callback()
  })
  //} else {
  //	callback();
  //}
}

function googlepgSilentLogin() {
  window.plugins.googleplus.trySilentLogin(
    {
      //'scopes': '... ', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      //'webClientId': 'client id of the web app/server side', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      offline: false, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    },
    function (obj) {
      let data = JSON.stringify(obj)
      //alert(data); // do something useful instead of alerting
    },
    function (msg) {
      //alert("error: " + msg);
      if (msg == 4) {
        //alert("call login");
        googlepgLogin()
      }
    },
  )
}

function googlepgLoginWeb() {
  let oauth_response =
    '{"accessToken":"sometokenstring","expires":1590561542,"expires_in":2619,"email":"jay290489@gmail.com","userId":"someuserid","displayName":"Jay Babani","familyName":"Babani","givenName":"Jay","imageUrl":"https://lh3.googleusercontent.com/a-/AOh14GinpS8U04lB1H3avyTL0WRTlDRQEZjXJ77C74s_"}'
  oauth_user(oauth_response, 'google-pg')
}

function oauth_user(oauth_response, provider) {
  console_log(oauth_response)
  let data = JSON.parse(oauth_response)
  console_log(data)

  let email = ''
  let name = ''
  let image = ''

  if (data.email != undefined) {
    if (provider == 'google-pg') {
      email = data.email
      if (data.imageUrl != undefined) {
        image = data.imageUrl
      }
      if (data.displayName != undefined) {
        name = data.displayName
      }
      if (name == '' && data.givenName != undefined) {
        name = data.givenName
      }
      if (name == '' && data.familyName != undefined) {
        name = data.familyName
      }
    } else if (provider == 'google-web') {
      email = data.email
      name = data.name
      image = data.image
    }

    let user = getUser()
    var form_data = new FormData()
    form_data.append('provider', provider)
    form_data.append('action', 'oauth')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)
    form_data.append('email', email)
    form_data.append('name', name)
    form_data.append('image', image)

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
        console_log('beforeSend')
        // $("#response-register").html('Verifying...');
      },
      success: function (response) {
        ajax_loaded()
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        // //$("#response-register").html(msg);
        if (data.msg != undefined) {
          notify(data.msg)
        }
        if (data.success !== false) {
          user_login_success(data)
        }
        // if (data.success !== false) {
        // 	//   var notifymsg = "Please check your email and enter verification code to activate your account.";
        // 	//   notifyUser(notifymsg);
        // 	//   setTimeout(function(){
        // 	// 	  window.location.href = 'ui-pages-activateaccount.html';
        // 	// 	}, 2500);
        // } else {
        // }
      },
    })

    ////
  } // end email !undefined
}
