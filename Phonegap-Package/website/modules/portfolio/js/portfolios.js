if (typeof col == 'undefined') {
  col = 's6'
}
if (typeof fullwidth == 'undefined') {
  fullwidth = ''
} // "fullwidth", ""
if (typeof masonry == 'undefined') {
  masonry = 'portfolio-masonry'
}
if (typeof showcontent == 'undefined') {
  showcontent = false
}
if (typeof equal_height == 'undefined') {
  equal_height = ''
}
if (typeof showtitle == 'undefined') {
  showtitle = true
}

var htag = 'h5'
if (col != 's12') {
  htag = 'h6'
}

/*
          var url_string = window.location.href;
          var url = new URL(url_string);
          var getowner = url.searchParams.get("owner");
          //console_log(getowner);

          var user = getUser();
          var owner = "";

          if(getowner == null || getowner == ""){
            owner = user.id;
          } else {
            owner = getowner;
          }*/

function load_portfolios(element = '') {
  if (element == '') {
    element = 'response'
  }
  let user = getUser()

  //alert("hi");
  var form_data = new FormData()
  form_data.append('action', 'fetch-all')
  //form_data.append('owner', owner);
  //form_data.append('user_id', user.id);
  form_data.append('user', 'userimage')

  // fetch public and visible to friends albums
  /*if(getowner != null && getowner != user.id){
                form_data.append('visibility', 'friends');
                form_data.append('active', '1');
            } else {
                form_data.append('visibility', 'myalbums');
            }*/

  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/portfolio/portfolio.php',
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
        if (v.userinfo != undefined) {
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
          '">'
        html +=
          '<a class="img-wrap ' +
          imgclass +
          '" href="ui-portfolio-view.html?id=' +
          v.id +
          '">'
        html +=
          '<img class="z-depth-1" style="width: 100%;" src="' +
          filename_url(v.image.name) +
          '">'
        html += '</a>'
        html += '<div class="port-data center">'
        if (showtitle) {
          html +=
            '<a class="port-title" href="ui-portfolio-view.html?id=' +
            v.id +
            '">'
          html += '<' + htag + '>' + v.name + '</' + htag + '>'
          html += '</a>'
        }
        html += '</div>'
        if (showcontent && showtitle) {
          html += '<div class="port-info center">'
          // if (uname != "") {
          // 	html +=
          // 		'<div class="circle" data-id="' +
          // 		uname +
          // 		'"><img  style="width:40px" class="" alt="' +
          // 		uname +
          // 		'" title="' +
          // 		uname +
          // 		'" src="' +
          // 		filename_url(uimage) +
          // 		'"></div>';
          // }
          html += '<div>' + v.location + '</div>'
          html += '<p>' + v.brief + '</p>'
          html += '</div>'

          html += '<div class="divider"></div>'
        }
        html += '</div>'
      })

      html += '</div>'

      if (fullwidth == '') {
        html += '</div>'
        html += '</div>'
      }

      $('#' + element).html(html)
      if (masonry != '') {
        masonry_after_loading_images('.portfolio-masonry')
      }
    },

    error: errorHandling,
  })

  //} // end getowner
}
