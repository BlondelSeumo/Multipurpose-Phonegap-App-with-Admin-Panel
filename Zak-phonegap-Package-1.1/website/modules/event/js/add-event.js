var user = getUser()
var tzoffset = getUserTimeZone()

var url_string = window.location.href
var url = new URL(url_string)
var getid = url.searchParams.get('id')
//console_log(getid);

function load_data() {
  if (getid != null) {
    //alert("hi");
    var form_data = new FormData()
    form_data.append('id', getid)
    form_data.append('action', 'fetch')
    form_data.append('time', tzoffset)
    form_data.append('source', 'app')
    form_data.append('users', 'array')
    form_data.append('contacts', 'array')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/event/event.php',
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
          if (data.location != '') {
            $('#location').val(data.location)
            $('#location-field label').addClass('active')
          }
          if (data.brief != '') {
            $('#brief').val(data.brief)
            $('#brief-field label').addClass('active')
            M.textareaAutoResize($('#brief'))
          }
          if (data.eventtype != '') {
            $('#eventtype').val(data.eventtype)
          }
          if (data.active != '') {
            $('#active').val(data.active)
          }
          if (data.event_category != '') {
            $('#event_category').val(data.event_category)
          }

          if (data.users_arr != undefined) {
            $.each(data.users_arr, function (i, e) {
              $("#users option[value='" + e + "']").prop('selected', true)
            })
          }
          if (data.contacts_arr != undefined) {
            $.each(data.contacts_arr, function (i, e) {
              $("#contacts option[value='" + e + "']").prop('selected', true)
            })
          }
          $('select').formSelect()

          if (data.from_time != '') {
            $('#from_time').val(data.from_time)
            $('#from_time-field label').addClass('active')
          }
          if (data.to_time != '') {
            $('#to_time').val(data.to_time)
            $('#to_time-field label').addClass('active')
          }

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

          if (data.from_date != '') {
            $('#from_date').val(data.from_date)
            $('#from_date-field label').addClass('active')
            const options = {
              format: 'dd/mm/yyyy',
              autoClose: true,
            }
            var elems = document.querySelectorAll('#from_date')
            var picker = M.Datepicker.init(elems[0], options)
            var d = elems[0].value.split(/[^0-9]/)
            var newDate = new Date(d[2], d[1] - 1, d[0])
            //format: "dddd, dd mm yyyy", //var d = elems[0].value.split(" "); //var newDate = new Date(d[3], d[2]-1, d[1]);
            picker.setDate(newDate)
          }

          if (data.to_date != '') {
            $('#to_date').val(data.to_date)
            $('#to_date-field label').addClass('active')
            const options = {
              format: 'dd/mm/yyyy',
              autoClose: true,
            }
            var elems = document.querySelectorAll('#to_date')
            var picker = M.Datepicker.init(elems[0], options)
            var d = elems[0].value.split(/[^0-9]/)
            var newDate = new Date(d[2], d[1] - 1, d[0])
            //format: "dddd, dd mm yyyy", //var d = elems[0].value.split(" "); //var newDate = new Date(d[3], d[2]-1, d[1]);
            picker.setDate(newDate)
          }
        } // end success
      },
      error: errorHandling,
    })
  } // end getid
} // end load function

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
    eventtype: { required: true },
    from_date: { required: true },
    to_date: { required: true },
    from_time: { required: true },
    to_time: { required: true },
    active: { required: true },
    location: 'required',
  },

  messages: {
    title: 'Please enter name',
    eventtype: 'Please select event type',
    from_date: 'Please enter start date',
    to_date: 'Please enter end date',
    from_time: 'Please enter start date time',
    to_time: 'Please enter end date time',
    active: 'Please select event type',
    location: 'Please enter event location',
  },
  submitHandler: function (form) {
    //console_log(event)
    var checkmode = check_app_mode(event)
    if (!checkmode['allow']) {
      notify(checkmode['msg'])
      return false
    } else {
      console_log('submit form')
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

  var title = $('#title').val()
  var location = $('#location').val()
  var brief = $('#brief').val()
  var eventtype = $('#eventtype').val()
  var active = $('#active').val()
  var event_category = $('#event_category').val()
  var users = $('#users').val()
  var contacts = $('#contacts').val()
  var from_date = $('#from_date').val()
  var to_date = $('#to_date').val()
  var from_time = $('#from_time').val()
  var to_time = $('#to_time').val()
  //console_log(users);

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
  form_data.append('source', 'app')
  form_data.append('time', tzoffset)

  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  form_data.append('user_id', user.id)
  form_data.append('id', id)
  form_data.append('title', title)
  form_data.append('location', location)
  form_data.append('brief', brief)
  form_data.append('active', active)
  form_data.append('eventtype', eventtype)
  form_data.append('event_category', event_category)
  form_data.append('users', users)
  form_data.append('contacts', contacts)

  form_data.append('from_date', from_date)
  form_data.append('to_date', to_date)
  form_data.append('from_time', from_time)
  form_data.append('to_time', to_time)

  form_data.append('old_attachment', old_attachment)

  var ins = document.getElementById('attachment').files.length
  for (var x = 0; x < ins; x++) {
    form_data.append(
      'attachment[]',
      document.getElementById('attachment').files[x],
    )
  }

  var notifyusers = $('#notifyusers').is(':checked')

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/event/event.php',
    data: form_data,
    processData: false,
    contentType: false,
    crossDomain: true,
    cache: false,
    beforeSend: function () {
      ajax_loading()
      // $('#response').html('<p class="pad-15">Connecting...</p>')
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
        var nmsg = ''

        if (notifyusers && users != null && users != '') {
          nmsg =
            '[user:' + user.id + '] created new event [event:' + data.id + ']'

          // if id is present and id is same as album edited
          if (id != '' && id == data.id) {
            nmsg =
              '[user:' + user.id + '] has updated event [event:' + data.id + ']'
          }

          var usernote = {
            auth_user: user.id,
            msg: nmsg,
            module: 'event',
            module_id: data.id,
            notify: 'multiple',
            ids: users,
          }
          var action = [
            {
              redirect: 'ui-app-events.html',
            },
          ]
          userNotification(usernote, action)
        } else {
          //console_log("redirect to albums");
          window.location.href = 'ui-app-events.html'
        }
      }

      // $('#response').html(msg)
    },
    error: errorHandling,
  })

  /**/
} // end function submitform

//    });
