//Asigna la ruta, la plantilla, el controlador y la carga
window.library.getId('view').routing()
        .route('/', './views/news.html', 'myController', function () {
                library.getCtrl().firstViewFunction()
        })
        .route('/login', './views/login.html', 'myController', function () {
                library.getCtrl().login()
        })
        .route('/forum', './views/forum.html', 'myController', function () {
                library.getCtrl().forumFunctions()
        })
        .route('/news', './views/news.html', 'myController', null, null)
        .route('/comunity', './views/comunity.html', 'myController', function () {
                library.getCtrl().printComunity()
        })
        .route('/myProfile', './views/myProfile.html', 'myController', function () {
                library.getCtrl().profileFunctions()
        })