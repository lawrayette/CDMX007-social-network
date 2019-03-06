let mainApp = {};


( function () {
    let firebase = app_fireBase;
    let uid = null;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            uid = user.uid;
        } else {
            //redirect to loading page
            uid = null;
            window.location.replace('login.html');
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }
    mainApp.logOut = logOut;
})()


const hola = andrea;