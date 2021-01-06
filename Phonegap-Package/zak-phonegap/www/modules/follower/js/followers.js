var url_string = window.location.href
var url = new URL(url_string)
var getid = url.searchParams.get('id')
//console_log(getid);

var user = getUser()
var id = ''

if (getid == null || getid == '') {
  id = user.id
} else {
  id = getid
}

function load_followers(element = '') {
  if (element == '') {
    element = 'response'
  }

  var form_data = new FormData()
  form_data.append('active', '1')
  form_data.append('user_id', id)
  form_data.append('order', 'name ASC')
  form_data.append('type', 'followers')
  form_data.append('action', 'user-connections')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/follower/follower.php',
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
      $.each(data['items'], function (i, v) {
        //console_log(v.name);
        //console_log(i);
        //console_log(v);

        //frid = "unfollow";
        //frbtn = fol_allbtns[frid];
        let image = get_display_filename(v.image, 'thumb')
        html += '<li class="collection-item avatar" id="item-' + v.id + '">'
        html += '<div class="chatlink">'
        html +=
          '<a href="ui-app-profile.html?id=' +
          v.id +
          '"><img  class="circle" alt="' +
          v.name +
          '" title="' +
          v.name +
          '" src="' +
          filename_url(image) +
          '"></a>'
        html +=
          '<a href="ui-app-profile.html?id=' +
          v.id +
          '"><span class="title">' +
          v.name +
          '</span></a>'
        html += '<p>' + v.position + ' / ' + v.location + '</p>'
        html += '<div class="secondary-content">'
        html +=
          '<a class="btn btn-small" href="ui-app-profile.html?id=' +
          v.id +
          '">Profile</a>'
        html += '</div>'
        html += '</li>'
      })
      if (html == '') {
        html =
          "<p class='nodatafound z-depth-1'>No Data Found. <a href='ui-app-users.html'>View all users</a></p>"
      }
      $('#' + element).html(html)
    },
    error: errorHandling,
  })
}

function load_followers_count() {
  console_log('load_followers_count')

  var form_data = new FormData()
  form_data.append('action', 'fetch-count')
  form_data.append('id', id)
  form_data.append('user_id', user.id)
  form_data.append('followers', 'count')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)

  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/follower/follower.php',
    data: form_data,
    processData: false,
    contentType: false,
    crossDomain: true,
    cache: false,
    beforeSend: function () {
      //$("#response").val('Connecting...');
    },
    success: function (response) {
      console_log(response)
      let data = JSON.parse(response)
      check_user_token(data)

      var followers_count = '...'
      if (data.followers[id] != undefined) {
        var followers_count = data.followers[id].length
      }
      $('#followers_count').html(followers_count)
    },

    error: errorHandling,
  })
}

function load_follower_button() {
  if (id != user.id) {
    var form_data = new FormData()
    form_data.append('action', 'usertouser')
    form_data.append('id', id)
    form_data.append('user_id', user.id)
    form_data.append('source', 'app')
    form_data.append('auth_user', user.id)
    form_data.append('auth_type', user.usertype)
    form_data.append('auth_token', user.token)

    $.ajax({
      type: 'POST',
      url: REST_API_URL + 'modules/follower/follower.php',
      data: form_data,
      processData: false,
      contentType: false,
      crossDomain: true,
      cache: false,
      beforeSend: function () {
        //$("#response").val('Connecting...');
      },
      success: function (response) {
        console_log(response)
        let data = JSON.parse(response)
        check_user_token(data)

        fohtml = ''
        if (data.btn != undefined) {
          foid = data.btn
          fobtn = fol_allbtns[foid]
          //console_log(frid+frbtn);
          fohtml +=
            '<button class="btn btn-small follower-action follower-btn-' +
            id +
            '" data-userid="' +
            user.id +
            '" data-id="' +
            id +
            '" data-action="' +
            foid +
            '" >' +
            fobtn +
            '</button>'
        }
        $('#ui-profile #actions').append(fohtml)
      },

      error: errorHandling,
    })
  }
}

function load_user_followers(callback) {
  var form_data = new FormData()
  form_data.append('follower', user.id)
  form_data.append('action', 'fetch-user')
  form_data.append('auth_user', user.id)
  form_data.append('auth_type', user.usertype)
  form_data.append('auth_token', user.token)
  $.ajax({
    type: 'POST',
    url: REST_API_URL + 'modules/follower/follower.php',
    data: form_data,
    processData: false,
    contentType: false,
    crossDomain: true,
    cache: false,
    beforeSend: function () {
      //$("#response").html('<p class="pad-15">Connecting...</p>');
    },
    success: function (response) {
      //console_log(response);
      var html = ''
      let data = JSON.parse(response)
      check_user_token(data)

      $.each(data['items'], function (i, v) {
        followers.push(v.followed)
        //console_log(v.name); console_log(i); console_log(v);
      })
      callback()
      //load_users(user,friends,followers);
    },
    error: errorHandling,
  })
}

function load_follower_buttons(followers, vid, userid) {
  followerbtn_html = ''
  foid = 'follow'
  fobtn = fol_allbtns['follow']
  if (followers.indexOf(vid) > -1) {
    foid = 'unfollow'
    fobtn = fol_allbtns['unfollow']
  }

  if (vid == userid) {
    foid = ''
    fobtn = ''
  }

  if (foid != '') {
    followerbtn_html +=
      '<button class="btn btn-small follower-action follower-btn-' +
      vid +
      '" data-userid="' +
      userid +
      '" data-id="' +
      vid +
      '" data-action="' +
      foid +
      '" >' +
      fobtn +
      '</button>'
  }

  return followerbtn_html
}
