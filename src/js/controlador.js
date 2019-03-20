libreria.controlador('miControlador', {
    login:()=>{
        (function(){
            // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                  },
                  uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                  }
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                signInSuccessUrl: '03user.html',
                signInOptions: [
                  // Leave the lines as is for the providers you want to offer your users.
                  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                  //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                  //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                  //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                  firebase.auth.EmailAuthProvider.PROVIDER_ID,
                  //firebase.auth.PhoneAuthProvider.PROVIDER_ID
                ],
                
                // Terms of service url.
                tosUrl: 'user.html',
                // Privacy policy url.
                //privacyPolicyUrl: '<your-privacy-policy-url>'
              };
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
        })()
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

