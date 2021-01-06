var user = getUser()
var tzoffset = getUserTimeZone()

function load_events(
  element = '',
  loadtype = '',
  month = '',
  day = '',
  year = '',
  date = '',
) {
  if (element == '') {
    element = 'response'
  }

  console_log('get events: ' + month + '-' + day + '-' + year)

  //alert("hi");
  var form_data = new FormData()
  form_data.append('action', 'fetch-all')
  form_data.append('user_id', user.id)
  form_data.append('user', 'userimage')
  form_data.append('contact', 'userimage')
  form_data.append('category', 'name')
  form_data.append('order', 'from_date ASC')
  form_data.append('active', '1')
  form_data.append('source', 'app')
  form_data.append('time', tzoffset)
  form_data.append('loadtype', loadtype)
  form_data.append('month', month)
  form_data.append('day', day)
  form_data.append('year', year)
  form_data.append('date', date)
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
      $('#' + element).html('<p class="pad-15">Connecting...</p>')
    },
    success: function (response) {
      console_log(response)
      var html = ''
      let data = JSON.parse(response)
      check_user_token(data)

      //console_log(data["items"][0].name);
      if (data.range != '') {
        $('.event-range').html('Events (' + data.range + ')')
      }
      $.each(data['items'], function (i, v) {
        //console_log(v.name);
        //console_log(i);
        //console_log(v);

        html += '<li class="event-item card" id="item-' + v.id + '">'
        html += '<div class="title">' + v.title + '</div>'
        html +=
          '<div class="time" title="' +
          v.from_disptime.full +
          ' - ' +
          v.to_disptime.full +
          '">' +
          v.from_disptime.info +
          ' - ' +
          v.to_disptime.info +
          '</div>'
        html +=
          '<div class="event-location"><i class="mdi mdi-map-marker-outline"></i> ' +
          v.location +
          '</div>'

        if (v.users_arr.length > 0 || v.contacts_arr.length > 0) {
          html += '<div class="people">'
          for (var i = v.users_arr.length - 1; i >= 0; i--) {
            image_thumb = get_display_filename(v.users_arr[i]['image'], 'thumb')
            html +=
              '<a href="#!"><img src="' +
              filename_url(image_thumb) +
              '" alt="' +
              v.users_arr[i]['name'] +
              '" title="' +
              v.users_arr[i]['name'] +
              '" class="circle"></a>'
          }
          for (var i = v.contacts_arr.length - 1; i >= 0; i--) {
            image_thumb = get_display_filename(
              v.contacts_arr[i]['image'],
              'thumb',
            )
            html +=
              '<a href="#!"><img src="' +
              filename_url(image_thumb) +
              '" alt="' +
              v.contacts_arr[i]['name'] +
              '" title="' +
              v.contacts_arr[i]['name'] +
              '" class="circle"></a>'
          }
          html += '</div>'
        }
        if (v.event_category != '') {
          html +=
            '<span class="new badge" data-badge-caption="">' +
            v.event_category +
            '</span>'
        }
        html += '<div class="actions">'
        html +=
          '<button class="waves-effect btn btn-small info-btn info-btn-' +
          v.id +
          '" data-id="' +
          v.id +
          '">More <i class="mdi mdi-chevron-down"></i></button>'
        //html += '<a href="#!"><i class="mdi mdi-delete"></i></a>';
        html += '</div>'

        if (v.user_id == user.id) {
          html += "<div class='event-btns'>"
          html +=
            '<a class="btn btn-small" href="ui-app-event-add.html?id=' +
            v.id +
            '">Edit</a>'
          html +=
            '<a href="#modal-event" id="' +
            v.id +
            '" class="modal-trigger modal-trigger-event btn btn-small">Delete</a>'
          html += '</div>'
        }

        html += '<div class="event-info hide" id="info-' + v.id + '">'
        html += '<div class="event-brief">' + v.brief + '</div>'
        if (v['attachment'].length > 0) {
          html += "<div class='event-attachment-area'>"
          $.each(v['attachment'], function (ai, av) {
            avimg = get_display_filename(av, 'small')
            avimg_full = get_display_filename(av, 'name')
            html +=
              '<a class="img-wrap event-attachment" href="' +
              filename_url(avimg_full) +
              '" data-fancybox="images">'
            html +=
              '<img class="img-responsive z-depth-1"  style="width: 100%;" src="' +
              filename_url(avimg) +
              '">'
            html += '</a>'
            //html += '<div class="event-attachment"><img src="' + filename_url(av.name) + '" class="img-responsive z-depth-1"/></div>';
          })
          html += '</div>'
        }

        html += '</div>'

        html += '</div>'
        html += '</li>'
      })
      if (html == '') {
        html =
          "<p class='nodatafound z-depth-1'>No Events Found. <a href='ui-app-event-add.html'>Add new event</a></p>"
      }
      $('#' + element).html(html)
      $('.modal').modal()

      if (data['count'] != undefined) {
        $.each(data['count'], function (ci, cv) {
          console_log(cv.date + ' ' + cv.events.length)
          if (cv.events.length > 0) {
            $("[data-title='" + cv.date + "']").append(
              "<span class='count'>" + cv.events.length + '</span>',
            )
          }
        })
      }
    },
    error: errorHandling,
  })
} // end function

$(document).on('click', '.info-btn', function (e) {
  var id = e.currentTarget.dataset.id
  if ($('.info-btn-' + id).hasClass('open')) {
    $('#info-' + id).addClass('hide')
    $('.info-btn-' + id).removeClass('open')
    $('.info-btn-' + id).html('More <i class="mdi mdi-chevron-down"></i>')
  } else {
    $('#info-' + id).removeClass('hide')
    $('.info-btn-' + id).addClass('open')
    $('.info-btn-' + id).html('Less <i class="mdi mdi-chevron-up"></i>')
  }
})

$(document).on('click', '.modal-trigger-event', function (e) {
  var id = e.currentTarget.id
  console_log(id)
  var name = $('#item-' + id + ' .title').html()
  //console_log(name);
  $('.modal-disp').html(name)
  $('.modal-disp').attr('id', id)
  //console_log("modal-trigger-event"+id);
})

$(document).on('click', '#delete-event', function (e) {
  var id = $('.modal-disp').attr('id')
  console_log('delete' + id)
  delete_item(e, 'event', id, 'Event')
})
