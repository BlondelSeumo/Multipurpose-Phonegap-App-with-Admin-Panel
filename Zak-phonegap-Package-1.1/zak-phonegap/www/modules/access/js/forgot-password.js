$(document).ready(function() {

    var authentic = isUserAuthenticated();
    if(authentic){
      let dispmsg = "It seems you are logged in. You must be logged out to perform this action.<br/>Redirecting to home page";
      notify(dispmsg);
       //$("#response-forgot-password").html(dispmsg);
         setTimeout(function(){ 
           window.location.href = 'ui-app-dashboard.html';
          }, 3500);
    }

    $("#forgot-password-form").submit(function(e){
    //$(document).on( 'click', '#login', function (e){
        e.preventDefault();

        var user = getUser();

        if(!authentic){
    
            var setnewpassword = "Set New Password";
            var username = $("#username").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var code_sent = false;

            var action = $("input#forgot-password").val();
            if($("input#forgot-password").val() == setnewpassword){
              var code_sent = true;
            }
            //console_log(action);

            //console_log(code_sent);
            var password = "";
            var confirm_password = "";
            var code = "";
            if($("#password").length){
              password = $("#password").val();
            }
            if($("#confirm_password").length){
              confirm_password = $("#confirm_password").val();
            }
            if($("#code").length){
              code = $("#code").val();
            }

            //console_log(username + password);

            var form_data = new FormData();
            form_data.append('username', username);
            form_data.append('phone', phone);
            form_data.append('email', email);
            form_data.append('code', code);
            form_data.append('password', password);
            form_data.append('confirm_password', confirm_password);
            form_data.append('code_sent', code_sent);
            form_data.append('action', "forgotpassword");
            form_data.append('source', "app");
            form_data.append('auth_user', user.id);
            form_data.append('auth_type', user.usertype);
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
                            ajax_loading();
                            //console_log("beforeSend");
                            //$("#response-forgot-password").html('Verifying...');
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
                              if(data.code_sent === true){
                                  $(".step-2").show(); 
                                  $("input#forgot-password").attr("data-action","setpassword");
                                  $("input#forgot-password").val(setnewpassword);
                                } else {
                                  //console_log("New Password Set");
                                  var notifymsg = "Your Password is successfully updated. Please login with new password";
                                  notifyUser(notifymsg);
                                  window.location.href = 'ui-pages-login.html';
                                }
                            }
                            //console_log(data.msg);
                            //$("#response-forgot-password").html(msg);
                            //notify(msg);
                        }
                    });

          } // end authentic check

        });

});