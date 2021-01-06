function fetchUsers(
  callback,
  show_userbox = false,
  format = '',
  type = 'multiple',
) {
  //if (user.usertype == "admin") {
  console_log('fetchUsers')
  var form_data = new FormData()
  form_data.append('action', 'fetch-all')
  form_data.append('active', '1')
  form_data.append('id', '')
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
      //$("#response").html('<p class="pad-15">Loading...</p>');
    },
    success: function (response) {
      ajax_loaded()
      console_log(response)
      let data = JSON.parse(response)
      check_user_token(data)

      //console_log(data.items);
      defhtml = ''
      if (type == 'single') {
        cathtml = "<option value=''>Select</option>"
      } else {
        cathtml = "<option value='' disabled>Select</option>"
      }
      lihtml = ''
      $.each(data['items'], function (i, v) {
        let image = get_display_filename(v.image, 'thumb')
        let user_available = ''
        let available_label = ''
        if (v.available == '0') {
          user_available = 'disabled'
          available_label = ' (Unavailable)'
        }
        if (format == 'ddlist') {
          lihtml +=
            '<li data-id="' +
            v.id +
            '" class="' +
            user_available +
            '"><span><img src="' +
            filename_url(image) +
            '" class="circle"><div>' +
            v.name +
            ' ' +
            available_label +
            '</div></span></li>'
        } else {
          cathtml +=
            '<option value="' +
            v.id +
            '" ' +
            user_available +
            ' data-icon="' +
            filename_url(image) +
            '" class="circle">' +
            v.name +
            ' ' +
            available_label +
            '</option>'
          if (show_userbox) {
            defhtml +=
              '<div class="userbox chip userbox-' +
              v.id +
              '" id="userbox-' +
              v.id +
              '" data-id="' +
              v.id +
              '"><img class="thumb" src="' +
              filename_url(image) +
              '" title="' +
              v.name +
              '" />' +
              v.name +
              '</span> <span class="deluser" data-id="' +
              v.id +
              '"><i class="mdi mdi-close"></i></span></div>'
          }
        }
      })

      if (format == 'ddlist') {
        $('.user-dd-list').append(lihtml)
      } else if (type == 'single') {
        $('#user_id').html(cathtml)
        $('#user_id').formSelect()
      } else {
        $('#users').html(cathtml)
        $('#users').formSelect()
        if (show_userbox) {
          $('#users_chips').html(defhtml)
        }
        //console_log(cathtml);
      }

      callback()
    },
    error: errorHandling,
  })
  // } // end usertype check
  // else {
  // 	callback();
  // }
}

function load_user_dropdown(callback, ele, pagetype = '') {
  let html = ''
  var user = getUser()
  if (user.usertype == 'admin') {
    html += '<div class="boxtitle">User:</div>'
    html +=
      '<a class="waves-effect waves-light btn btn-small usertaskdd user-dd" data-id="status" title="Load By User" href="#" data-target="dropdown20"><span>All Users</span><i class="mdi mdi-chevron-down"></i></a>'
    html +=
      '<ul id="dropdown20" class="dropdown-content user-dd-list usertaskdd-list" data-pagetype="' +
      pagetype +
      '">'
    html += '<li data-id=""><span>All Users</span></li>'
    html += '</ul>'

    $('#' + ele).append(html)

    $('.user-dd').dropdown({
      /*closeOnClick: false,*/
      alignment: 'right',
    })
  }

  callback()
}
