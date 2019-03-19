/*
firebase.initializeApp({
    apiKey: "AIzaSyCckaF20jG2kPIzpahf3_8P6trQmFf5yq0",
    authDomain: "steam-3b4ca.firebaseapp.com",
    projectId: "steam-3b4ca",
});

db = firebase.firestore();

*/

//--------------------------trae datos de inicio de sesion ---------------------------//

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           // User is signed in.
           localStorage.setItem('user', JSON.stringify(user))
           let printPhoto = document.getElementById('print-photo')
           
           
         let name = document.getElementById('name').value = user.displayName
         let eMail = document.getElementById('eMail').value = user.email
         let photo = user.photoURL
         printPhoto.innerHTML =  `<img src="${photo}" alt="FotoPerfil" style="width: 100px; border-radius:40%"></img>`

           console.log(user)
           
        } else {
            // No user is signed in.
            console.log('no hay usuario')
        }
    });
    
  


//----------------------Guarda datos------------------------------------//
function saveProfile (){

    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let userName = document.getElementById('userName').value;
    let interestArea = document.getElementById('interestArea').value;
    let eMail = document.getElementById('eMail').value;
    //let uid = uidCurrent;
    if (name === "" || lastName === "" || userName === "" || interestArea === "" || eMail === "") {
        alert('Por favor, completa todos los campos del formulario')
    } else {
        db.collection('members').add({
            first: name,
            last: lastName,
            user: userName,
            interest: interestArea,
            contactEmail: eMail,
            //user: uid
        }).then((docRef) => {
            console.log('Document written with ID:', docRef.id);
            document.getElementById('name').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('userName').value = '';
            document.getElementById('interestArea').value = '';
            document.getElementById('eMail').value = '';
        }).catch((error) => {
            console.log('Error adding document:', error);
        }).then(() => {
            let cardName = document.getElementById('cardName');
            let cardUser = document.getElementById('cardUser');
            let cardInterest = document.getElementById('cardInterest');
            let cardContact = document.getElementById('cardContact');
            cardName.innerHTML = `${name} ${lastName}`;
            cardUser.innerHTML = `${userName}`;
            cardInterest.innerHTML = `${interestArea}`;
            cardContact.innerHTML = `${eMail}`;
        })
    }

}

