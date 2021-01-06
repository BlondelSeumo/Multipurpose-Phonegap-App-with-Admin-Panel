$(document).ready(function() {

    var authentic = isUserAuthenticated();
    if(authentic){
        let dispmsg = "It seems you are logged in. You must be logged out to perform this action.<br/>Redirecting to home page";
        notify(dispmsg);
        //$("#response-activate-account").html(dispmsg);
         setTimeout(function(){ 
           window.location.href = 'ui-app-dashboard.html';
          }, 3500);
    }

    var user = getUser();

    $("#activate-account-form").submit(function(e){

        e.preventDefault();
        //console_log("submit");
        if(!authentic){
    
            var username = $("#username").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var verification_code = $("#verification_code").val();

            //console_log(username + password);

            var form_data = new FormData();
            form_data.append('action', "verification");
            form_data.append('source', "app");
            form_data.append('username', username);
            form_data.append('phone', phone);
            form_data.append('email', email);
            form_data.append('verification_code', verification_code);
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
                            //$("#response-activate-account").html('Verifying...');
                        },
                        success: function(response) {
                            ajax_loaded();
                            console_log(response);
                            let data = JSON.parse(response);
                            check_user_token(data);

                            //var msg = data.msg;
                            //$("#response-activate-account").html(msg);
                            if(data.msg != undefined){
                                notify(data.msg);
                            }
                            if(data.success !== false){ 
                                var notifymsg = "Account Verified and Activated Successfully. You can login now.";
                                notifyUser(notifymsg);
                                setTimeout(function(){ 
                                   //console_log("redirect to login");
                                   window.location.href = 'ui-pages-login.html';
                                }, 10);
                            }
                        }
                    });

          } // end authentic check

        });

   

});