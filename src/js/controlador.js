libreria.controlador('miControlador', {
    prueba:()=>{
        alert('estamos entrando al controlador')
    },
    segundaprueba:()=>{
        alert('es el controlador de la segunda')
    },
    conBoton:() => {
        document.getElementById('mi-boton').addEventListener('click', function(){
            alert('este es el boton')
        })

    }
})

