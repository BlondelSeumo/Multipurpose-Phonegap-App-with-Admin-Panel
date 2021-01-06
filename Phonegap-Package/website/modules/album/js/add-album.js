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
        if (data.name != '') {
          $('#name').val(data.name)
          $('#name-field label').addClass('active')
        }

        if (data.location != '') {
          $('#location').val(data.location)
          $('#location-field label').addClass('active')
        }
        if (data.brief != '') {
          $('#brief').val(data.brief)
          $('#brief-field label').addClass('active')
          M.textareaAutoResize($('#brief'))
        }
        if (data.visibility != '') {
          $('#visibility').val(data.visibility)
        }
        $('select').formSelect()

        var attachstr = ''
        var attachid = ''
        if (data.attachment.length > 0) {
          //console_log(data.attachment[0]["name"]);
          //data = data;
          $.each(data.attachment, function (ai, av) {
            image = get_display_filename(av, 'small')
            attachstr +=
              "<div class='filemedia filemedia-" +
              av.id +
              "' data-id='" +
              av.id +
              "'>"
            attachstr +=
              "<img src='" +
              filename_url(image) +
              "' class='responsive-img z-depth-1'>"
            attachstr +=
              "<i class='btn-small red lighten-2 del-media mdi mdi-close' data-id='" +
              av.id +
              "' data-fieldid='attachment'></i></div>"
            attachid += av.id + ','
          })
          $('#attachment_disp').attr('data-id', attachid)
          $('#attachment_disp').html(attachstr)
        }
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
  rules: {
    name: 'required',
    'attachment[]': { checkAttachment: true },
    visibility: { required: true },
  },

  messages: {
    name: 'Please enter name',
    visibility: 'Please select album visibility',
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
    if (element.attr('name') == 'attachment[]') {
      error.insertAfter('.file-path')
    } else {
      error.insertAfter(element)
    }
  },
})

jQuery.validator.addMethod(
  'checkAttachment',
  function (value, element, isactive) {
    //console_log(value+element+isactive);
    var old_attachment = $('#attachment_disp').attr('data-id')
    var oldids = old_attachment.split(',')
    var filter = oldids.filter(function (v) {
      return v !== ''
    })
    //console_log("str: "+old_attachment); console_log("filter: "+filter);
    if ($('#attachment').get(0).files.length === 0 && filter.length == 0) {
      return false
    } else {
      return true
    }
  },
  'Please select attachment',
)

function submitForm() {
  //e.preventDefault();

  var name = $('#name').val()
  var location = $('#location').val()
  var brief = $('#brief').val()
  var visibility = $('#visibility').val()

  var id = ''
  if (getid != null) {
    id = getid
  }

  var old_attachment = $('#attachment_disp').attr('data-id')
  var attachment = $('#attachment').prop('files')[0]
  if (attachment == undefined) {
    attachment = ''
  }

  var form_data = new FormData()
  form_data.append('action', 'save')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)
  form_data.append('user_id', user.id)
  form_data.append('id', id)
  form_data.append('name', name)
  form_data.append('location', location)
  form_data.append('brief', brief)
  form_data.append('visibility', visibility)

  form_data.append('old_attachment', old_attachment)

  var ins = document.getElementById('attachment').files.length
  for (var x = 0; x < ins; x++) {
    form_data.append(
      'attachment[]',
      document.getElementById('attachment').files[x],
    )
  }

  var notifyfriends = $('#notifyfriends').is(':checked')

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
        //console_log("redirect to contacts");
        var nmsg = ''

        if (notifyfriends) {
          nmsg =
            '[user:' + user.id + '] created new album [album:' + data.id + ']'

          // if id is present and id is same as album edited
          if (id != '' && id == data.id) {
            nmsg =
              '[user:' + user.id + '] has updated album [album:' + data.id + ']'
          }

          var usernote = {
            auth_user: user.id,
            msg: nmsg,
            module: 'album',
            module_id: data.id,
            notify: 'friends',
          }
          var action = [
            {
              redirect: 'ui-app-albums.html',
            },
          ]
          userNotification(usernote, action)
        } else {
          //console_log("redirect to albums");
          window.location.href = 'ui-app-albums.html'
        }
      }
      $('#response').html(msg)
    },
    error: errorHandling,
  })
} // end function submitform

//    });
