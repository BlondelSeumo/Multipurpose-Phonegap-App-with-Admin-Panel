function checked_ids() {
  let idsstr = ''
  $('.imgcheck.checked').each(function () {
    var id = $(this).attr('data-id')
    idsstr += id + ','
  })
  console_log(idsstr)
  if (idsstr != '') {
    $('.bulkaction').show()
  } else {
    $('.bulkaction').hide()
  }
  return idsstr
}

function selall_check() {
  console_log('call selall_check')
  let total = $('.imgcheck').length
  let checked_len = $('.imgcheck.checked').length
  console_log(total + ' : ' + checked_len)
  if (total == 0) {
    //uncheck all
    $('.bulkaction').hide()
    $('#selall').prop('checked', false)
    $('.selall_label span').removeClass('partial')
  } else if (total == checked_len) {
    // check all
    $('.bulkaction').show()
    $('#selall').prop('checked', true)
    $('.selall_label span').removeClass('partial')
  } else if (total > checked_len && checked_len > 0) {
    // partial check
    $('.bulkaction').show()
    $('#selall').prop('checked', false)
    $('.selall_label span').addClass('partial')
  } else {
    //uncheck all
    $('.bulkaction').hide()
    $('#selall').prop('checked', false)
    $('.selall_label span').removeClass('partial')
  }
}

function load_tabs() {
  var mailtypes = [
    { type: 'inbox', name: 'Inbox' },
    { type: 'sent', name: 'Sent' },
    { type: 'star', name: 'Starred' },
    { type: 'trash', name: 'Trash' },
    { type: 'unread', name: 'Unread' },
    { type: 'draft', name: 'Draft' },
  ]
  var mailtabs = ''
  $.each(mailtypes, function (i, v) {
    mailtabs +=
      '<li class="tab col s2 tab-' +
      v.type +
      '"><a class="mailtab" href="ui-app-mail-inbox.html?type=' +
      v.type +
      '">' +
      v.name +
      ''
    mailtabs += '</a></li>'
  })

  $('.mail_tabs').html(mailtabs)
  select_tabs()
}

function load_category(
  threadtype,
  mail_id = '',
  thread_id = '',
  loadtype = '',
) {
  //console_log("load category");

  var form_data = new FormData()
  form_data.append('action', 'fetch-all')
  form_data.append('id', '')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/mail/mailcategory.php',
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

      console_log(data.items)
      cathtml = ''
      mailcat = ''

      mailcat += '<li><span>'
      mailcat += '<label class="catlabel" data-id="all">'
      mailcat +=
        '<input type="radio" value="all" data-id="all" name="mailload-cat" class="filled-in" /><span>All Category</span>'
      mailcat += '</label>'
      mailcat += '</span></li>'

      $.each(data['items'], function (i, v) {
        cathtml += '<li><span>'
        cathtml += '<label class="catlabel" data-id="' + v.id + '">'
        cathtml +=
          '<input type="checkbox" data-id="cat-' +
          user.id +
          '-' +
          v.id +
          '" name="cat-' +
          user.id +
          '-' +
          v.id +
          '" class="filled-in" /><span>' +
          v.name +
          '</span>'
        cathtml += '</label>'
        cathtml += '</span></li>'

        mailcat += '<li><span>'
        mailcat += '<label class="catlabel" data-id="' + v.slug + '">'
        mailcat +=
          '<input type="radio" value="' +
          v.slug +
          '" data-id="' +
          v.id +
          '" name="mailload-cat" class="filled-in" /><span>' +
          v.name +
          '</span>'
        mailcat += '</label>'
        mailcat += '</span></li>'

        //mailboxcat += '<option value="'+v.id+'">'+v.name+'</option>';
      })

      if (cathtml != '') {
        cathtml += '<li><span class="savebtn">'
        cathtml +=
          '<a class="waves-effect waves-light btn" id="category-save" title="Apply Category" data-type="' +
          threadtype +
          '" data-mail_id="' +
          mail_id +
          '" data-thread_id="' +
          thread_id +
          '" data-loadtype="' +
          loadtype +
          '">Apply</a>'
        cathtml += '</span></li>'
      }

      if (mailcat != '') {
        mailcat += '<li><span class="savebtn">'
        mailcat +=
          '<a class="waves-effect waves-light btn" id="mailbox-load" title="Load Mailbox">Load Mails</a>'
        mailcat += '</span></li>'
      }

      $('.category-dd').html(cathtml)

      if (threadtype == 'multiple_thread') {
        $('.mailcat-dd').html(mailcat)
      }
    },
    error: errorHandling,
  })
}

$(document).on('click', '#mailbox-load', function (e) {
  let mailcat = $("[name='mailload-cat']:checked").val()
  console_log(mailcat)

  var url_string = window.location.href
  var url = new URL(url_string)
  var gettype = url.searchParams.get('type')

  let urlstr = ''
  let urltype = gettype
  let urlcat = mailcat

  if (gettype == null || gettype == 'inbox' || gettype == '') {
    urltype = ''
  }
  if (mailcat == '' || mailcat == undefined) {
    urlcat = ''
  }

  if (urltype != '') {
    urlstr = 'type=' + urltype
  }
  if (urlcat != '' && mailcat != 'all') {
    if (urlstr != '') {
      urlstr += '&'
    }
    urlstr += 'cat=' + urlcat
  }

  if (urlstr != '') {
    urlstr = '?' + urlstr
  }
  //if(urlstr != ""){
  window.location.href = 'ui-app-mail-inbox.html' + urlstr
  //}

  //console_log(urlstr);
})

$(document).on('click', '#category-save', function (e) {
  var checkmode = check_app_mode(e)
  if (!checkmode['allow']) {
    notify(checkmode['msg'])
  } else {
    console_log('save')
    var savetype = $(this).attr('data-type')
    console_log(savetype)
    let ids = ''
    let thread_id = ''
    let mail_id = ''
    let loadtype = ''
    if (savetype == 'multiple_thread') {
      ids = checked_ids()
    } else if (savetype == 'single_thread') {
      ids = $(this).attr('data-thread_id')
      mail_id = $(this).attr('data-mail_id')
      loadtype = $(this).attr('data-loadtype')
      thread_id = ids
    }
    console_log(ids)

    let idsstr = ''
    $('.catlabel input').each(function () {
      let checked = $(this).is(':checked')
      if (checked) {
        let id = $(this).attr('data-id')
        idsstr += id + ','
      }
    })
    console_log(idsstr)

    if (ids != '') {
      var form_data = new FormData()
      form_data.append('action', 'set-category')
      form_data.append('index', 'thread_id')
      form_data.append('thread_id', ids)
      form_data.append('user_id', user.id)
      form_data.append('mail_category', idsstr)
      form_data.append('multiple', 'mail_category')
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
            $('.catlabel input').prop('checked', false)
            $('.category-dd-trigger').dropdown('close')
            if (savetype == 'multiple_thread') {
              load_mails(ids)
            } else if (savetype == 'single_thread') {
              load_mail_thread(mail_id, thread_id, loadtype)
            }
            var notifymsg = data.msg
            notify(notifymsg)
          }
        },
        error: errorHandling,
      })
    }
  } // end check mode
})

$(document).on('click', '.toggleStar', function (e) {
  var id = e.currentTarget.dataset.id
  console_log(id)
  var active = e.currentTarget.classList.contains('primary-text')
  console_log(active)

  var star = ''
  if (active) {
    star = '0'
    e.currentTarget.setAttribute('title', 'No starred')
    //console_log("set star: 0 - "+id);
  } else {
    star = '1'
    e.currentTarget.setAttribute('title', 'All starred')
    //console_log("set star: 1 - "+id);
  }

  var index = $(this).attr('data-index')
  var thread_id = $(this).attr('data-thread_id')

  var form_data = new FormData()
  form_data.append('action', 'star')
  form_data.append('index', index)
  form_data.append('thread_id', thread_id)
  form_data.append('id', id)
  form_data.append('star', star)
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
        var notifymsg = 'Thread Starred successfully!'
        if (star == '0') {
          var notifymsg = 'Thread Unstarred successfully!'
        }
        notify(notifymsg)
        e.currentTarget.classList.toggle('primary-text')
      }
    },
    error: errorHandling,
  })
})

$(document).on('click', '.toggleRead', function (e) {
  var id = e.currentTarget.dataset.id
  console_log(id)
  var has_unread = $('.mark_read-' + id + ' i').hasClass(
    'mdi-email-open-outline',
  )
  console_log(has_unread)

  var index = $(this).attr('data-index')
  var thread_id = $(this).attr('data-thread_id')
  var ts = ''
  var mark_read = ''

  if (index == 'thread_id') {
    if (has_unread) {
      mark_read = '1'
      e.currentTarget.setAttribute('title', 'Mark as Unread')
      //console_log("set star: 0 - "+id);
    } else {
      mark_read = '0'
      e.currentTarget.setAttribute('title', 'Mark as read')
      //console_log("set star: 1 - "+id);
    }
  }
  if (index == 'id') {
    mark_read = '0'
    ts = $(this).attr('data-ts')
  }

  var form_data = new FormData()
  form_data.append('action', 'mark_read')
  form_data.append('index', index)
  form_data.append('thread_id', thread_id)
  form_data.append('id', id)
  form_data.append('timestamp', ts)
  form_data.append('mark_read', mark_read)
  form_data.append('user_id', user.id)
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  if (index == 'id') {
    form_data.append('fromhere', 'timestamp')
  }

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
      console_log('============')
      console_log(response)
      console_log('============')
      let data = JSON.parse(response)
      check_user_token(data)

      if (data.success == true) {
        var notifymsg = 'Marked as Read successfully!'
        if (mark_read == '0') {
          notifymsg = 'Marked as Unread successfully!'
        }

        var field = 'user-' + user.id + '-mark_read-0'

        if (index == 'thread_id') {
          $('.mark_read-' + id + ' i').toggleClass(
            'mdi-email-open-outline mdi-email-outline',
          )
          $('#item-' + id + '').toggleClass('read unread')
          notifymsg = 'Thread ' + notifymsg

          // hide/show count badge
          e.currentTarget.classList.toggle('hidecount')

          // display unread count.
          if (
            data.feature[field] != undefined &&
            data.feature[field].length > 0
          ) {
            //console_log(data.feature[field].length);
            var unread_len = data.feature[field].length
            $('#badge-' + id)
              .html(unread_len)
              .attr('title', unread_len + ' unread')
          } else {
            $('#badge-' + id)
              .html('0')
              .attr('title', '')
          }
        }

        if (index == 'id') {
          if (data.feature[field].length > 0) {
            $.each(data.feature[field], function (ri, rv) {
              $('#item-' + rv + '')
                .addClass('unread')
                .removeClass('read')
              $('.mark_read-' + rv + ' i')
                .addClass('mdi-email-open-outline')
                .removeClass('mdi-email-outline')
            })
          }
        }

        notify(notifymsg)
      }
    },
    error: errorHandling,
  })
})

$(document).on('click', '.modal-trigger', function (e) {
  var id = e.currentTarget.id
  console_log(id)
  var name = $('#item-' + id + ' .title').html()
  if ($(this).hasClass('trash-thread')) {
    name = 'By ' + name
  }

  var moveto = 'trash'
  var curr_trash = $('.toggletrash-' + id).attr('data-trash')
  if (curr_trash == '1') {
    var moveto = 'inbox'
  }
  var btn = 'Move to ' + moveto

  //console_log(name);
  $('.modal-disp').html(name)
  $('.modal-disp').attr('id', id)
  $('.modal-close#delete').html(btn)
  $('.modal-moveto').html(moveto)

  //console_log("modal-trigger"+id);
})

$(document).on('click', '#delete', function (e) {
  var id = $('.modal-disp').attr('id')
  console_log('delete' + id)
  toggleTrash(e, id)
})

function toggleTrash(e, id) {
  var checkmode = check_app_mode(e)
  if (!checkmode['allow']) {
    notify(checkmode['msg'])
  } else {
    var curr_trash = $('.toggletrash-' + id).attr('data-trash')
    console_log(id + ' ' + curr_trash)

    var trash = '1'
    if (curr_trash == '1') {
      trash = '0'
    }
    var index = $('.toggletrash-' + id).attr('data-index')
    var thread_id = $('.toggletrash-' + id).attr('data-thread_id')

    var form_data = new FormData()
    form_data.append('action', 'trash')
    form_data.append('index', index)
    form_data.append('thread_id', thread_id)
    form_data.append('id', id)
    form_data.append('trash', trash)
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
          var notifymsg = 'Thread Moved to trash successfully!'
          if (trash == '0') {
            var notifymsg = 'Thread Moved back to inbox successfully!'
          }
          notify(notifymsg)
          $('#item-' + id).remove()
          //e.currentTarget.classList.toggle('primary-text');
        }
      },
      error: errorHandling,
    })
  } // enc check mode
}

function select_tabs() {
  let url_string = window.location.href
  let url = new URL(url_string)
  let gettype = url.searchParams.get('type')
  let getcat = url.searchParams.get('cat')

  var seltab = gettype
  if (gettype == null || gettype == '') {
    seltab = 'inbox'
  }
  $('.mailtabs').removeClass('active')
  $('.tab-' + seltab + ' .mailtab').addClass('active')

  var catname = ''
  if (getcat == '' || getcat == null) {
    getcat = 'all'
  }
  if (getcat != null && getcat != '') {
    console_log('---' + getcat)
    var cat = $(".catlabel[data-id='" + getcat + "']")
    catname = cat.find('span').html()
    $('.mailload-cat span').html(catname)
  }
}
