// Friend Related Actions
$(document).on('click', '.friend-action', function (e) {
  var id = e.currentTarget.dataset.id
  var userid = e.currentTarget.dataset.userid
  var action = e.currentTarget.dataset.action
  //console_log(id+action+user);
  friend_action(e, id, userid, action)
})

function friend_action(e, id, userid, action, update_btn = true) {
  var checkmode = check_app_mode(e)
  if (!checkmode['allow']) {
    notify(checkmode['msg'])
  } else {
    let user = getUser()

    var form_data = new FormData()
    form_data.append('action', 'toggle')
    form_data.append('effect', action)
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    if (action == 'send_friend_request') {
      form_data.append('friendby', userid)
      form_data.append('friendto', id)
      form_data.append('status', 'pending')
    } else if (action == 'delete_friend_request') {
      form_data.append('friendby', userid)
      form_data.append('friendto', id)
      form_data.append('status', 'pending')
    } else if (action == 'accept_friend_request') {
      form_data.append('friendby', id)
      form_data.append('friendto', userid)
      form_data.append('status', 'accept')
    } else if (action == 'reject_friend_request') {
      form_data.append('friendby', id)
      form_data.append('friendto', userid)
      form_data.append('status', 'pending')
    } else if (action == 'delete_friend') {
      form_data.append('friend1', userid)
      form_data.append('friend2', id)
      form_data.append('status', 'accept')
    }
    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/friend/friend.php',
      data: form_data,
      processData: false,
      contentType: false,
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        //$("#response").html('<p class="pad-15">Connecting...</p>');
      },
      success: function (response) {
        console_log(response)
        var html = ''
        var nmsg = ''
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.success === true) {
          var userstr = 'You' //user.name;
          var idstr = 'user'
          if ($('#item-' + id + ' .title').length) {
            idstr = $('#item-' + id + ' .title').html()
          } else if ($('#ui-profile #name').length) {
            idstr = $('#ui-profile #name').html()
          }
          if (action == 'send_friend_request') {
            if (update_btn) {
              change_friend_button(id, action)
            }
            notify(
              userstr +
                ' have sent friend request to ' +
                idstr +
                ' successfully',
            )
            nmsg = '[user:' + userid + '] has sent you friend request'
          } else if (action == 'delete_friend_request') {
            if (update_btn) {
              change_friend_button(id, action)
            }
            notify(userstr + ' have deleted friend request to ' + idstr + '')
            nmsg =
              '[user:' + userid + '] has deleted friend request sent to you'
          } else if (action == 'accept_friend_request') {
            if (update_btn) {
              change_friend_button(id, action)
            }
            notify(
              userstr +
                ' have accepted friend request of ' +
                idstr +
                ' successfully',
            )
            nmsg = '[user:' + userid + '] has accepted your friend request'
          } else if (action == 'reject_friend_request') {
            if (update_btn) {
              change_friend_button(id, action)
            }
            notify(
              userstr +
                ' have rejected friend request of ' +
                idstr +
                ' successfully',
            )
            nmsg = '[user:' + userid + '] has rejected your friend request'
          } else if (action == 'delete_friend') {
            if (update_btn) {
              change_friend_button(id, action)
            }
            notify(userstr + ' are not friend of ' + idstr + ' anymore')
            nmsg = '[user:' + userid + '] is no more friend with you'
          }

          // For Profile Page count updates
          if ($('#friends_count').length) {
            load_friends_count()
            $("[data-load='tab'][data-type='friends']").removeClass('loaded')
            load_friends('response-friends')
          }

          var usernote = {
            id: id,
            auth_user: userid,
            msg: nmsg,
            module: 'friend',
            notify: id,
          }
          userNotification(usernote)
        }
      },
      error: errorHandling,
    })
  } // end check mode
}

function change_friend_button(id, action) {
  console_log('change_friend_button: ' + id + action)
  //console_log(fr_allbtns);fol_allbtns
  if (action == 'send_friend_request') {
    $('.friend-btn-' + id)
      .html(fr_allbtns['delete_friend_request'])
      .attr('data-action', 'delete_friend_request')
  } else if (action == 'delete_friend_request' || action == 'delete_friend') {
    $('.friend-btn-' + id)
      .html(fr_allbtns['send_friend_request'])
      .attr('data-action', 'send_friend_request')
  } else if (action == 'accept_friend_request') {
    $('.friend-btn-' + id)
      .html(fr_allbtns['delete_friend'])
      .attr('data-action', 'delete_friend')
    $('.friend-btn2-' + id).remove()
  } else if (action == 'reject_friend_request') {
    $('.friend-btn-' + id)
      .html(fr_allbtns['send_friend_request'])
      .attr('data-action', 'send_friend_request')
    $('.friend-btn2-' + id).remove()
  }
}
