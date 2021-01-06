$(document).ready(function () {
  var url_string = window.location.href
  var url = new URL(url_string)
  var getid = url.searchParams.get('id')
  //console_log(getid);

  if (getid != null) {
    var user = getUser()

    var form_data = new FormData()
    form_data.append('user_id', user.id)
    form_data.append('action', 'fetch')
    form_data.append('id', getid)
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/album/album.php',
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

        $.each(data['attachment'], function (i, v) {
          var title = v.title
          if (v.title == '') {
            title = "<span class='chat-nomsg'>No Title added</span>"
          }
          let image = get_display_filename(v, 'thumb')
          html += '<li class="collection-item avatar" id="item-' + v.id + '">'
          html += '<div class="chatlink waves-effect">'
          html +=
            '<img  class="circle" alt="' +
            v.title +
            '" title="' +
            v.title +
            '" src="' +
            filename_url(image) +
            '" />'
          html += '<span class="title">' + title + '</span>'
          var msgstr = v.brief
          if (msgstr == '') {
            msgstr = "<span class='chat-nomsg'>No Description added</span>"
          }
          html += '<p>' + msgstr + '</p>'
          //html += '<div style="margin-top:10px;">';
          //html += '</div>';
          html += '<div class="secondary-content">'
          html +=
            '<a class="btn btn-small" href="ui-app-album-addmedia.html?album=' +
            getid +
            '&id=' +
            v.id +
            '">Edit</a>'
          html += '</div>'
          html += '</div>'
          html += '</li>'
        })
        if (html == '') {
          html = "<p class='nodatafound z-depth-1'>No Data Found</p>"
        }
        $('#response').html(html)
      },
      error: errorHandling,
    })
  } // end getid null
})
