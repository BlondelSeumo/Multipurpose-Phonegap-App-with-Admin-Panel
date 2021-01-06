var url_string = window.location.href
var url = new URL(url_string)
var getid = url.searchParams.get('id')
//console_log(getid);

var user = getUser()
var id = ''

if (getid == null || getid == '') {
  id = user.id
} else {
  id = getid
}

function load_friends(element = '') {
  chat_module = APP_MODULES.indexOf('chat') > -1 ? true : false

  if (element == '') {
    element = 'response'
  }
  let user = getUser()

  var form_data = new FormData()
  form_data.append('active', '1')
  form_data.append('user_id', id)
  form_data.append('order', 'name ASC')
  form_data.append('type', 'friends')
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
      $('#' + element).html('<p class="pad-15">Connecting...</p>')
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

        frid = 'delete_friend'
        frbtn = fr_allbtns[frid]
        var display_action = true
        if (user.id != id) {
          display_action = false
        }
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
        if (display_action) {
          html +=
            '<a href="#modal-friends" id="' +
            v.id +
            '" data-id="' +
            v.id +
            '" data-userid="' +
            user.id +
            '"  data-action="' +
            frid +
            '" class="btn btn-small modal-trigger modal-trigger-friends">' +
            frbtn +
            '</a>'
        }

        html +=
          '<a class="btn btn-small" href="ui-app-profile.html?id=' +
          v.id +
          '">Profile</a>'
        if (chat_module && user.id == id) {
          html += load_chat_buttons(v.id, user.id, frid)
        }

        html += '</div>'
        html += '<div class="secondary-content">'
        html += '</div>'
        html += '</li>'
      })
      if (html == '') {
        html =
          "<p class='nodatafound z-depth-1'><a href='ui-app-users.html'>Add new friends</a></p>"
      }
      $('#' + element).html(html)
      $('.modal').modal()
    },
    error: errorHandling,
  })
}

$(document).on('click', '.modal-trigger-friends', function (e) {
  var fid = e.currentTarget.id
  var userid = e.currentTarget.dataset.userid
  console_log(fid)
  console_log(userid)
  var name = $('#item-' + fid + ' .title').html()

  //console_log(name);
  $('.modal-disp').html(name)
  $('.modal-disp').attr('id', fid)
  $('.modal-disp').attr('data-userid', userid)
  //console_log("modal-trigger-friends"+id);
})

$(document).on('click', '#delete-friends', function (e) {
  var id = $('.modal-disp').attr('id')
  var userid = $('.modal-disp').attr('data-userid')
  var action = 'delete_friend'
  console_log(action + ' ' + id + ' ' + userid)
  friend_action(e, id, userid, action, false)
  $('#item-' + id).hide()
  //delete_item(e, "contact",id,"Contact");
})

function load_friends_count() {
  //console_log("load_friends_count");

  var form_data = new FormData()
  form_data.append('action', 'fetch-count')
  form_data.append('id', id)
  form_data.append('user_id', user.id)
  form_data.append('friends', 'count')
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
      //$("#response").val('Connecting...');
    },
    success: function (response) {
      console_log(response)
      let data = JSON.parse(response)
      check_user_token(data)

      var friends_count = '...'
      if (data.friends[id] != undefined) {
        var friends_count = data.friends[id].length
      }
      $('#friends_count').html(friends_count)
    },

    error: errorHandling,
  })
}

function load_friend_button() {
  if (id != user.id) {
    var form_data = new FormData()
    form_data.append('action', 'usertouser')
    form_data.append('id', id)
    form_data.append('user_id', user.id)
    form_data.append('source', 'app')
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
        //$("#response").val('Connecting...');
      },
      success: function (response) {
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        frhtml = ''
        if (data.btn != undefined) {
          frid = data.btn
          frbtn = fr_allbtns[frid]
          //console_log(frid+frbtn);
          frhtml +=
            '<button class="btn btn-small friend-action friend-btn-' +
            id +
            '" data-userid="' +
            user.id +
            '" data-id="' +
            id +
            '" data-action="' +
            frid +
            '" >' +
            frbtn +
            '</button>'

          chatbtn =
            '<a class="btn btn-small" href="ui-app-chat.html?id=' +
            id +
            '">Chat</a>'
          if (CHAT_WITH_FRIENDS_ONLY && frid != 'delete_friend') {
            chatbtn = ''
          }
          frhtml += chatbtn
        }
        if (data.btn2 != undefined) {
          frid2 = data.btn2
          frbtn2 = fr_allbtns[frid2]
          //console_log(frid+frbtn);
          frhtml +=
            '<button class="btn btn-small friend-action friend-btn2-' +
            id +
            '" data-userid="' +
            user.id +
            '" data-id="' +
            id +
            '" data-action="' +
            frid2 +
            '" >' +
            frbtn2 +
            '</button>'
        }

        $('#ui-profile #actions').append(frhtml)
      },

      error: errorHandling,
    })
  }
}

function load_user_friends(callback) {
  var form_data = new FormData()
  form_data.append('friendby', user.id)
  form_data.append('friendto', user.id)
  form_data.append('action', 'fetch-user')
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
      //$("#response").html('<p class="pad-15">Connecting...</p>');
    },
    success: function (response) {
      console_log(response)
      var html = ''
      let data = JSON.parse(response)
      check_user_token(data)

      //console_log(data["items"][0].name);
      $.each(data['friendby'], function (i, v) {
        friends.push('friendby-' + v.friendto + '-' + v.status)
        //console_log(v.name); console_log(i); console_log(v);
      })
      $.each(data['friendto'], function (i, v) {
        friends.push('friendto-' + v.friendby + '-' + v.status)
        //console_log(v.name); console_log(i); console_log(v);
      })

      callback()
    },
    error: errorHandling,
  })
}

function load_friend_buttons(friends, vid, userid) {
  friendbtn_html = ''
  frid = 'send_friend_request'
  frbtn = fr_allbtns[frid]
  frid2 = ''
  frbtn2 = ''

  if (friends.indexOf('friendby-' + vid + '-pending') > -1) {
    frid = 'delete_friend_request'
    frbtn = fr_allbtns[frid]
    frid2 = ''
    frbtn2 = ''
  }
  if (friends.indexOf('friendto-' + vid + '-pending') > -1) {
    frid = 'accept_friend_request'
    frbtn = fr_allbtns[frid]
    frid2 = 'reject_friend_request'
    frbtn2 = fr_allbtns[frid2]
    //button2id = ""; button2 = "";
  }
  if (
    friends.indexOf('friendby-' + vid + '-accept') > -1 ||
    friends.indexOf('friendto-' + vid + '-accept') > -1
  ) {
    frid = 'delete_friend'
    frbtn = fr_allbtns[frid]
    frid2 = ''
    frbtn2 = ''
  }

  if (vid == userid) {
    foid = ''
    fobtn = ''
    frid = ''
    frbtn = ''
    frid2 = ''
    frbtn2 = ''
  }

  if (frid != '') {
    friendbtn_html +=
      '<button class="btn btn-small friend-action friend-btn-' +
      vid +
      '" data-userid="' +
      userid +
      '" data-id="' +
      vid +
      '" data-action="' +
      frid +
      '" >' +
      frbtn +
      '</button>'
  }
  if (frid2 != '') {
    friendbtn_html +=
      '<button class="btn btn-small friend-action friend-btn2-' +
      vid +
      '" data-userid="' +
      userid +
      '" data-id="' +
      vid +
      '" data-action="' +
      frid2 +
      '" >' +
      frbtn2 +
      '</button>'
  }
  ret = []
  ret['frid'] = frid
  ret['frid2'] = frid2
  ret['html'] = friendbtn_html

  return ret
}
