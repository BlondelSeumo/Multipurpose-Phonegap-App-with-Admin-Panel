var user = getUser()

var friends = []
var followers = []

function load_users() {
  friend_module = APP_MODULES.indexOf('friend') > -1 ? true : false
  //console_log("friend_module: "+friend_module);

  follower_module = APP_MODULES.indexOf('follower') > -1 ? true : false
  //console_log("follower_module: "+follower_module);

  chat_module = APP_MODULES.indexOf('chat') > -1 ? true : false
  //console_log("chat_module: "+chat_module);

  task_module = APP_MODULES.indexOf('task') > -1 ? true : false
  available_module = APP_MODULES.indexOf('available') > -1 ? true : false

  //console_log("followers");
  //console_log(followers);
  //console_log("friends");
  //console_log(friends);
  console_log('user')
  //console_log(user);

  var form_data = new FormData()
  form_data.append('active', '1')
  form_data.append('order', 'name ASC')
  form_data.append('action', 'fetch-all')
  form_data.append('exclude', user.id)
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
      $('#response').html('<p class="pad-15">Fetching...</p>')
    },
    success: function (response) {
      ajax_loaded()
      console_log(response)
      console_log(friends)
      var html = ''
      var chatbtn = ''
      let data = JSON.parse(response)
      check_user_token(data)
      //console_log(data["items"][0].name);

      if (data.success === true) {
        $.each(data['items'], function (i, v) {
          //console_log(v.name);
          //console_log(i);
          //console_log(v);
          let available_class = ''
          let image = get_display_filename(v.image, 'thumb')
          if (v.available == '0') {
            available_class = 'unavailable'
          }
          html +=
            '<li class="collection-item avatar ' +
            available_class +
            '" id="item-' +
            v.id +
            '">'
          html += '<div class="chatlink users">'
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
          html += '<div class="spacer-small"></div>'

          // html += '<div style="margin-top:10px;">';

          if (follower_module) {
            html += load_follower_buttons(followers, v.id, user.id)
          }

          frid = ''
          if (friend_module) {
            friendbtn = load_friend_buttons(friends, v.id, user.id)
            frid = friendbtn['frid']
            html += friendbtn['html']
          }

          if (chat_module) {
            html += load_chat_buttons(v.id, user.id, frid)
          }

          //html += '</div>';
          //html += '<div class="secondary-content">';

          if (task_module) {
            html += load_task_buttons(v.id, user.id)
          }
          html +=
            '<a class="btn btn-small" href="ui-app-profile.html?id=' +
            v.id +
            '">Profile</a>'

          //html += "</div>";
          html += '</li>'
        })
      }

      if (html == '') {
        html = "<p class='nodatafound z-depth-1'>No Data Found</p>"
      }
      $('#response').html(html)
    },
    error: errorHandling,
  })
}

//
