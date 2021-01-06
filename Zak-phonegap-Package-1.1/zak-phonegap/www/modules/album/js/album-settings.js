//$(document).ready(function() {

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
      $('#response').html('')
      console_log(response)
      let data = JSON.parse(response)
      check_user_token(data)

      if (data.success == true) {
        if (data.display_type != '') {
          $('#display_type').val(data.display_type)
        }
        if (data.carousel_column != '') {
          $('#carousel_column').val(data.carousel_column)
        }
        if (data.carousel_height != '') {
          $('#carousel_height').val(data.carousel_height)
          $('#carousel_height-field label').addClass('active')
        }
        if (data.carousel_align != '') {
          $('#carousel_align').val(data.carousel_align)
        }
        if (data.column_class != '') {
          $('#column_class').val(data.column_class)
        }
        if (data.display_content != '') {
          $('#display_content').val(data.display_content)
        }
        if (data.fullwidth != '') {
          $('#fullwidth').val(data.fullwidth)
        }
        if (data.circular != '') {
          $('#circular').val(data.circular)
        }
        if (data.equal_height != '') {
          $('#equal_height').val(data.equal_height)
        }
        $('select').formSelect()
      } // end success
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
  rules: {},

  messages: {},
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
    error.insertAfter(element)
  },
})

function submitForm() {
  //e.preventDefault();

  var display_type = $('#display_type').val()
  var carousel_column = $('#carousel_column').val()
  var carousel_height = $('#carousel_height').val()
  var carousel_align = $('#carousel_align').val()
  var column_class = $('#column_class').val()
  var display_content = $('#display_content').val()
  var fullwidth = $('#fullwidth').val()
  var circular = $('#circular').val()
  var equal_height = $('#equal_height').val()

  var id = ''
  if (getid != null) {
    id = getid
  }

  var form_data = new FormData()
  form_data.append('action', 'save')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)
  form_data.append('user_id', user.id)
  form_data.append('id', id)

  form_data.append('display_type', display_type)
  form_data.append('carousel_column', carousel_column)
  form_data.append('carousel_height', carousel_height)
  form_data.append('carousel_align', carousel_align)
  form_data.append('column_class', column_class)
  form_data.append('display_content', display_content)
  form_data.append('fullwidth', fullwidth)
  form_data.append('circular', circular)
  form_data.append('equal_height', equal_height)

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
      let data = JSON.parse(response)
      check_user_token(data)

      var msg = data.msg
      if (data.success !== false) {
        var notifymsg = 'Your data is saved successfully!'
        notifyUser(notifymsg)
        //console_log("redirect");
        window.location.href = 'ui-app-albums.html'
      }
      $('#response').html(msg)
    },
    error: errorHandling,
  })
} // end function submitform

//    });
