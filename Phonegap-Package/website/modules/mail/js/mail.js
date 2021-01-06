var user = getUser()
var tzoffset = getUserTimeZone()

var url_string = window.location.href
var url = new URL(url_string)
var gettype = url.searchParams.get('type')
var getcat = url.searchParams.get('cat')
//console_log(getid);

var item_class = 'mail-item'
var disable_next = false
var disable_prev = true

var MINSEARCHLENGTH = 5
var searchstr = ''

check_search()

// Set Page title
if (gettype != null) {
  $('.pagetitle .mailtype').html(' : ' + gettype)
} else if (getcat != null) {
  $('.pagetitle .mailtype').html(' : ' + getcat)
} else if (searchstr != '') {
  $('.pagetitle .mailtype').html(' : Search (' + searchstr + ') ')
} else {
  $('.pagetitle .mailtype').html(' : Inbox')
}

//$(".pagetitle .mailtype").append("("+user.id+")");

load_category('multiple_thread')
load_mails('')
load_tabs()

function load_mails(checked_ids = '') {
  var getcurrpage = Number($('#currpage').html())
  var getpagecount = Number($('#pagecount option:selected').val())

  var form_data = new FormData()
  form_data.append('user_id', user.id)
  form_data.append('action', 'fetch-all')
  form_data.append('from', 'userimage')
  form_data.append('to', 'userimage')
  form_data.append('mail_category', 'name')
  form_data.append('parent', 'eq0')
  form_data.append('cat', getcat)
  form_data.append('type', gettype) //null is inbox, sent, trash, star
  form_data.append('currpage', getcurrpage)
  form_data.append('pagecount', getpagecount)
  form_data.append('search', searchstr)
  form_data.append('time', tzoffset)
  form_data.append('id', '')
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
      console_log(response)
      var html = ''
      let data = JSON.parse(response)
      check_user_token(data)

      //console_log(data["items"][0].name);
      if (checked_ids != '') {
        checked_ids = ',' + checked_ids + ','
      }

      console_log('checked_ids: ' + checked_ids)

      $.each(data['items'], function (i, v) {
        //console_log(v.name);
        //console_log(i);
        //console_log(v);
        var checked = ''
        if (checked_ids != '') {
          var present = checked_ids.indexOf(',' + v.id + ',')
          if (present > -1) {
            checked = 'checked'
          }
        }

        var image = v.from_user.image
        var name = v.from_user.name
        if (v.from_user_id == user.id) {
          image = v.to_user.image
          name = v.to_user.name
        }

        image = get_display_filename(image, 'thumb')

        // Read/Unread
        var unread_count = ''
        var unread_badge = ''
        var unread_disp = 'hidecount'
        var readtitle = 'Mark as unread'
        var read_class = 'mdi-email-outline'
        var item_read = 'read'
        if (
          v['unread-' + user.id] != undefined &&
          v['unread-' + user.id].length > 0
        ) {
          unread_count = v['unread-' + user.id].length + ' unread'
          unread_disp = ''
          readtitle = 'Mark as read'
          read_class = 'mdi-email-open-outline'
          item_read = 'unread'
        }
        unread_badge =
          '<span class="readcount badge new primary-bg" title="' +
          unread_count +
          '" id="badge-' +
          v.id +
          '" >' +
          v['unread-' + user.id].length +
          '</span>'

        // Starred
        var star_count = 'No starred'
        var star_class = ''
        if (
          v['star-' + user.id] != undefined &&
          v['star-' + user.id].length > 0
        ) {
          var star_count = v['star-' + user.id].length + ' starred'
          star_class = 'primary-text'
        }

        var trash = '0'
        var trash_icon = 'mdi-delete-variant'
        var trash_title = 'Move to trash'
        var trash_count = ''
        if (v['trash-' + user.id] != undefined) {
          var trash_arr = v['trash-' + user.id]
          //console_log("trash:"+v.id+": "+trash_arr.indexOf(v.id));
          if (trash_arr.indexOf(v.id) > -1) {
            // item is in trash
            trash = '1'
            trash_icon = 'mdi-inbox'
            trash_title = 'Move to Inbox'
          }

          if (gettype == 'trash') {
            trash_count = '' + trash_arr.length + ' trash mail'
            if (trash_arr.length > 1) {
              trash_count = '' + trash_arr.length + ' trash mails'
            }
          }
        }

        if (gettype == 'trash') {
          trash = '1'
          trash_icon = 'mdi-inbox'
          trash_title = 'Move to Inbox'
        }

        // on inbox page show move to trash icon and move whole thread to trash
        // similarly on trash page show move to inbox icon and move whole thread to inbox
        //(even if whole thread is not in trash and only some child is in trash)

        var mailcatstr = ''
        if (v.mail_category_name.length > 0) {
          $.each(v.mail_category_name, function (cati, catv) {
            mailcatstr +=
              '<span class="badge mailcat new" title="' +
              catv +
              '">' +
              catv +
              '</span>'
          })
        }
        var param = ''
        if (gettype == 'trash') {
          param = '&type=trash'
        }

        html +=
          '<li class="collection-item avatar ' +
          item_class +
          ' ' +
          item_read +
          '" id="item-' +
          v.id +
          '">'

        html += '<div class="maillink">'
        html +=
          '<div class="circle imgcheck imgcheck-' +
          v.id +
          ' ' +
          checked +
          '" data-id="' +
          v.id +
          '"><img class="" alt="' +
          name +
          '" title="' +
          name +
          '" src="' +
          filename_url(image) +
          '"></div>'
        html +=
          '<a class="mail-viewlink" href="ui-app-mail-view.html?id=' +
          v.id +
          '&thread=' +
          v.thread_id +
          param +
          '">'
        html += '<span class="from">' + name + '</span>'
        html += '<span class="title">' + v.title + '</span>'
        html += '<div class="mail-badge">' + mailcatstr + '</div>'
        if (gettype == 'trash') {
          html += '<div class="trash-count">' + trash_count + '</div>'
        }
        html += '<p>' + v.latest.short_msg + '</p>'
        html += '</a>'
        html +=
          '<span class="time" title="' +
          v.latest.disptime.full +
          '">' +
          v.latest.disptime.info +
          '</span>'
        html += '</div>'
        html += '<div class="secondary-content">'

        if (v.latest.attachment.length > 0) {
          html +=
            '<span title="Has attachments" class="has-attachmentbtn"><i class="mdi mdi-attachment"></i></span>'
        }
        html +=
          '<span title="' +
          star_count +
          '" class="' +
          star_class +
          ' toggleStar star-' +
          v.id +
          '" data-thread_id="' +
          v.thread_id +
          '" data-id="' +
          v.id +
          '" data-index="thread_id"><i class="mdi mdi-star-outline"></i></span>'
        html +=
          '<span title="' +
          readtitle +
          '" class="toggleRead ' +
          unread_disp +
          ' mark_read-' +
          v.id +
          '" data-thread_id="' +
          v.thread_id +
          '" data-id="' +
          v.id +
          '" data-index="thread_id"><i class="mdi ' +
          read_class +
          '"></i>' +
          unread_badge +
          '</span>'
        html +=
          '<a href="#modal-mailmove" id="' +
          v.id +
          '" class="modal-trigger trash-mail toggletrashbtn toggletrash-' +
          v.id +
          '"  data-thread_id="' +
          v.thread_id +
          '" data-id="' +
          v.id +
          '" data-index="thread_id" data-trash="' +
          trash +
          '" title="' +
          trash_title +
          '"><i class="mdi ' +
          trash_icon +
          '"></i></a>'
        html += '</div>'

        html += '</li>'
      })
      if (html == '') {
        $('.selall_label').hide()
        $('.mail-select-row').hide()
        $('.mail-pages-area').hide()
        html =
          "<p class='nodatafound z-depth-1'>No Mails Found. <a href='ui-app-mail-compose.html'>Send a mail</a></p>"
      } else {
        $('.selall_label').show()
        $('.mail-select-row').show()
        $('.mail-pages-area').show()
      }
      $('#response').html(html)
      $('.modal').modal()
      selall_check()
      setPage()
    },
    error: errorHandling,
  })
} // end function

function check_search(e = '') {
  searchstr = $('#search-mail').val()
  console_log('check search:' + searchstr)
  if (searchstr != '') {
    if (searchstr.length <= MINSEARCHLENGTH) {
      searchstr = ''
    }
  }
  console_log('check search:' + searchstr)
  if (e.which == 13) {
    if (searchstr == '') {
      $('#search-mail').val('')
      notify(
        'More than ' +
          MINSEARCHLENGTH +
          ' characters required to perform search',
      )
    }
    load_mails()
  }
}

$(document).on('keyup', '#search-mail', function (e) {
  check_search(e)
})

$(document).on('change', '#pagecount', function (e) {
  let pagecount = Number($('#pagecount option:selected').val())
  console_log(pagecount)
  $('#currpage').html('1')
  load_mails()
})

$(document).on('click', '.loadpage', function (e) {
  let action = e.currentTarget.dataset.id
  let currpage = Number($('#currpage').html())
  console_log(action + currpage)

  if (action == 'next') {
    currpage = currpage + 1
    $('#currpage').html(currpage)
    load_mails()
  } else if (action == 'previous') {
    currpage = currpage - 1
    $('#currpage').html(currpage)
    load_mails()
  }
})

function setPage() {
  let currpage = Number($('#currpage').html())
  let pagecount = Number($('#pagecount option:selected').val())
  let items = $('.' + item_class).length
  console_log(
    'currpage: ' + currpage + ' pagecount: ' + pagecount + ' Items: ' + items,
  )

  if (items == pagecount) {
    console_log('1: Allow Next')
    disable_next = false
  } else if (items > 0 && items < pagecount && currpage == 1) {
    console_log('2: Disable Next')
    console_log('2: Disable Prev')
    disable_next = true
    disable_prev = true
  } else if (items > 0 && items < pagecount) {
    console_log('3: Disable Next')
    console_log('3: Allow Prev')
    disable_next = true
    disable_prev = false
  } else if (items == 0 && currpage == 1) {
    console_log('4: Disable Next')
    console_log('4: Disable Prev')
    console_log('No Data to load')
    disable_next = true
    disable_prev = true
    currpage = 1
  } else if (items == 0) {
    console_log('5: Enable Next')
    console_log('5: Disable Prev')
    disable_next = false
    disable_prev = true
    currpage = 1
    $('#currpage').html(currpage)
    load_mails()
  }

  if (currpage > 1) {
    console_log('5: Allow Previous')
    disable_prev = false
  } else {
    console_log('6: Disable Previous')
    disable_prev = true
  }

  togglePagination(disable_next, disable_prev)
}

function togglePagination(disable_next, disable_prev) {
  if (disable_next) {
    $('.loadpage.next').addClass('disabled')
  } else {
    $('.loadpage.next').removeClass('disabled')
  }
  if (disable_prev) {
    $('.loadpage.previous').addClass('disabled')
  } else {
    $('.loadpage.previous').removeClass('disabled')
  }
  $('.loadpage.next').prop('disabled', disable_next)
  $('.loadpage.previous').prop('disabled', disable_prev)
}

/*$(document).on( 'click', '.bulkaction .btn', function (e){
                let ids = checked_ids();
                if(ids != ""){

                    let action = $(this).attr("data-id");
                    let btn = $(this).attr("title");
                    console_log(action+" : "+btn);
                    
                    let msg = "Are you sure you want to perform this action";

                    if(action == "category"){
                        console_log("category change");
                    } else {

                        if(action == "star"){
                            msg = "Are you sure you want to star selected threads?";
                        }
                        else if(action == "unstar"){
                            msg = "Are you sure you want to unstar selected threads?";
                        }
                        else if(action == "read"){
                            msg = "Are you sure you want to mark selected threads as read?";
                        }
                        else if(action == "unread"){
                            msg = "Are you sure you want to mark selected threads as unread?";
                        }
                        else if(action == "trash"){
                            msg = "Are you sure you want to move selected threads to trash?";
                        }
                        else if(action == "inbox"){
                            msg = "Are you sure you want to move selected threads back to inbox?";
                        }

                        $(".modal-bulk-msg").attr("id",action);
                        $(".modal-bulk-msg").html(msg);
                        $("#modal_bulk #confirm").html(btn);
                        $('#modal_bulk').modal('open');

                    }

                }

            });*/

/*$(document).on( 'click', '#confirm', function (e){
                var action = $(".modal-bulk-msg").attr("id");
                let ids = checked_ids();
                console_log("action : "+action+" : "+ids);
            });*/

/*$(document).on( 'click', '#delete', function (e){
                var id = $(".modal-disp").attr("id");
                console_log("delete"+id);
                toggleTrash(e, id);
            });*/

$(document).on('click', '#selall', function (e) {
  var checked = $('#selall').is(':checked')
  if (checked) {
    $('.imgcheck').addClass('checked')
  } else {
    $('.imgcheck').removeClass('checked')
  }
  let ids = checked_ids()
  selall_check()
})

$(document).on('click', '.imgcheck', function (e) {
  //var checked = $(this).hasClass('checked');
  $(this).toggleClass('checked')
  let ids = checked_ids()
  selall_check()
})

$(document).on('click', '.bulkaction .btn-bulk', function (e) {
  e.stopPropagation()

  let action = $(this).attr('data-id')
  let btn = $(this).attr('title')
  console_log(action + ' : ' + btn)

  let ids = checked_ids()
  if (ids != '' && action != 'category') {
    var form_data = new FormData()
    form_data.append('action', 'bulk')
    form_data.append('type', action)
    form_data.append('index', 'thread_id')
    form_data.append('ids', ids)
    form_data.append('user_id', user.id)
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
        //$("#response").html('<p class="pad-15">Connecting...</p>');
      },
      success: function (response) {
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        if (data.success == true) {
          load_mails(ids)
          var notifymsg = data.msg
          /*if(mark_read == "0"){
                                        var notifymsg = "Thread Marked as Unread successfully!";
                                    }*/
          notify(notifymsg)
        }
      },
      error: errorHandling,
    })
  }
})
