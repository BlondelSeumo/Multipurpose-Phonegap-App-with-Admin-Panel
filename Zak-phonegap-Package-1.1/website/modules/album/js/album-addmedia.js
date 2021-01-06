$(document).ready(function () {
  var user = getUser()

  var url_string = window.location.href
  var url = new URL(url_string)
  var getid = url.searchParams.get('id')
  var getalbum = url.searchParams.get('album')
  //console_log(getid);

  if (getid != null && getalbum != null) {
    //alert("hi");
    var form_data = new FormData()
    form_data.append('id', getid)
    form_data.append('action', 'fetch')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)
    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/file/file.php',
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
          if (data.title != '') {
            $('#title').val(data.title)
            $('#title-field label').addClass('active')
          }

          if (data.brief != '') {
            $('#brief').val(data.brief)
            $('#brief-field label').addClass('active')
            M.textareaAutoResize($('#brief'))
          }

          var imgstr = ''
          if (data.name.length > 0) {
            //console_log(data.name);
            //data = data;
            let image = get_display_filename(data, 'small')
            $('#image_disp').attr('data-id', data.id)
            imgstr =
              "<img src='" +
              filename_url(image) +
              "' class='responsive-img z-depth-1' style='max-width:100px;'>"
          }
          $('#image_disp').html(imgstr)
        }
      },
      error: errorHandling,
    })
  } // end getid

  $('#form').validate({
    rules: {
      title: 'required',
      image: { checkImage: true },
    },

    messages: {
      title: 'Please enter title',
    },
    submitHandler: function (form) {
      //console_log(event)
      var checkmode = check_app_mode(event)
      if (!checkmode['allow']) {
        notify(checkmode['msg'])
        return false
      } else {
        //console_log("submit form");
        submitForm()
        return false
      }
    },
    errorPlacement: function (error, element) {
      if (element.attr('name') == 'image') {
        error.insertAfter('.file-path')
      } else {
        error.insertAfter(element)
      }
    },
  })

  jQuery.validator.addMethod(
    'checkImage',
    function (value, element, isactive) {
      //console_log(value+element+isactive);
      var old_image = $('#image_disp').attr('data-id')
      //console_log(old_image);
      if ($('#image').get(0).files.length === 0 && old_image === '') {
        return false
      } else {
        return true
      }
    },
    'Please select image',
  )

  function submitForm() {
    //e.preventDefault();

    var title = $('#title').val()
    var brief = $('#brief').val()

    var id = ''
    if (getid != null) {
      id = getid
    }

    var old_image = $('#image_disp').attr('data-id')
    var image = $('#image').prop('files')[0]
    if (image == undefined) {
      image = ''
    }

    var form_data = new FormData()
    form_data.append('action', 'save')
    form_data.append('source', 'app')
    form_data.append('type', 'albummedia')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)
    form_data.append('user_id', user.id)
    form_data.append('id', id)
    form_data.append('title', title)
    form_data.append('brief', brief)
    form_data.append('name', image)
    form_data.append('old_name', old_image)
    form_data.append('module_id', getalbum)
    form_data.append('module', 'album')

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/file/file.php',
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
        let data = JSON.parse(response)
        check_user_token(data)

        var msg = data.msg
        if (data.success !== false) {
          var notifymsg = 'Your data is saved successfully!'
          notifyUser(notifymsg)
          //console_log("redirect to manage album");
          window.location.href = 'ui-app-album-manage.html?id=' + getalbum
        }
        $('#response').html(msg)
      },
      error: errorHandling,
    })
  } // end function submitform
})
