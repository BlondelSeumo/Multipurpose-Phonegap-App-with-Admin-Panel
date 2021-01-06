$(document).ready(function () {
  if (typeof col == 'undefined') {
    col = 's12'
  }
  if (typeof fullwidth == 'undefined') {
    fullwidth = ''
  }
  if (typeof masonry == 'undefined') {
    masonry = ''
  }
  if (typeof align_blog == 'undefined') {
    align_blog = ''
  }
  // if (typeof text_limit == "undefined") {
  // 	text_limit = 200;
  // }
  // if (typeof title_limit == "undefined") {
  // 	title_limit = 18;
  // }
  if (typeof showtext == 'undefined') {
    showtext = true
  }
  if (typeof htag == 'undefined') {
    htag = 'h5'
  }
  if (typeof showimg == 'undefined') {
    showimg = true
  }
  if (typeof showtags == 'undefined') {
    showtags = false
  }
  if (typeof equal_height == 'undefined') {
    equal_height = ''
  }

  var user = getUser()
  var tzoffset = getUserTimeZone()

  var blog_category = '1' // For Grid category
  if (masonry != '') {
    blog_category = '2' // For Masonry category
  }
  //alert("hi"); //
  var form_data = new FormData()
  form_data.append('time', tzoffset)
  form_data.append('order', 'blog_date DESC')
  form_data.append('status', 'publish')
  form_data.append('blog_category', blog_category)
  form_data.append('category', 'name')
  form_data.append('user', 'userimage')
  form_data.append('action', 'fetch-all')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)
  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/blog/blog.php',
    data: form_data,
    processData: false,
    contentType: false,
    crossDomain: true,
    cache: false,
    beforeSend: function () {
      $('#response').val('Loading...')
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
        //console_log(v); //
        html += '<div class="col ' + col + '">'
        if (showimg) {
          html +=
            '<div class="blog-img-wrap"><a class="img-wrap" href="ui-blogs-view.html?id=' +
            v.id +
            '">'
          html +=
            '<img class="z-depth-1" style="width: 100%;" src="' +
            filename_url(v.image.name) +
            '">'
          html += '</a></div>'
        }
        html += '<div class="blog-info">'

        html += '<a href="ui-blogs-view.html?id=' + v.id + '">'
        html += '<' + htag + ' class="title">' + v.title + '</' + htag + '>'
        html += '</a>'
        html +=
          '<div class="small date" title="' +
          v.blog_disptime.full +
          '' +
          '">' +
          v.blog_disptime.info +
          '</div>'
        if (showtags) {
          html += '<span class="small tags">'
          html += '<a class="small" href="#!">' + v.blog_category + '</a>'
          html += '</span>'
        }
        if (showtext) {
          html += '<p class="bot-0 text">' + v.brief + '</p>'
        }
        if (col == 's12') {
          html += '<div class="spacer"></div>'
          html += '<div class="divider"></div>'
          html += '<div class="spacer"></div>'
        } else {
          html += '<div class="spacer"></div>'
        }
        html += '</div>'

        html += '</div>'
      })
      $('#response').html(html)

      if (masonry != '') {
        masonry_after_loading_images('.blogs-masonry')
      }
    },
  })
})
