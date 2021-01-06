$(document).ready(function () {
  var user = getUser()

  var form_data = new FormData()
  form_data.append('active', '1')
  form_data.append('user_id', user.id)
  form_data.append('order', 'name ASC')
  form_data.append('type', 'requests')
  form_data.append('action', 'user-connections')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/friend/friend.php',
    data: form_data,
    processData: false,
    contentType: false,
    crossDomain: true,
    cache: false,
    beforeSend: function () {
      $('#response').html('<p class="pad-15">Connecting...</p>')
    },
    success: function (response) {
      console_log(response)
      var html = ''
      let data = JSON.parse(response)
      check_user_token(data)

      //console_log(data["items"][0].name);
      $.each(data['items'], function (i, v) {
        //console_log(v.name);
        //console_log(i);
        //console_log(v);

        frid = 'accept_friend_request'
        frbtn = fr_allbtns[frid]
        frid2 = 'reject_friend_request'
        frbtn2 = fr_allbtns[frid2]

        friendbtn =
          '<a class="btn btn-small" href="' + v.id + '">Add Friend</a> '

        let image = get_display_filename(v.image, 'thumb')
        html += '<li class="collection-item avatar" id="item-' + v.id + '">'
        html += '<div class="chatlink">'
        html +=
          '<a href="ui-app-profile.html?id=' +
          v.id +
          '"><img  class="circle" alt="' +
          v.name +
          '" title="' +
          v.name +
          '" src="' +
          filename_url(image) +
          '"></a>'
        html +=
          '<a href="ui-app-profile.html?id=' +
          v.id +
          '"><span class="title">' +
          v.name +
          '</span></a>'
        html += '<p>' + v.position + ' / ' + v.location + '</p>'
        html += '<div style="margin-top:10px;">'
        html +=
          '<button class="btn btn-small accept-request friend-btn-' +
          v.id +
          '" data-userid="' +
          user.id +
          '" data-id="' +
          v.id +
          '" data-action="' +
          frid +
          '" >' +
          frbtn +
          '</button> '
        html +=
          '<a href="#modal-frreq" id="' +
          v.id +
          '" data-id="' +
          v.id +
          '" data-userid="' +
          user.id +
          '"  data-action="' +
          frid2 +
          '" class="btn btn-small modal-trigger modal-trigger-frreq">' +
          frbtn2 +
          '</a> '
        html +=
          '<a class="btn btn-small" href="ui-app-profile.html?id=' +
          v.id +
          '">Profile</a>'
        html += '</div>'
        html += '<div class="secondary-content">'
        html += '</div>'
        html += '</li>'
      })
      if (html == '') {
        html =
          "<p class='nodatafound z-depth-1'><a href='ui-app-users.html'>Add new friends</a></p>"
      }
      $('#response').html(html)
      $('.modal').modal()
    },
    error: errorHandling,
  })

  $(document).on('click', '.modal-trigger-frreq', function (e) {
    var id = e.currentTarget.id
    var userid = e.currentTarget.dataset.userid
    console_log(id)
    console_log(userid)
    var name = $('#item-' + id + ' .title').html()
    //console_log(name);
    $('.modal-disp').html(name)
    $('.modal-disp').attr('id', id)
    $('.modal-disp').attr('data-userid', userid)
    //console_log("modal-trigger-frreq"+id);
  })

  $(document).on('click', '#delete-frreq', function (e) {
    var id = $('.modal-disp').attr('id')
    var userid = $('.modal-disp').attr('data-userid')
    var action = 'reject_friend_request'
    console_log(action + ' ' + id + ' ' + userid)
    friend_action(e, id, userid, action, false)
    $('#item-' + id).hide()
    //delete_item(e, "contact",id,"Contact");
  })

  $(document).on('click', '.accept-request', function (e) {
    var id = e.currentTarget.dataset.id
    var userid = e.currentTarget.dataset.userid
    var action = e.currentTarget.dataset.action
    console_log(action + ' ' + id + ' ' + userid)
    friend_action(e, id, userid, action, false)
    $('#item-' + id).hide()
    //delete_item(e, "contact",id,"Contact");
  })
})
