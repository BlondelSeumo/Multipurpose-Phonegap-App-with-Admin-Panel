     function load_chat_buttons(vid,userid,frid = ""){
	    chatbtn = '<a class="btn btn-small" href="ui-app-chat.html?id='+vid+'">Chat</a>';
        friend_module = (APP_MODULES.indexOf("friend") > -1 ? true : false);
                                        if(friend_module){
                                            if(CHAT_WITH_FRIENDS_ONLY && frid != "delete_friend"){
                                                chatbtn = "";
                                            }
                                        }
                                        if(vid == userid){
                                        	chatbtn = "";
                                        }

        return chatbtn;
     }
