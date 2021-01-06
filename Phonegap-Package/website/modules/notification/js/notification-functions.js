function userNotification(info, naction = []) {
  let user = getUser()
  console_log(info)

  var nform_data = new FormData()
  nform_data.append('action', 'save')
  nform_data.append('auth_user', info.auth_user)
  nform_data.append('module', info.module)
  nform_data.append('message', info.msg)
  nform_data.append('module_id', info.module_id)
  nform_data.append('notify', info.notify) // notify to id, friends, id string etc.
  nform_data.append('auth_user', user.id)
  nform_data.append('auth_type', user.usertype)
  nform_data.append('auth_token', user.token)

  if (info.id != undefined) {
    nform_data.append('user_id', info.id)
  }
  if (info.ids != undefined) {
    nform_data.append('ids', info.ids)
  }
  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/notification/notification.php',
    data: nform_data,
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
      let ndata = JSON.parse(response)
      check_user_token(ndata)

      if (ndata.success === true) {
        //return true;
      } else {
        //return false;
      }

      console_log(naction.length)
      if (naction.length > 0) {
        followNotificationAction(naction)
      }
    },
    error: errorHandling,
  })

  //return "";/*//*/
}

function followNotificationAction(naction) {
  console_log(naction)
  if (naction[0]['redirect'] != undefined) {
    console_log('redirect: ' + naction[0]['redirect'])
    window.top.location = naction[0]['redirect']
  }
}
