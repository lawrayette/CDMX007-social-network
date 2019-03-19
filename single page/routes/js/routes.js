window.library.getID('view').enroute()
.route ('/', './views/login.html', null, null )
.route ('/', './views/login.html', 'myController', function (){
    library.getCtrl().loginFunction()
} )
.route ('/forum', './views/forum.html', 'myController', function (){
    library.getCtrl().forumFunction()
})
 //hideLoadingshowMenu()//)//En lugar de null podrías implementar una función para que se ejecute inmediatamente al cargar la página)
.route ('/profile', 'views/profile.html', null, null)
.route ('/members', 'views/members.html', null, null)
.route ('/events', 'views/events.html', null, null)



