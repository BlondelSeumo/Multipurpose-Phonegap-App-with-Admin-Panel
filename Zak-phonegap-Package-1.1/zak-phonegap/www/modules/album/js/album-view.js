$(document).ready(function () {
  if (typeof col == 'undefined') {
    col = 's6'
  }
  if (typeof fullwidth == 'undefined') {
    fullwidth = ''
  }
  if (typeof masonry == 'undefined') {
    masonry = 'masonry'
  }
  if (typeof circular == 'undefined') {
    circular = ''
  }
  if (typeof showcontent == 'undefined') {
    showcontent = false
  }
  if (typeof equal_height == 'undefined') {
    equal_height = ''
  }
  if (typeof showtitle == 'undefined') {
    showtitle = false
  }
  /*
    if (typeof align_blog == 'undefined') { align_blog = "";}
    if (typeof showtext == 'undefined') { showtext = false;}
    if (typeof text_limit == 'undefined') { text_limit = 200;}
    if (typeof title_limit == 'undefined') { title_limit = 18;}
    if (typeof htag == 'undefined') { htag = "h5";}
    if (typeof showimg == 'undefined') { showimg = true;}
    if (typeof showtags == 'undefined') { showtags = true;}
    */

  var url_string = window.location.href
  var url = new URL(url_string)
  var getid = url.searchParams.get('id')
  //console_log(getid);
  let user = getUser()

  if (getid != null) {
    //alert("hi");
    var form_data = new FormData()
    form_data.append('action', 'fetch')
    form_data.append('attachment', 'array')
    form_data.append('id', getid)
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
        $('#response').val('Connecting...')
      },
      success: function (response) {
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.name != '') {
          $('.pagetitle').append(': ' + data.name)
        }
        // no. of columns
        if (data.column_class != '') {
          col = data.column_class
        }

        // masonry or not
        if (data.display_type == 'masonry' || masonry == 'masonry') {
          masonry = 'portfolio-masonry'
        } else {
          masonry = ''
        }

        // Full width
        if (data.fullwidth == '1') {
          fullwidth = 'fullwidth'
        } else {
          fullwidth = ''
        }
        // equal height
        if (data.equal_height == '1') {
          equal_height = 'equal-height'
        } else {
          equal_height = ''
        }
        // Circular
        if (data.circular == '1') {
          circular = 'circular'
        } else {
          circular = ''
        }

        // content type
        if (data.display_content == 'showcontent') {
          showcontent = true
          showtitle = false
        } else if (data.display_content == 'showtitle') {
          showcontent = false
          showtitle = true
        } else {
          showcontent = false
          showtitle = false
        }

        var html = ''
        var colclass = ''
        var imgclass = ''
        if (masonry != '') {
          colclass = 'grid-item'
        }
        if (circular != '') {
          imgclass = 'circle'
        }

        if (fullwidth == '') {
          html += '<div class="container">'
          html += '<div class="section">'
        }

        // add height, carouselcols,
        // show display_content, fullwidth,
        // hide equalheigt, circular, cols

        var carousel_column = 'single' // multi
        if (data.carousel_column != '') {
          carousel_column = data.carousel_column
        }

        var carousel_align = 'left-align' // center-align, right-align
        if (data.carousel_align != '') {
          carousel_align = data.carousel_align
        }

        var carousel_class =
          'carousel-fullwidth carousel-slider carousel-fullscreen fullscreencarousel'
        if (carousel_column == 'multi') {
          carousel_class = 'carousel-basic carousel-small'
        }

        if (data.display_type == 'carousel') {
          html +=
            '<div class="carousel ' +
            carousel_class +
            ' carousel-' +
            data.id +
            '">'
          $.each(data['attachment'], function (i, v) {
            if (
              (data.display_content == 'showcontent' ||
                data.display_content == 'showtitle') &&
              carousel_column == 'single'
            ) {
              html += '<div class="carousel-item" href="#c' + v.id + '">'
              html +=
                '<div class="bg" style="background-image: url(' +
                filename_url(v.name) +
                ')"  id="carousel-image-' +
                v.id +
                '"></div>'
              html +=
                '<div class="item-content ' + carousel_align + ' white-text">'
              html += '<div class="spacer-xlarge"></div>'
              html += '<div class="spacer-xlarge"></div>'
              html += '<h3>' + v.title + '</h3>'
              if (data.display_content == 'showcontent') {
                html += '<h5 class="light white-text">' + v.brief + '</h5>'
              }
              html += '</div>'
              html += '</div>'
            } else {
              html += '<a class="carousel-item" href="#c' + v.id + '">'
              html +=
                '<img src="' +
                filename_url(v.name) +
                '" id="carousel-image-' +
                v.id +
                '">'
              html += '</a>'
            }
          })
          html += '</div>'
        } else {
          html +=
            '<div class="row ui-mediabox ' +
            masonry +
            ' ' +
            fullwidth +
            ' ' +
            equal_height +
            ' ' +
            circular +
            '">'
          //console_log(data["items"][0].name);
          $.each(data['attachment'], function (i, v) {
            //console_log(v.name);
            //console_log(i);
            //console_log(v);

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
              '" href="' +
              filename_url(v.name) +
              '" data-fancybox="images" data-caption="' +
              v.title +
              '">'
            html +=
              '<img class="z-depth-1"  style="width: 100%;" src="' +
              filename_url(v.name) +
              '">'
            html += '</a>'
            if (showcontent || showtitle) {
              html += '<div class="port-data">'
              html += '<h5>' + v.title + '</h5>'
              if (!showtitle) {
                html += '<p>' + v.brief + '</p>'
                //html += '<a href="#!">Explore <i class="mdi mdi-arrow-right"></i></a>';
              }
              html += '<div class="spacer"></div>'
              html += '<div class="divider"></div>'
              html += '<div class="spacer"></div>'
              html += '</div>'
            }
            html += '</div>'
          })

          html += '</div>'
        }

        if (fullwidth == '') {
          html += '</div>'
          html += '</div>'
        }

        $('#response').html(html)

        //console_log("load html");
        var options = {}
        if (data.fullwidth == '1' || carousel_column == 'single') {
          options['fullwidth'] = true
        }

        if (carousel_column == 'multi') {
          options['numVisible'] = 5
        }

        options['indicators'] = true
        console_log(options)

        if (data.display_type == 'carousel') {
          var height = $(window).height()
          if (data.carousel_height != '') {
            height = data.carousel_height
          }
          $('.carousel').css('height', height)
          $('.carousel').carousel(options)

          setTimeout(autoplay, 3500)
          function autoplay() {
            $('.carousel').carousel('next')
            setTimeout(autoplay, 3500)
          }
        } else if (data.display_type == 'masonry') {
          masonry_after_loading_images('.portfolio-masonry')
        }
      },

      error: errorHandling,
    })
  } // end getid
})
