

//vidMembers = document.getElementById('vid-members');

firebase.initializeApp({
    apiKey: "AIzaSyCckaF20jG2kPIzpahf3_8P6trQmFf5yq0",
    authDomain: "steam-3b4ca.firebaseapp.com",
    projectId: "steam-3b4ca",
});

//db = firebase.firestore();

//vidMembers.addEventListener("click", () => {
// window.location = 'members.html';
//})

//--------------------------trae datos de inicio de sesion ---------------------------//

const userCurrent = JSON.parse(localStorage.getItem('user'));
console.log(userCurrent)
let name = document.getElementById('name').value = userCurrent.displayName
console.log (name)
let eMail = document.getElementById('eMail').value = userCurrent.email
let printPhoto = document.getElementById('print-photo')
let photo = userCurrent.photoURL
let uidCurrent = userCurrent.uid
printPhoto.innerHTML =  `<img src="${photo}" alt="FotoPerfil" style="width: 100px; border-radius:50%"></img>`


//----------------------Guarda datos------------------------------------//

const saveProfile = document.getElementById('saveProfile');
saveProfile.addEventListener("click", () => {

    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let userName = document.getElementById('userName').value;
    let interestArea = document.getElementById('interestArea').value;
    let eMail = document.getElementById('eMail').value;
    let uid = uidCurrent;
    if (name === "" || lastName === "" || userName === "" || interestArea === "" || eMail === "") {
        alert('Por favor, completa todos los campos del formulario')
    } else {
        db.collection('members').add({
            first: name,
            last: lastName,
            user: userName,
            interest: interestArea,
            contactEmail: eMail,
            uid: uidCurrent
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

})

