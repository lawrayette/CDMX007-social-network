//StartLibrary crea nuestra librería y nos la retorna
const startLibrary = function () {
    let elementLibrary = null,
        framework = null,
        routes = {},
        controllers = {},
        currentCtrl = null,
        library = {

            getId: function (id) {
                elementLibrary = document.getElementById(id)
                return this
            },

            get: function (id) {
                return document.getElementById(id)
            },

            controller: function (name, ctrl) {
                controllers[name] = {
                    'controller': ctrl
                }
            },

            getCtrl: function () {
                return currentCtrl
            },

            //Asigna al lugar donde se cargan las vistas el elemento seleccionado
            routing: function () {
                framework = elementLibrary
                return this
            },

            route: function (route, template, controller, loadFunction) {
                routes[route] = {
                    template,
                    controller,
                    loadFunction
                }
                return this
            },

            routeController: function () {
                var hash = window.location.hash.substring(1) || '/',
                    destiny = routes[hash],
                    xhr = new XMLHttpRequest()
                if (destiny && destiny.template) {
                    if (destiny.controller) {
                        currentCtrl = controllers[destiny.controller].controller;
                    }
                    xhr.addEventListener('load', function () {
                        framework.innerHTML = this.responseText
                        setTimeout(function () {
                            if (typeof destiny.loadFunction === 'function') {
                                destiny.loadFunction()
                            }
                        }, 500)
                    }, false)
                    xhr.open('get', destiny.template, true)
                    xhr.send(null)
                } else {
                    window.location.hash = '#/'
                }
            }
        }
    return library
}
if (typeof window.library === 'undefined') {
    //La función startLibrary () se guarda como un objeto global
    window.library = startLibrary()
    window.addEventListener('load', library.routeController, false)
    window.addEventListener('hashchange', library.routeController, false)
} else {
    console.log('Overwriting this object')
}