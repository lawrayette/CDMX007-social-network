var inicio = function (){
    var elemento = null,
    marco = null,
    rutas = {},
    controladores = {},
    ctrlActual = null,
    libreria = {
        getId: function (id){
            elemento = document.getElementById(id)
            return this
        },
        get:function (id){
            return document.getElementById(id)
        },
        controlador: function (nombre, ctrl){
            controladores[nombre] = {
                'controlador': ctrl
            }
        },
        getCtrl: function(){
            return ctrlActual
        },
        enrutar: function(){
            marco = elemento
            return this
        },
        ruta : function(ruta, plantilla, controlador, carga){
            rutas[ruta] = {
                plantilla,
                controlador,
                carga
            }
            return this
        },
        manejadorRutas: function(){
            var hash = window.location.hash.substring(1) || '/',
            destino = rutas[hash],
            xhr = new XMLHttpRequest()
            if(destino && destino.plantilla){
                if(destino.controlador){
                    ctrlActual = controladores[destino.controlador].controlador;
                }
                xhr.addEventListener('load', function(){
                    marco.innerHTML = this.responseText
                    setTimeout(function(){
                        if(typeof destino.carga === 'function'){
                            destino.carga()
                        }
                    }, 500)
                }, false)
                xhr.open('get', destino.plantilla, true)
                xhr.send(null)
            }else{
                window.location.hash = '#/'
            }
         }
    }
    return libreria
}
if(typeof window.libreria === 'undefined'){
    window.libreria = inicio()
    window.addEventListener('load', libreria.manejadorRutas, false)
    window.addEventListener('hashchange',libreria.manejadorRutas, false)
}else{
    console.log('sobre escribiendo este objeto')
}