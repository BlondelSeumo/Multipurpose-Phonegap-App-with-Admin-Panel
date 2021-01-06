function fetchEventcategories(callback) {
  console_log('fetchEventcategories')
  var form_data = new FormData()
  form_data.append('action', 'fetch-all')
  //form_data.append('active', "1")
  form_data.append('id', '')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/event/eventcategory.php',
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

      //console_log(data.items);
      cathtml = "<option value=''>Select category</option>"
      $.each(data['items'], function (i, v) {
        cathtml += '<option value="' + v.id + '">' + v.name + '</option>'
      })
      $('#event_category').html(cathtml)
      $('#event_category').formSelect()
      //console_log(cathtml);
      callback()
    },
    error: errorHandling,
  })
}
