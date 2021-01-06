$(document).ready(function() {

    var authentic = isUserAuthenticated();
    if(authentic){
        let dispmsg = "It seems you are logged in. You must be logged out to perform this action.<br/>Redirecting to home page";
        notify(dispmsg);
        //$("#response-register").html(dispmsg);
         setTimeout(function(){ 
           window.location.href = 'ui-app-dashboard.html';
          }, 3500);
    }

    var user = getUser();

    $("#register-form").submit(function(e){
    //$(document).on( 'click', '#login', function (e){
        e.preventDefault();
        console_log("submit");
        if(!authentic){
    
            //var name = $("#name").val();
            var username = $("#username").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            //var password = $("#password").val();
            //var confirm_password = $("#confirm_password").val();

            //console_log(username + password);

            var form_data = new FormData();
            form_data.append('action', "check_available");
            form_data.append('formtype', "app-access");
            form_data.append('source', "app");
            form_data.append('username', username);
            form_data.append('phone', phone);
            form_data.append('email', email);
            form_data.append('auth_user', user.id);
            form_data.append('auth_type', user.usertype);
            form_data.append('auth_token', user.token);
            //form_data.append('name', name);
            //form_data.append('password', password);
            //form_data.append('confirm_password', confirm_password);
            $.ajax({
                        type: "POST",
                        url: REST_API_URL+"modules/user/user.php",
                        data: form_data,
                        processData: false,
                        contentType: false,
                        crossDomain: true,
                        cache: false,
                        beforeSend: function() {
                            console_log("beforeSend");
                            ajax_loading();
                            //$("#response-register").html('Verifying...');
                        },
                        success: function(response) {
                            ajax_loaded();
                            console_log(response);
                            let data = JSON.parse(response);
                            check_user_token(data);

                            //$("#response-register").html(msg);
                            if(data.msg != undefined){
                                notify(data.msg);
                            }
                            if(data.success == false){ 

                            }
                            else {
                              save_user();
                              
                                  // submit form and save data 
                                  //console_log("New Password Set");
                                  //var notifymsg = "Your Password is successfully updated. Please login with new password";
                                  //notifyUser(notifymsg);
                                  //window.location.href = 'ui-pages-login.html';
                            }
                            //console_log(data.msg);
                        }
                    });

          } // end authentic check

        });

    function save_user(){
      //console_log("save new user");
    
            var name = $("#name").val();
            var username = $("#username").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var confirm_password = $("#confirm_password").val();

            var form_data = new FormData();
            form_data.append('action', "save");
            form_data.append('source', "app");
            form_data.append('formtype', "app-access");
            form_data.append('username', username);
            form_data.append('phone', phone);
            form_data.append('email', email);
            form_data.append('name', name);
            form_data.append('password', password);
            form_data.append('confirm_password', confirm_password);
            form_data.append('usertype', 'user');
            form_data.append('active', "0");
            form_data.append('verified', "0");
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
                            console_log("beforeSend");
                           // $("#response-register").html('Verifying...');
                        },
                        success: function(response) {
                            ajax_loaded();
                            console_log(response);
                            let data = JSON.parse(response);
                            check_user_token(data);
                            
                            //$("#response-register").html(msg);
                            if(data.msg != undefined){
                                notify(data.msg);
                            }
                            if(data.success !== false){ 
                                  var notifymsg = "Please check your email and enter verification code to activate your account.";
                                  notifyUser(notifymsg);
                                  setTimeout(function(){ 
                                      window.location.href = 'ui-pages-activateaccount.html';
                                    }, 2500);
                            }
                            else {
                                  // submit form and save data 
                                  //console_log("New Password Set");
                                  //var notifymsg = "Your Password is successfully updated. Please login with new password";
                                  //notifyUser(notifymsg);
                                  //window.location.href = 'ui-pages-login.html';
                            }
                            //console_log(data.msg);
                        }
                    });

    }

});