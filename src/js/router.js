window.libreria.getId('vista').enrutar()
.ruta('/', './views/01noticias.html', null, null)
.ruta('/01noticias', './views/01noticias.html', null, null)
.ruta('/Steam', './views/Steam.html', null, null)
.ruta('/02login', './views/02login.html', 'miControlador', function(){
        libreria.getCtrl().login()
     })
// .ruta('/forum', './views/forum.html', null, null)
.ruta('/forum', './views/forum.html', 'miControlador', function(){
        libreria.getCtrl().forumFunctions()
     })

// .ruta('/', './views/01index.html', 'miControlador', function(){
//     libreria.getCtrl().conBoton()
// })


// .ruta('/01noticias', './views/01noticias.html', 'miControlador', function(){
//     libreria.getCtrl().segundaprueba()
// })
// .ruta('/tercera', './views/tercera.html', 'miControlador', function(){
//     libreria.getCtrl().prueba()
// })