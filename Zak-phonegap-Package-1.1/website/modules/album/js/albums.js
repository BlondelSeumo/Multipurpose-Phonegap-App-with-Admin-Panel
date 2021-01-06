if (typeof col == 'undefined') {
  col = 's12 l6'
}
if (typeof fullwidth == 'undefined') {
  fullwidth = ''
} // "fullwidth", ""
if (typeof masonry == 'undefined') {
  masonry = 'portfolio-masonry'
}
if (typeof showcontent == 'undefined') {
  showcontent = true
}
if (typeof equal_height == 'undefined') {
  equal_height = ''
}
if (typeof showtitle == 'undefined') {
  showtitle = true
}

var url_string = window.location.href
var url = new URL(url_string)
var getowner = url.searchParams.get('owner')
//console_log(getowner);

var user = getUser()
var owner = ''

if (getowner == null || getowner == '') {
  owner = user.id
} else {
  owner = getowner
}

function load_albums(element = '', ofuser = '', loadin = '') {
  if (element == '') {
    element = 'response'
  }

  //alert("hi");
  var form_data = new FormData()
  form_data.append('action', 'fetch-all')
  form_data.append('user_id', user.id)
  form_data.append('user', 'userimage')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  if (ofuser != '' && loadin == 'profile') {
    //console.log(ofuser + loadin);
    form_data.append('owner', ofuser)
    if (ofuser == user.id) {
      form_data.append('visibility', 'myalbums')
      form_data.append('active', '1')
    } else {
      form_data.append('visibility', 'friends')
      form_data.append('active', '1')
    }
  } else {
    form_data.append('owner', owner)
    // fetch public and visible to friends albums
    if (getowner != null && getowner != user.id) {
      form_data.append('visibility', 'friends')
      form_data.append('active', '1')
    } else {
      form_data.append('visibility', 'myalbums')
    }
  }

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/album/album.php',
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
      let data = JSON.parse(response)
      check_user_token(data)

      var html = ''
      var colclass = ''
      var imgclass = ''
      if (masonry != '') {
        colclass = 'grid-item'
      }
      if (data['items'].length > 0) {
        if (fullwidth == '') {
          html += '<div class="container">'
          html += '<div class="section">'
        }

        html +=
          '<div class="row ui-mediabox ' +
          masonry +
          ' ' +
          fullwidth +
          ' ' +
          equal_height +
          ' ">'
        //console_log(data["items"][0].name);
        $.each(data['items'], function (i, v) {
          //console_log(v.name);
          //console_log(i);
          //console_log(v);

          var uname = ''
          var uimage = ''
          if (v.userinfo[0] != undefined) {
            uname = v.userinfo[0].name
            uimage = get_display_filename(v.userinfo[0].image, 'thumb')
          }

          html +=
            '<div class="col ' +
            col +
            ' ' +
            colclass +
            '" id="item-' +
            v.id +
            '" data-title="' +
            v.name +
            '">'
          html +=
            '<a class="img-wrap ' +
            imgclass +
            '" href="ui-app-album-view.html?id=' +
            v.id +
            '">'
          html +=
            '<img class="z-depth-1" style="width: 100%;" src="' +
            filename_url(v.image.name) +
            '">'
          html += '</a>'
          if (showcontent || showtitle) {
            html += '<div class="port-data">'
            html +=
              '<a class="title" href="ui-app-album-view.html?id=' + v.id + '">'
            html += '<h5>' + v.name + '</h5>'
            html += '</a>'
            html += '<div class="port-info">'
            if (uname != '') {
              html +=
                '<span class="owner" data-id="' +
                uname +
                '"><img class="circle" class="" alt="' +
                uname +
                '" title="' +
                uname +
                '" src="' +
                filename_url(uimage) +
                '">' +
                uname +
                '</span>'
            }
            if (showcontent) {
              html +=
                "<span class='location'><i class='mdi mdi-map-marker-outline'></i> " +
                v.location +
                '</span>'
              html += '<p>' + v.brief + '</p>'
            }
            html += '</div>'

            if (user.id == v.user_id) {
              html += '<div class="port-actions">'
              html +=
                '<a class="btn btn-small" href="ui-app-album-view.html?id=' +
                v.id +
                '">View</a>'
              html +=
                '<a class="btn btn-small" href="ui-app-album-add.html?id=' +
                v.id +
                '">Edit</a>'
              html +=
                '<a class="btn btn-small" href="ui-app-album-manage.html?id=' +
                v.id +
                '">Manage</a>'
              html +=
                '<a class="btn btn-small" href="ui-app-album-settings.html?id=' +
                v.id +
                '">Settings</a>'
              html +=
                '<a href="#modal-album" id="' +
                v.id +
                '" class="btn btn-small modal-trigger modal-trigger-album">Delete</a>'
              html +=
                '<a class="btn btn-small" href="ui-app-album-addmedia.html?album=' +
                v.id +
                '">Add Media</a>'
              html += '</div>'
            }

            html += '<div class="spacer"></div>'
            html += '<div class="divider"></div>'
            html += '<div class="spacer"></div>'
            html += '</div>'
          }
          html += '</div>'
        })

        html += '</div>'

        if (fullwidth == '') {
          html += '</div>'
          html += '</div>'
        }
      } else {
        html += '<div class="container">'
        html += '<div class="section">'
        html +=
          "<p class='nodatafound z-depth-1'>No album found. <a href='ui-app-album-add.html'>Add new album</a></p>"
        html += '</div>'
        html += '</div>'
      }

      $('#' + element).html(html)
      if (masonry != '') {
        masonry_after_loading_images('.portfolio-masonry')
      }
      $('.modal').modal()
    },

    error: errorHandling,
  })

  //} // end getowner
}

$(document).on('click', '.modal-trigger-album', function (e) {
  var id = e.currentTarget.id
  console_log(id)
  var name = $('#item-' + id + '').attr('data-title')
  //console_log(name);
  $('.modal-disp').html(name)
  $('.modal-disp').attr('id', id)
  //console_log("modal-trigger-album"+id);
})

$(document).on('click', '#delete-album', function (e) {
  var id = $('.modal-disp').attr('id')
  console_log('delete' + id)
  delete_item(e, 'album', id, 'Album')
})
