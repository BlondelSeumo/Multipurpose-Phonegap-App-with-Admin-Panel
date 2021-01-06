// Follower Related Action
$(document).on('click', '.follower-action', function (e) {
  var id = e.currentTarget.dataset.id
  var userid = e.currentTarget.dataset.userid
  var action = e.currentTarget.dataset.action
  console_log(userid + action + id)

  follower_action(e, id, userid, action)
})

function follower_action(e, id, userid, action, update_btn = true) {
  var checkmode = check_app_mode(e)
  if (!checkmode['allow']) {
    notify(checkmode['msg'])
  } else {
    let user = getUser()

    var form_data = new FormData()
    form_data.append('action', 'toggle')
    form_data.append('effect', action)
    form_data.append('follower', userid)
    form_data.append('followed', id)
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/follower/follower.php',
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

          if (action == 'follow') {
            if (update_btn) {
              change_follower_button(id, action)
            }
            notify(userstr + ' are following ' + idstr + '')
            nmsg = '[user:' + userid + '] is following you'
          } else if (action == 'unfollow') {
            if (update_btn) {
              change_follower_button(id, action)
            }
            notify(userstr + ' have unfollowed ' + idstr + '')
            nmsg = '[user:' + userid + '] has unfollowed you'
          }

          // For Profile Page count updates
          if ($('#following_count').length) {
            load_following_count()
            $("[data-load='tab'][data-type='following']").removeClass('loaded')
            load_following('response-following')
          }
          // For Profile Page count updates
          if ($('#followers_count').length) {
            load_followers_count()
            $("[data-load='tab'][data-type='followers']").removeClass('loaded')
            load_followers('response-followers')
          }

          var usernote = {
            id: id,
            auth_user: userid,
            msg: nmsg,
            module: 'follower',
            notify: id,
          }
          userNotification(usernote)
        }
      },
      error: errorHandling,
    })
  } // end check mode
}

function change_follower_button(id, action) {
  //console_log(fol_allbtns);
  console_log('change_button: ' + id + action)
  if (action == 'follow') {
    $('.follower-btn-' + id)
      .html(fol_allbtns['unfollow'])
      .attr('data-action', 'unfollow')
  } else if (action == 'unfollow') {
    $('.follower-btn-' + id)
      .html(fol_allbtns['follow'])
      .attr('data-action', 'follow')
  }
}
