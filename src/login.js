const sendSignUp = document.getElementById('sendSignUp')

sendSignUp.addEventListener("click", () => {
    let emailSignUp = document.getElementById('emailSignUp').value;
    let passwordSignUp = document.getElementById('passwordSignUp').value;
    firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage)
            // ...
        });
})

const sendLogIn = document.getElementById('sendLogIn')


sendLogIn.addEventListener("click", () => {
    let emailLogIn = document.getElementById('emailLogIn').value;
    let passwordLogIn = document.getElementById('passwordLogIn').value;
    firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
    });


})


const observador = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('User found')
            show()
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            console.log(email)
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


const show = () => {
    let access = document.getElementById('access')
    access.innerHTML = `
    <p> Bienvenido a STEAM </p>
    <button onclick ="signOut()"> Cerrar sesión</button>
    `
}



signOut = () =>{
    firebase.auth().signOut()
    .then ( ()=>{
      console.log ('closing session')
    })
    .catch ( ()=>{
      console.log ('error')
    })
}