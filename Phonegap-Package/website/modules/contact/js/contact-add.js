$(document).ready(function () {
  var user = getUser()

  var url_string = window.location.href
  var url = new URL(url_string)
  var getid = url.searchParams.get('id')
  //console_log(getid);

  if (getid != null) {
    //alert("hi");
    var form_data = new FormData()
    form_data.append('id', getid)
    form_data.append('action', 'fetch')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/contact/contact.php',
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
        $('#response').html('')
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.success == true) {
          if (data.name != '') {
            $('#name').val(data.name)
            $('#name-field label').addClass('active')
          }
          if (data.email != '') {
            $('#email').val(data.email)
            $('#email-field label').addClass('active')
          }
          if (data.phone != '') {
            $('#phone').val(data.phone)
            $('#phone-field label').addClass('active')
          }
          var imgstr = ''
          if (data.image.length > 0) {
            //console_log(data.image[0]["name"]);
            //data = data;
            image = get_display_filename(data.image[0], 'thumb')
            $('#image_disp').attr('data-id', data.image[0]['id'])
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
      name: 'required',
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        number: true,
        minlength: 10,
      },
      image: { checkImage: true },
    },

    messages: {
      name: 'Please enter name',
      phone: {
        number: 'Only numbers are allowed',
        required: 'Please enter phone number',
        minlength: 'Your phone must be at least 10 digits',
      },
      email: 'Please enter a valid email address',
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
      /*if (element.attr("name") == "email" )
	        error.insertAfter(".mdi-email-outline");
	    else if  (element.attr("name") == "phone" )
	        error.insertAfter(".mdi-cellphone");
	    else*/
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

    var name = $('#name').val()
    var email = $('#email').val()
    var phone = $('#phone').val()
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
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)
    form_data.append('user_id', user.id)
    form_data.append('id', id)
    form_data.append('name', name)
    form_data.append('email', email)
    form_data.append('phone', phone)
    form_data.append('image', image)
    form_data.append('old_image', old_image)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/contact/contact.php',
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
          var notifymsg = 'Your data is saved successfully!'
          notifyUser(notifymsg)
          //console_log("redirect to contacts");
          window.location.href = 'ui-app-contacts.html'
        }
        // $('#response').html(msg)
      },
      error: errorHandling,
    })
  } // end function submitform
})
