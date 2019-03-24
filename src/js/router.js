window.libreria.getId('view').enrutar()
        .ruta('/', './views/news.html', 'miControlador', function () {
                libreria.getCtrl().firstViewFunction()
        })
        .ruta('/login', './views/login.html', 'miControlador', function () {
                libreria.getCtrl().login()
        })
        .ruta('/forum', './views/forum.html', 'miControlador', function () {
                libreria.getCtrl().forumFunctions()
        })
        .ruta('/news', './views/news.html', 'miControlador', null, null)
   
        .ruta('/comunity', './views/comunity.html', 'miControlador', function () {
                libreria.getCtrl().printComunity()
        })

        .ruta('/myProfile', './views/myProfile.html', 'miControlador', function () {
                libreria.getCtrl().profileFunctions()
        })