$(document).ready(function () {
  var user = getUser()

  var url_string = window.location.href
  var url = new URL(url_string)
  var getid = url.searchParams.get('id')
  var getreply = url.searchParams.get('reply')
  var getthread = url.searchParams.get('thread')
  var getforward = url.searchParams.get('forward')

  var thread_id = ''
  var parent_id = '0'
  var mail_category = ''

  if (getthread != null) {
    thread_id = getthread
  }

  var id = ''
  var type = ''

  if (getid != null) {
    id = getid
    type = 'fetch'
    fetchUsers_compose(function () {
      load_data(id, type)
    })
  } else if (getreply != null) {
    id = getreply
    type = 'reply'
    fetchUsers_compose(function () {
      load_data(id, type)
    })
  } else if (getforward != null) {
    id = getforward
    type = 'forward'
    fetchUsers_compose(function () {
      load_data(id, type)
    })
  } else {
    fetchUsers_compose(function () {})
  }
  load_tabs()

  function load_data(id, type) {
    console_log('load_data')

    //alert("hi");
    var form_data = new FormData()
    form_data.append('id', id)
    form_data.append('action', 'fetch')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/mail/mail.php',
      data: form_data,
      processData: false,
      contentType: false,
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        $('#response').html('<p class="pad-15">Connecting...</p>')
      },
      success: function (response) {
        $('#response').html('')
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.success == true) {
          if (type == 'reply') {
            mail_category = data.mail_category
            parent_id = id
            console_log('------- repy --------')

            $('#title').val(data.title)
            $('#title-field label').addClass('active')

            $('#title').attr('disabled', 'disabled')
            var to_user_id = ''
            if (user.id != data.from_user_id) {
              to_user_id = data.from_user_id
            } else if (user.id != data.to_user_id) {
              to_user_id = data.to_user_id
            }
            $('#to_user_id').val(to_user_id)
            //$("#to_user_id-field label").addClass("active");
            $('#to_user_id').formSelect()
          }

          if (
            type == 'forward' ||
            (type == 'fetch' && data.status == 'draft')
          ) {
            $('#title').val(data.title)
            $('#title-field label').addClass('active')

            $('#message').html(data.message)
            $('#message-field label').addClass('active')
            var attachstr = ''
            var attachid = ''
            if (data.attachment.length > 0) {
              //console_log(data.attachment[0]["name"]);
              //data = data;
              $.each(data.attachment, function (ai, av) {
                attachstr +=
                  "<img src='" +
                  filename_url(av.name) +
                  "' class='responsive-img z-depth-1' style='max-width:100px;'>"
                attachid += av.id + ','
              })
              $('#attachment_disp').attr('data-id', attachid)
              $('#attachment_disp').html(attachstr)
            }
          }

          if (type == 'fetch' && data.status == 'draft') {
            $('#title').val(data.title)
            $('#title-field label').addClass('active')

            $('#to_user_id').val(data.to_user_id)
            //$("#to_user_id-field label").addClass("active");
            $('#to_user_id').formSelect()
            parent_id = data.parent_id
            mail_category = data.mail_category
            thread_id = data.thread_id

            $('input#mailid').val(id)
          }
          if (type == 'fetch' && data.status == 'send') {
            $('input#mailid').val('')
          }

          if (type == 'forward' || type == 'reply') {
            $('input#mailid').val('')
          }

          console_log(
            'id' +
              id +
              ' mail_category' +
              mail_category +
              ' parent_id' +
              parent_id +
              ' thread_id' +
              thread_id +
              ' type' +
              type,
          )
        } // data.success true
      },
      error: errorHandling,
    })
  }

  function fetchUsers_compose(callback) {
    console_log('fetchUsers_compose')
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
        //$("#response").html('<p class="pad-15">Connecting...</p>');
      },
      success: function (response) {
        //console_log(response);
        let data = JSON.parse(response)
        check_user_token(data)

        //console_log(data.items);//
        cathtml = "<option value=''>Select User</option>"
        $.each(data['items'], function (i, v) {
          image = get_display_filename(v.image, 'thumb')
          cathtml +=
            '<option value="' +
            v.id +
            '" data-icon="' +
            filename_url(image) +
            '" class="circle">' +
            v.name +
            ' (' +
            v.id +
            ')</option>'
        })
        $('#to_user_id').html(cathtml)
        $('#to_user_id').formSelect()
        //console_log(cathtml);
        callback()
      },
      error: errorHandling,
    })
  }

  $('select').css({
    display: 'block',
    height: 0,
    padding: 0,
    width: 0,
    position: 'absolute',
  })

  $('#form').validate({
    rules: {
      title: 'required',
      message: {
        required: true,
      },
      to_user_id: { required: true },
    },
    messages: {
      title: 'Please enter title',
      message: 'Please enter message',
      to_user_id: 'Please select user to send message',
    },
    submitHandler: function (form) {
      //console_log(event)
      var checkmode = check_app_mode(event)
      if (!checkmode['allow']) {
        notify(checkmode['msg'])
        return false
      } else {
        var submitbtn = $(this.submitButton).attr('id')
        console_log(submitbtn)
        submitForm(submitbtn)
        return false
      }
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element)
    },
  })

  function submitForm(submitbtn = '') {
    //console_log(e.currentTarget.dataset.id);

    //e.preventDefault();
    console_log('submitForm')

    var title = $('#title').val()
    var to_user_id = $('#to_user_id').val()
    var message = $('#message').val()

    var old_attachment = $('#attachment_disp').attr('data-id')
    var attachment = $('#attachment').prop('files')[0]
    if (attachment == undefined) {
      attachment = ''
    }

    var status = 'send'
    if (submitbtn != '') {
      status = submitbtn
    }

    var mark_read = '|' + user.id + ':1|'
    var mailid = $('input#mailid').val()

    // to avoid any change of id from source code
    if (type == 'reply') {
      mailid = ''
    }
    if (type == 'forward') {
      mailid = ''
    }

    var form_data = new FormData()
    form_data.append('action', 'save')
    form_data.append('source', 'app')
    form_data.append('id', mailid)
    form_data.append('parent_id', parent_id)
    form_data.append('from_user_id', user.id)
    form_data.append('to_user_id', to_user_id)
    form_data.append('title', title)
    form_data.append('message', message)
    form_data.append('status', status)
    form_data.append('thread_id', thread_id)
    form_data.append('mark_read', mark_read)
    form_data.append('mail_category', mail_category)
    //form_data.append('attachment', attachment);
    form_data.append('old_attachment', old_attachment)

    var ins = document.getElementById('attachment').files.length
    for (var x = 0; x < ins; x++) {
      form_data.append(
        'attachment[]',
        document.getElementById('attachment').files[x],
      )
    }

    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/mail/mail.php',
      data: form_data,
      processData: false,
      contentType: false,
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        ajax_loading()
        //$('#response').html('<p class="pad-15">Connecting...</p>')
      },
      success: function (response) {
        ajax_loaded()
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        var msg = data.msg
        if (data.success !== false) {
          var notifymsg = data.msg
          notifyUser(notifymsg)

          var nmsg = ''
          if (status == 'send') {
            nmsg =
              '[user:' +
              user.id +
              '] has sent you a mesage [mail:' +
              data.id +
              ']'
            if (type == 'reply') {
              nmsg =
                '[user:' +
                user.id +
                '] has sent a reply to mesage [mail:' +
                thread_id +
                ']'
            }

            var usernote = {
              auth_user: user.id,
              msg: nmsg,
              module: 'mail',
              module_id: data.id,
              notify: 'id',
              id: to_user_id,
            }
            var action = [
              {
                redirect: 'ui-app-mail-inbox.html?type=sent',
              },
            ]
            console_log('userNotification')
            userNotification(usernote, action)
          } else if (status == 'draft') {
            window.location.href = 'ui-app-mail-inbox.html?type=draft'
          } else {
            //console_log("redirect to mail inbox");
            window.location.href = 'ui-app-mail-inbox.html'
          }
        }
        // $('#response').html(msg)
      },
      error: errorHandling,
    })
  } // end function submitform
})
