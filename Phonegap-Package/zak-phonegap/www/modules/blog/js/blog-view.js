var user = getUser()
var tzoffset = getUserTimeZone()

var url_string = window.location.href
var url = new URL(url_string)
var getid = url.searchParams.get('id')
console_log(getid)

function load_blog_view() {
  if (getid != null) {
    //alert('hi')
    var form_data = new FormData()
    form_data.append('id', getid)
    form_data.append('action', 'fetch')
    form_data.append('time', tzoffset)
    form_data.append('source', 'app')
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
        $('#response').html('<p class="pad-15">Connecting...</p>')
      },
      success: function (response) {
        // $('#response').html('')
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.success == true) {
          if (data.title != '') {
            $('#title').html(data.title)
            $('a.img-wrap').attr('data-caption', data.title)
          }

          if (data.blog_date != '') {
            $('#blog_date').html(data.blog_disptime.full)
            $('#blog_date').attr('title', data.blog_disptime.full)
          }

          if (data.description != '') {
            $('#blog-content').html(data.description)
          }

          if (data.attachment != undefined) {
            blogimage = get_display_filename(data.attachment[0], 'name')
            console.log(blogimage)
            $('a.img-wrap').html(
              '<img class="z-depth-1" style="width: 100%;" src="' +
                filename_url(blogimage) +
                '">',
            )
            $('a.img-wrap').attr('href', filename_url(blogimage))
          }
        } // end success
      },
      error: errorHandling,
    })
  } // end getid
} // end load function
