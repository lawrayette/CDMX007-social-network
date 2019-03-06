  var app_fireBase = {};
  (  function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2K5qOAHgPS6FYXd_8L2EGNqiC8Lu3k0s",
    authDomain: "steam2.firebaseapp.com",
    databaseURL: "https://steam2.firebaseio.com",
    projectId: "steam2",
    storageBucket: "",
    messagingSenderId: "800477145491"
  };
  firebase.initializeApp(config);
  app_fireBase = firebase;
}) ()