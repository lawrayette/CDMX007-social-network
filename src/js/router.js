window.libreria.getId('vista').enrutar()
        .ruta('/', './views/news.html', null, null)
        .ruta('/login', './views/login.html', 'miControlador', function () {
                libreria.getCtrl().login()
        })
        .ruta('/forum', './views/forum.html', 'miControlador', function () {
                libreria.getCtrl().forumFunctions()
        })
        .ruta('/news', './views/news.html', null, null)
        .ruta('/comunity', './views/comunity.html', 'miControlador', function () {
                libreria.getCtrl().printComunity()
        })

        .ruta('/myProfile', './views/myProfile.html', null, null)     
