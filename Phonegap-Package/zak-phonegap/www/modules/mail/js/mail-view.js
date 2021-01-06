var user = getUser()
var tzoffset = getUserTimeZone()

var url_string = window.location.href
var url = new URL(url_string)
var getid = url.searchParams.get('id')
var getthread = url.searchParams.get('thread')
var gettype = url.searchParams.get('type')

var item_class = 'mail-child'

var loadtype = ''
if (gettype != null && gettype == 'trash') {
  loadtype = 'trash'
}

var thread_id = ''
if (getthread != null) {
  thread_id = getthread
}

var id = ''

if (getid != null) {
  id = getid
  load_category('single_thread', id, thread_id, loadtype)
  load_mail_thread(id, thread_id, loadtype)
}
load_tabs()

function load_mail_thread(id, thread_id, loadtype) {
  //alert("hi");
  var form_data = new FormData()
  form_data.append('action', 'fetch-thread')
  form_data.append('display', 'userimage')
  form_data.append('mail_category', 'name')
  form_data.append('mark_read', 'true')
  form_data.append('id', id)
  form_data.append('thread_id', thread_id)
  form_data.append('user_id', user.id)
  form_data.append('loadtype', loadtype)
  form_data.append('time', tzoffset)
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/mail/mail.php',
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

      var html = ''
      var tithtml = ''
      if (data.success == true) {
        if (data.data.length > 0) {
          var title = data.data[0].title
          tithtml += '<h4 class="mail-title">' + title + '</h4>'

          var mailcatstr = ''
          if (data.data[0].mail_category_name.length > 0) {
            $.each(data.data[0].mail_category_name, function (cati, catv) {
              mailcatstr +=
                '<span class="badge mailcat new" title="' +
                catv +
                '">' +
                catv +
                '</span>'
            })
          }
          if (mailcatstr != '') {
            tithtml += '<div class="mail-category">' + mailcatstr + '</div>'
          }
        }
        $.each(data.data, function (i, v) {
          var image = v.from_user.image
          var name = v.from_user.name
          var toimage = v.to_user.image
          var toname = v.to_user.name
          if (v.to_user_id == user.id) {
            toname = 'Me'
          }

          image = get_display_filename(image, 'thumb')
          toimage = get_display_filename(toimage, 'thumb')

          var star_class = ''
          if (v.star.indexOf('|' + user.id + ':1|') > -1) {
            star_class = 'primary-text'
          }

          var readtitle = 'Mark as unread from here'
          var read_class = 'mdi-email-outline'
          var itemread = 'read'
          if (v.mark_read.indexOf('|' + user.id + ':1|') === -1) {
            itemread = 'unread'
          }

          var trash = '0'
          var trash_icon = 'mdi-delete-variant'
          var trash_title = 'Move to trash'
          if (v.trash.indexOf('|' + user.id + ':1|') > -1) {
            trash = '1'
            trash_icon = 'mdi-inbox'
            trash_title = 'Move to Inbox'
          }

          var display = true
          if (v.status == 'draft' && v.from_user_id != user.id) {
            display = false
          }

          if (display) {
            html +=
              '<li class="collection-item avatar ' +
              itemread +
              ' ' +
              item_class +
              '" id="item-' +
              v.id +
              '">'
            html += '<div class="maillink" data-id="' + v.id + '">'
            html +=
              '<div class="circle imgcheck imgcheck-' +
              v.id +
              '" data-id="' +
              v.id +
              '"><img class="" alt="' +
              name +
              '" title="' +
              name +
              '" src="' +
              filename_url(image) +
              '"></div>'
            html += '<div class="mail-viewlink" data-id="' + v.id + '">'
            html += '<span class="title">' + name + '</span>'
            html += '<span class="to">To: ' + toname + '</span>'
            html += '<p class="short-message">' + v.short_msg + '</p>'
            html += '<article class="message">' + v.message + '</article>'
            if (v['attachment'].length > 0) {
              $.each(v['attachment'], function (ai, av) {
                avimg = get_display_filename(av, 'small')
                avimg_full = get_display_filename(av, 'name')
                html +=
                  '<a class="img-wrap mailview-attachment" href="' +
                  filename_url(avimg_full) +
                  '" data-fancybox="images">'
                html +=
                  '<img class="img-responsive z-depth-1"  style="width: 100%;" src="' +
                  filename_url(avimg) +
                  '">'
                html += '</a>'
              })
            }
            html += '</div>'
            html +=
              '<span class="time full" title="' +
              v.disptime.full +
              '">' +
              v.disptime.full +
              '</span>'
            html +=
              '<span class="time info" title="' +
              v.disptime.full +
              '">' +
              v.disptime.info +
              '</span>'
            html += '</div>'
            html += '<div class="secondary-content">'
            if (v.attachment.length > 0) {
              html +=
                '<span title="Has attachments" class="has-attachmentbtn"><i class="mdi mdi-attachment"></i></span>'
            }
            html +=
              '<span title="" class="' +
              star_class +
              ' toggleStar star-' +
              v.id +
              '"  data-thread_id="' +
              v.thread_id +
              '" data-id="' +
              v.id +
              '" data-index="id"><i class="mdi mdi-star-outline"></i></span>'
            html +=
              '<span title="' +
              readtitle +
              '" class="toggleRead mark_read-' +
              v.id +
              '" data-thread_id="' +
              v.thread_id +
              '" data-id="' +
              v.id +
              '" data-ts="' +
              v.timestamp +
              '" data-index="id"><i class="mdi ' +
              read_class +
              '"></i></span>'
            html +=
              '<a href="#modal-mailviewmove" id="' +
              v.id +
              '" class="modal-trigger trash-thread toggletrashbtn toggletrash-' +
              v.id +
              '" data-thread_id="' +
              v.thread_id +
              '" data-id="' +
              v.id +
              '" data-index="id" data-trash="' +
              trash +
              '" title="' +
              trash_title +
              '"><i class="mdi ' +
              trash_icon +
              '"></i></a>'
            if (v.status != 'draft') {
              html +=
                '<a href="ui-app-mail-compose.html?reply=' +
                v.id +
                '&thread=' +
                v.thread_id +
                '" id="' +
                v.id +
                '" class="reply-threadbtn" data-id="' +
                v.id +
                '" title="Reply"><i class="mdi mdi-reply"></i></a>'
            }
            html +=
              '<a href="ui-app-mail-compose.html?forward=' +
              v.id +
              '" id="' +
              v.id +
              '" class="forward-threadbtn" data-id="' +
              v.id +
              '" title="Forward"><i class="mdi mdi-forward"></i></a>'
            if (v.status == 'draft') {
              html +=
                '<a href="ui-app-mail-compose.html?id=' +
                v.id +
                '" id="' +
                v.id +
                '" class="edit-threadbtn" data-id="' +
                v.id +
                '" title="Edit Draft"><i class="mdi mdi-pencil"></i></a>'
            }
            html += '</div>'
            html += '</li>'
          }
        })
      } // data.success true
      if (html == '') {
        html = "<p class='nodatafound z-depth-1'>No Data Found</p>"
      }
      $('#response').html(html)
      $('#response-title').html(tithtml)
      $('.modal').modal()
      $('.collection-item').last().addClass('lastchild')
    },
    error: errorHandling,
  })
}

$(document).on('click', '.maillink', function (e) {
  let id = $(this).attr('data-id')
  $('#item-' + id).toggleClass('read unread')
})
