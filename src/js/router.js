window.libreria.getId('vista').enrutar()
.ruta('/', './views/01noticias.html', 'miControlador', function(){
        /*libreria.getCtrl().firstPage()*/
})
.ruta('/02login', './views/02login.html', 'miControlador', function(){
        libreria.getCtrl().login()
     })
.ruta('/forum', './views/forum.html', 'miControlador', function(){
        libreria.getCtrl().forumFunctions()
     })
.ruta('/01noticias', './views/01noticias.html', null, null)
.ruta('/comunity', './views/comunity.html', 'miControlador', function (){
        libreria.getCtrl().printComunity()
})
.ruta('/myProfile', './views/myProfile.html', null, null)     
// .ruta('/forum', './views/forum.html', null, null)


// .ruta('/', './views/01index.html', 'miControlador', function(){
//     libreria.getCtrl().conBoton()
// })


// .ruta('/01noticias', './views/01noticias.html', 'miControlador', function(){
//     libreria.getCtrl().segundaprueba()
// })
// .ruta('/tercera', './views/tercera.html', 'miControlador', function(){
//     libreria.getCtrl().prueba()
// })
/*

(function (window, document) {
        library.getID('view').enroute()
            .route('/', 'views/init.html', null, null)
            .route('/forum', 'views/change/forum.html', 'forum', null)
            //hideLoadingshowMenu()//)//En lugar de null podrías implementar una función para que se ejecute inmediatamente al cargar la página)
            .route('/profile', 'views/change/profile.html', 'contacto', null)
            .route('/members', 'views/change/members.html', 'contacto', null)
            .route('/events', 'views/change/events.html', 'contacto', null)
    })(window, document);*/