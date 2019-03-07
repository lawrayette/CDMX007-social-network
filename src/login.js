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
        signInSuccessUrl: 'user.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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

/*
const observador = () => {
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          console.log('User found')
          show(user)
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          console.log(user.emailVerified)
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
      } else {
          // User is signed out.
          // ...
          console.log('Not user found')
      }
  });
}

observador()


const show = (user) => {
  var user = user;
  let access = document.getElementById('access');
  if(user.emailVerified){
  access.innerHTML = `
  <p> Bienvenido a STEAM </p>
  <button onclick ="signOut()"> Cerrar sesión</button>
  `
}
}*/
