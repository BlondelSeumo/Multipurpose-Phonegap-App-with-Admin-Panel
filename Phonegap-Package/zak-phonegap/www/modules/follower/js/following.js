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

function load_following(element = '') {
  if (element == '') {
    element = 'response'
  }

  var form_data = new FormData()
  form_data.append('active', '1')
  form_data.append('user_id', id)
  form_data.append('order', 'name ASC')
  form_data.append('type', 'following')
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

        var frid = 'unfollow'
        var frbtn = fol_allbtns[frid]
        var display_action = true
        if (user.id != id) {
          display_action = false
        }

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
        html += '<div style="margin-top:10px;">'
        if (display_action) {
          html +=
            '<button class="btn btn-small follower-action follower-btn-' +
            v.id +
            '" data-userid="' +
            user.id +
            '" data-id="' +
            v.id +
            '" data-action="' +
            frid +
            '" >' +
            frbtn +
            '</button>'
        }
        html +=
          '<a class="btn btn-small" href="ui-app-profile.html?id=' +
          v.id +
          '">Profile</a>'
        html += '</div>'
        html += '<div class="secondary-content">'
        html += '</div>'
        html += '</li>'
      })
      if (html == '') {
        html =
          "<p class='nodatafound z-depth-1'>No Data Found. <a href='ui-app-users.html'>View all users</a></p>"
      }
      $('#' + element).html(html)
      $('.modal').modal()
    },
    error: errorHandling,
  })
}

/*$(document).on( 'click', '.modal-trigger-follow', function (e){
                var id = e.currentTarget.id;
                var userid = e.currentTarget.dataset.userid;
                console_log(id);
                console_log(userid);
                var name = $("#item-"+id+" .title").html();
                //console_log(name);
                $(".modal-disp").html(name);
                $(".modal-disp").attr("id",id);
                $(".modal-disp").attr("data-userid",userid);
                //console_log("modal-trigger-follow"+id);
            });

            $(document).on( 'click', '#delete-follow', function (e){
                var id = $(".modal-disp").attr("id");
                var userid = $(".modal-disp").attr("data-userid");
                var action = "unfollow";
                console_log(action+" "+id+" "+userid);
                follower_action(e, id,userid,action,false);
                $("#item-"+id).hide();
                //delete_item(e, "contact",id,"Contact");
            });*/

function load_following_count() {
  console_log('load_following_count')

  var form_data = new FormData()
  form_data.append('action', 'fetch-count')
  form_data.append('id', id)
  form_data.append('user_id', user.id)
  form_data.append('following', 'count')
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

      var following_count = '...'
      if (data.following[id] != undefined) {
        var following_count = data.following[id].length
      }
      $('#following_count').html(following_count)
    },

    error: errorHandling,
  })
}
