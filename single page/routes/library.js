
(function (window, document) {
    'use strict';
    const init = function () {
        let element = null,
            framework = null,
            routes = {},
            controllers = {},
            controller,
            library = {
                getId: function (id) {
                    element = document.getElementById(id);
                    return this;

                },

                get: function (id) {
                    return document.getElementById(id);
                },

                noSubmit: function () {
                    element.addEventListener('submit', function (e) {
                        e.preventDefault();
                    }, false);
                    return this;
                },

                enroute: function () {
                    framework = element;
                    return this;
                },

                route: function (route, template, controller, load) {
                    routes[route] = {
                        'template': template,
                        'controller': controller,
                        'load': load
                    }
                    return this;
                },

            
                routeController: function () {
                    let hash = window.location.hash.substring(1) || '/',
                    destiny = routes[hash],
                    xhr = new XMLHttpRequest();

                    if (destiny && destiny.template) {
                        xhr.addEventListener('load', function () {
                            framework.innerHTML = this.responseText;
                        }, false)

                        xhr.open('get', destiny.template, true);
                        xhr.send(null);
                    } else {
                        window.location.hash = '#/';
                    }

                }
            };
        return library
    }
    if (typeof window.library === 'undefined') {
        window.library = window.$ = init();
        window.addEventListener('load', library.routeController, false);
        window.addEventListener('hashchange', library.routeController, false);
    } else {
        console.log('Se está llamando la librería nuevamente');
    }
})(window, document)