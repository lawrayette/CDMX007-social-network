

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
      signInSuccessUrl: 'index.html#/forum',
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
      tosUrl: 'index.html#/forum',
  
      
      // Privacy policy url.
      //privacyPolicyUrl: '<your-privacy-policy-url>'
    };
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);





})()






const loadingBox = document.getElementById('loadingBox');
const menuOptions = document.getElementById ('menuOptions');
const hideLoadingshowMenu = ()=>{
  loadingBox.classList.add('hide');
  menuOptions.classList.remove('hide');
}
/*const uiHide =() => {
  // The widget is rendered.
  // Hide the loader.
  document.getElementById('loader').style.display = 'none';
  document.getElementById('firebaseui-auth-container').style.display ='none';
} 
uiHide();*/




// const observador = () => {
//   firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//           console.log(user)
//           localStorage.setItem('user', JSON.stringify(user))
                 
//       } else {
//           // User is signed out.
//           // ...
//           console.log('Not user found')
//       }
//   });
// }

// observador()


// const show = (user) => {
//   var user = user;
//   let access = document.getElementById('access');
//   if(user.emailVerified){
//   access.innerHTML = `
//   <p> Bienvenido a STEAM </p>
//   <button onclick ="signOut()"> Cerrar sesión</button>
//   `
// }
// }