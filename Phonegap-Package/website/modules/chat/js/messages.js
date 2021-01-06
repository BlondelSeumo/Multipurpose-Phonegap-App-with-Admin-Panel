$(document).ready(function () {
  var user = getUser()
  var tzoffset = getUserTimeZone()

  //$(".pagetitle").append(" (User: " + user.id + ") ");
  // Fetch user friend connections.

  //alert("hi");
  var friends = []
  var followers = []
  var form_data = new FormData()
  form_data.append('user_id', user.id)
  form_data.append('action', 'fetch-users')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)
  form_data.append('time', tzoffset)

  if (CHAT_WITH_FRIENDS_ONLY) {
    form_data.append('load', 'friends')
  }

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/chat/chat.php',
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
      //check_user_token(data);

      $.each(data['items'], function (i, v) {
        image = get_display_filename(v.image, 'thumb')
        html += '<li class="collection-item avatar" id="item-' + v.id + '">'
        html +=
          '<a href="ui-app-chat.html?id=' +
          v.id +
          '" class="chatlink waves-effect">'
        html +=
          '<img  class="circle" alt="' +
          v.name +
          '" title="' +
          v.name +
          '" src="' +
          filename_url(image) +
          '" />'
        html += '<span class="title">' + v.name + '</span>'
        var msgstr = v.message.msg
        if (msgstr == '') {
          msgstr = v.position
        }
        if (msgstr == '') {
          msgstr = "<span class='chat-nomsg'>No Message</span>"
        }
        html += '<p>' + msgstr + '</p>'
        //html += '<div style="margin-top:10px;">';
        //html += '</div>';
        html += '<div class="secondary-content">'
        if (v.unread > 0) {
          html += '<span class="unread-count">' + v.unread + '</span>'
        }
        if (v.message.disptime != undefined) {
          html += "<span class='time'>" + v.message.disptime.info + '</span> '
        }
        html += '</div>'
        html += '</a>'
        html += '</li>'
      })
      if (html == '') {
        html =
          "<p class='nodatafound z-depth-1'>No Data Found. <a href='ui-app-users.html'>Add new friend</a></p>"
      }
      $('#response').html(html)
    },
    error: errorHandling,
  })
})
