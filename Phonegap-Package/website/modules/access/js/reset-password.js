$(document).ready(function() {

    var user = getUser();

    $("#reset-password-form").submit(function(e){
    //$(document).on( 'click', '#login', function (e){
        e.preventDefault();

        var authentic = isUserAuthenticated();

        if(authentic){
    
            var username = $("#username").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var old_password = $("#old_password").val();
            var password = $("#password").val();
            var confirm_password = $("#confirm_password").val();

            //console_log(username + password);

            var form_data = new FormData();
            form_data.append('username', username);
            form_data.append('phone', phone);
            form_data.append('email', email);
            form_data.append('password', password);
            form_data.append('confirm_password', confirm_password);
            form_data.append('old_password', old_password);
            form_data.append('action', "resetpassword");
            form_data.append('source', "app");
            form_data.append('auth_user', user.id)
            form_data.append('auth_type', user.usertype)
            form_data.append('auth_token', user.token);


            $.ajax({
                        type: "POST",
                        url: REST_API_URL+"modules/user/user.php",
                        data: form_data,
                        processData: false,
                        contentType: false,
                        crossDomain: true,
                        cache: false,
                        beforeSend: function() {
                            //console_log("beforeSend");
                            ajax_loading();
                            //$("#response-reset-password").html('Verifying...');
                        },
                        success: function(response) {
                            ajax_loaded();
                            //console_log(response);
                            let data = JSON.parse(response);
                            check_user_token(data);

                            //var msg = data.msg;
                            if(data.msg != undefined){
                                notify(data.msg);
                            }
                            if(data.success !== false){
                                  deauthenticateUser();
                                  var notifymsg = "Your Password is successfully updated. Please login with new password.";
                                  notifyUser(notifymsg);
                                  window.location.href = 'ui-pages-login.html';
                            }
                            //console_log(data.msg);
                            //$("#response-reset-password").html(msg);
                        }
                    });

          } // end authentic check

        });

});