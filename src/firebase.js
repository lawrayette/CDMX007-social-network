let app_fireBase = {};
(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCckaF20jG2kPIzpahf3_8P6trQmFf5yq0",
    authDomain: "steam-3b4ca.firebaseapp.com",
    databaseURL: "https://steam-3b4ca.firebaseio.com",
    projectId: "steam-3b4ca",
    storageBucket: "steam-3b4ca.appspot.com",
    messagingSenderId: "236445573639"
  };
  firebase.initializeApp(config);

app_fireBase = firebase;
})()