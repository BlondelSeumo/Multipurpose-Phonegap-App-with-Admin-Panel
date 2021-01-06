$(document).ready(function () {
  var user = getUser()

  //alert("hi");
  var form_data = new FormData()
  form_data.append('user_id', user.id)
  form_data.append('action', 'fetch-all')
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
      $('#response').html('<p class="pad-15">Connecting...</p>')
    },
    success: function (response) {
      console_log(response)
      var html = ''
      let data = JSON.parse(response)
      check_user_token(data)

      //console_log(data["items"][0].name);
      $.each(data['items'], function (i, v) {
        //console_log(v.name);
        //console_log(i);
        //console_log(v);
        image = get_display_filename(v.image, 'thumb')
        html += '<li class="collection-item avatar" id="item-' + v.id + '">'
        html += '<div class="chatlink">'
        html +=
          '<img  class="circle" alt="' +
          v.name +
          '" title="' +
          v.name +
          '" src="' +
          filename_url(image) +
          '">'
        html += '<span class="title">' + v.name + '</span>'
        html += "<p class='info'>" + v.phone + ' / ' + v.email + '</p>'
        html += '<div class="contact-actions">'
        html += '<a href="tel:' + v.phone + '" class="btn-small btn">Call</a>'
        html += '<a href="sms:' + v.phone + '" class="btn-small btn">SMS</a>'
        html +=
          '<a href="mailto:' + v.email + '" class="btn-small btn">Email</a>'
        html += '</div>'
        html += '</div>'
        html += '<div class="secondary-content">'
        html +=
          '<a href="ui-app-addcontact.html?id=' +
          v.id +
          '"><i class="mdi mdi-square-edit-outline"></i></a>'
        html +=
          '<a href="#modal-contact" id="' +
          v.id +
          '" class="modal-trigger modal-trigger-contact"><i class="mdi mdi-delete-variant"></i></a>'
        html += '</div>'
        html += '</li>'
      })
      if (html == '') {
        html =
          "<p class='nodatafound z-depth-1'>No contacts found. <a href='ui-app-addcontact.html'>Add new contact</a></p>"
      }
      $('#response').html(html)
      $('.modal').modal()
    },
    error: errorHandling,
  })

  $(document).on('click', '.modal-trigger-contact', function (e) {
    var id = e.currentTarget.id
    console_log(id)
    var name = $('#item-' + id + ' .title').html()
    //console_log(name);
    $('.modal-disp').html(name)
    $('.modal-disp').attr('id', id)
    //console_log("modal-trigger-contact"+id);
  })

  $(document).on('click', '#delete-contact', function (e) {
    var id = $('.modal-disp').attr('id')
    console_log('delete' + id)
    delete_item(e, 'contact', id, 'Contact')
  })
})
