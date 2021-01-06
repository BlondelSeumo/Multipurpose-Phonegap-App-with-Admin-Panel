$(document).ready(function () {
  var user = getUser()
  var tzoffset = getUserTimeZone()
  var id = user.id //set_user_id(user);
  if (id != null) {
    //alert("hi");
    var form_data = new FormData()
    form_data.append('action', 'fetch')
    form_data.append('fetchtype', 'profile-edit')
    form_data.append('id', id)
    form_data.append('user_id', user.id)
    form_data.append('time', tzoffset)
    form_data.append('source', 'app')
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
        $('#response').html('')
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.success == true) {
          if (data.name != '') {
            $('#name').val(data.name)
            $('#name-field label').addClass('active')
          }
          if (data.username != '') {
            $('#username').val(data.username)
            $('#username-field label').addClass('active')
          }
          if (data.email != '') {
            $('#email').val(data.email)
            $('#email-field label').addClass('active')
          }
          if (data.phone != '') {
            $('#phone').val(data.phone)
            $('#phone-field label').addClass('active')
          }
          if (data.location != '') {
            $('#location').val(data.location)
            $('#location-field label').addClass('active')
          }
          if (data.position != '') {
            $('#position').val(data.position)
            $('#position-field label').addClass('active')
          }
          if (data.dob != '') {
            $('#dob').val(data.dob)
            $('#dob-field label').addClass('active')
            const options = {
              format: 'dd/mm/yyyy',
              autoClose: true,
            }
            var elems = document.querySelectorAll('.datepicker')
            var picker = M.Datepicker.init(elems[0], options)
            var d = elems[0].value.split(/[^0-9]/)
            var newDate = new Date(d[2], d[1] - 1, d[0])
            //format: "dddd, dd mm yyyy", //var d = elems[0].value.split(" "); //var newDate = new Date(d[3], d[2]-1, d[1]);
            picker.setDate(newDate)
          }

          if (data.brief != '') {
            $('#brief').val(data.brief)
            $('#brief-field label').addClass('active')
            M.textareaAutoResize($('#brief'))
          }
          if (data.gender != '') {
            $('#gender').val(data.gender)
            $('#gender').formSelect()
          }

          var imgstr = ''
          if (data.image.length > 0) {
            //console_log(data.image[0]["name"]);
            //data = data;
            filename = get_display_filename(data.image[0], 'small')
            $('#image_disp').attr('data-id', data.image[0]['id'])
            imgstr =
              "<img src='" +
              filename_url(filename) +
              "' class='responsive-img z-depth-1' style='max-width:100px;'>"
          }
          $('#image_disp').html(imgstr)
        }
      },
      error: errorHandling,
    })
  } // end getid

  $('select').css({
    display: 'block',
    height: 0,
    padding: 0,
    width: 0,
    position: 'absolute',
  })
  $('#form').validate({
    rules: {
      username: 'required',
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
      gender: { required: true },
      dob: { required: true },
    },

    messages: {
      name: 'Please enter name',
      username: 'Please enter username',
      phone: {
        number: 'Only numbers are allowed',
        required: 'Please enter phone number',
        minlength: 'Your phone must be at least 10 digits',
      },
      email: 'Please enter a valid email address',
      gender: 'Please select gender',
      dob: 'Please enter date of birth',
    },
    submitHandler: function (form) {
      //console_log(event)
      var checkmode = check_app_mode(event)
      if (!checkmode['allow']) {
        notify(checkmode['msg'])
        return false
      } else {
        //console_log(form)
        console_log('submit form')
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
    //var id = set_user_id(user);

    var username = $('#username').val()
    var email = $('#email').val()
    var phone = $('#phone').val()

    var form_data = new FormData()
    form_data.append('action', 'check_available')
    form_data.append('source', 'app')
    form_data.append('username', username)
    form_data.append('phone', phone)
    form_data.append('email', email)
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)
    form_data.append('id', id)

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

        var msg = data.msg
        if (data.success !== false) {
          save_user()
        }
        $('#response').html(msg)
      },
      error: errorHandling,
    })
  } // end function submitform

  function save_user() {
    console_log('save user on profile edit')
    //e.preventDefault();
    //var id = set_user_id(user);

    var name = $('#name').val()
    var username = $('#username').val()
    var phone = $('#phone').val()
    var email = $('#email').val()
    var dob = $('#dob').val()
    var position = $('#position').val()
    var location = $('#location').val()
    var brief = $('#brief').val()
    var gender = $('#gender').val()

    //var id = "";
    //if(getid != null){ id = getid; }

    var old_image = $('#image_disp').attr('data-id')
    var image = $('#image').prop('files')[0]
    if (image == undefined) {
      image = ''
    }

    var form_data = new FormData()
    form_data.append('action', 'save')
    form_data.append('time', tzoffset)
    form_data.append('reauthenticate', id) // reauthenticate user details on save
    form_data.append('source', 'app')
    form_data.append('username', username)
    form_data.append('phone', phone)
    form_data.append('email', email)
    form_data.append('name', name)

    form_data.append('dob', dob)
    form_data.append('position', position)
    form_data.append('location', location)
    form_data.append('brief', brief)
    form_data.append('gender', gender)

    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    form_data.append('id', id)
    form_data.append('image', image)
    form_data.append('old_image', old_image)

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
        console_log(user.token)
        let data = JSON.parse(response)
        check_user_token(data)
        //let msg = data.msg;

        if (data.success !== false) {
          let notifymsg = data.msg
          notifyUser(notifymsg)
          if (data.user != undefined) {
            console_log('reauthenticateUser')
            authenticateUser(data.user)
          }
          console_log('redirect to profile page')
          let url = 'ui-app-profile.html'
          /*if(id != ""){
                                    url += '?id='+id;
                                  }*/

          setTimeout(function () {
            window.location.href = url
          }, 10)
        } else if (data.msg != undefined) {
          notify(data.msg)
        }
        //$("#response").html(msg);
      },
      error: errorHandling,
    })
  } // end function save_user
})
//
/*function set_user_id(user){

          var url_string = window.location.href;
          var url = new URL(url_string);
          var getid = url.searchParams.get("id");
          //console_log(getid);

          if(getid == null){
            var id = user.id;
          } else {
            var id = getid;
          }

          return id;
}*/
