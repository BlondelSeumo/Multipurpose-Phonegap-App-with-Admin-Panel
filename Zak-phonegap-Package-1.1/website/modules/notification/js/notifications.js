$(document).ready(function () {
  var user = getUser()
  var tzoffset = getUserTimeZone()

  if (user.id != null && user.id != '') {
    //alert("hi");
    var form_data = new FormData()
    form_data.append('user_id', user.id)
    form_data.append('time', tzoffset)
    form_data.append('action', 'fetch-all')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/notification/notification.php',
      data: form_data,
      processData: false,
      contentType: false,
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        ajax_loading()
        $('#response').html('<p class="pad-15">Loading...</p>')
      },
      success: function (response) {
        ajax_loaded()
        console_log(response)
        var html = ''
        let data = JSON.parse(response)
        check_user_token(data)

        //console_log(data["items"][0].name);
        $.each(data['items'], function (i, v) {
          //console_log(v.name);
          //console_log(i);
          //console_log(v);
          let fromname = ''
          let fromimage = 'images/user-bg.jpg'
          if (v.userinfo != undefined) {
            fromname = v.userinfo.name
            fromimage = get_display_filename(v.userinfo.image, 'thumb')
          }

          var actions = '' //'<a href="#!"><span class="new badge bg-primary" data-badge-caption="">Reply</span></a>';

          html +=
            '<li class="collection-item avatar ' +
            v.status +
            '" id="item-' +
            v.id +
            '">'
          html += '<div class="notify">'
          html +=
            '<img  class="circle" alt="' +
            fromname +
            '" title="' +
            fromname +
            '" src="' +
            filename_url(fromimage) +
            '">'
          html += '<p class="title">' + v.message + '</p>'
          //html += '<span class="time">'+v.timestamp+'</span>';
          html +=
            '<span class="notifytime" title="' +
            v.disptime.full +
            '">' +
            v.disptime.info +
            '</span>'
          html += actions
          html += '</div>'
          html += '<div class="secondary-content">'
          //html += '<span data-id="'+v.id+'"><i class="mdi mdi-delete-sweep"></i></span>';
          html += '</div>'
          html += '</li>'
        })
        if (html == '') {
          html = "<p class='nodatafound z-depth-1'>No notifications found.</p>"
        }
        $('#response').html(html)
      },
      error: errorHandling,
    })
  } // end if user id check
})
