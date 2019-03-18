(function (window, document){
library.getId('view').enroute()
.route ('/', 'views/login.html', null, )
.route ('/forum', 'views/forum.html', 'forum', null) //hideLoadingshowMenu()//)//En lugar de null podrías implemantar una función para que se ejecute inmediatamente al cargar la página)
.route ('/members', 'views/members.html', 'contact', null)
.route ('/profile', 'views/profile.html', 'contact', null)
.route ('/events', 'views/events.html', 'contact', null)
})(window, document);



