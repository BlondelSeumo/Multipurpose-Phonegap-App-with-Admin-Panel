/**********ZAK CONFIGURATION:**************/
var REST_API_URL = 'https://mydomain.com/zak-rest-api/'

var CHAT_WITH_FRIENDS_ONLY = false
var APP_NAVIGATION_ADMIN = '../includes/left-navigation.html'
var APP_NAVIGATION_USER = '../includes/left-navigation.html'
var APP_NAVIGATION_DEFAULT = '../includes/left-navigation.html'
var APP_DEMO_ACCOUNT_RESTRICTIONS = true

//App themes are loaded based on 2 types
// css variables (latest) or loading different stylesheets for each color (old way).
var APP_CSS_VARIABLES = true

var restricted = [
  'ui-app-profile.html',
  'ui-app-profile-edit.html',
  'ui-app-mail-inbox.html',
  'ui-app-mail-compose.html',
  'ui-app-mail-view.html',
  'ui-app-contacts.html',
  'ui-app-addcontact.html',
  'ui-pages-resetpassword.html',
  'ui-app-users.html',
  'ui-app-chat.html',
  'ui-app-messages.html',
  'ui-app-friends.html',
  'ui-app-friendrequests.html',
  'ui-app-sentfriendrequests.html',
  'ui-app-event-add.html',
  'ui-app-followers.html',
  'ui-app-following.html',
  'ui-app-notifications.html',
  'ui-app-album-add.html',
  'sub-apps.html',
  'ui-app-myaccount.html',
]

/*var access = [];*/

http: var APP_MODULES = ['friend', 'follower', 'chat']

var defaultval = {
  theme: 'deep-purple',
  header: 'light',
  header_align: 'center',
  menu: 'light',
  menu_icons: 'on',
  menu_type: 'left',
  footer: 'light',
  footer_type: 'minimal',
  //menu_animation: "slide_left",
  site_mode: 'light',
  footer_menu: 'hide',
  footer_menu_style: 'light',
}

var fr_allbtns = []
fr_allbtns['send_friend_request'] = 'Send Friend Request'
fr_allbtns['delete_friend_request'] = 'Delete Friend Request'
fr_allbtns['accept_friend_request'] = 'Accept Friend Request'
fr_allbtns['reject_friend_request'] = 'Reject Friend Request'
fr_allbtns['delete_friend'] = 'Delete Friend'

var fol_allbtns = []
fol_allbtns['follow'] = 'Follow'
fol_allbtns['unfollow'] = 'Unfollow'

var AUTHEXPIREMILLISECONDS = 86400000
//var AUTHEXPIREMILLISECONDS = 10000;
