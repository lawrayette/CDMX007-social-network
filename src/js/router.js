window.library.getId('view').routing()
        .route('/', './views/news.html', 'miControlador', function () {
                library.getCtrl().firstViewFunction()
        })
        .route('/login', './views/login.html', 'miControlador', function () {
                library.getCtrl().login()
        })
        .route('/forum', './views/forum.html', 'miControlador', function () {
                library.getCtrl().forumFunctions()
        })
        .route('/news', './views/news.html', 'miControlador', null, null)
   
        .route('/comunity', './views/comunity.html', 'miControlador', function () {
                library.getCtrl().printComunity()
        })

        .route('/myProfile', './views/myProfile.html', 'miControlador', function () {
                library.getCtrl().profileFunctions()
        })

