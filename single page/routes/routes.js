(function (window, document){
library.getId('view').enroute()
.route ('/', 'views/login.html', null, null)
.route ('/forum', 'views/forum.html', null, null)
.route ('/members', 'views/members.html', null, null)
.route ('/profile', 'views/profile.html', null, null)
.route ('/events', 'views/events.html', null, null)
})(window, document);

