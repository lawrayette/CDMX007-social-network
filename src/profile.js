vidMembers = document.getElementById('vid-members');

firebase.initializeApp({
    apiKey: "AIzaSyCckaF20jG2kPIzpahf3_8P6trQmFf5yq0",
    authDomain: "steam-3b4ca.firebaseapp.com",
    projectId: "steam-3b4ca",
});

let db = firebase.firestore();

vidMembers.addEventListener("click", () => {
    window.location = 'members.html';
})



const saveProfile = document.getElementById('saveProfile');
saveProfile.addEventListener("click", () => {

    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value; 
    let userName = document.getElementById('userName').value;
    let interestArea = document.getElementById('interestArea').value;

    let contact = document.getElementById('contact').value;
    db.collection('members').add({
     first: name,
     last: lastName, 
     interest: interestArea,
     contactEmail: contact
    }).then( (docRef)=>{
        console.log('Document written with ID:', docRef.id);
        document.getElementById ('name').value = '';
        document.getElementById('lastName').value ='';
        document.getElementById('interestArea').value = '';
        document.getElementById('contact').value ='';
    }).catch((error)=>{
        console.log('Error adding document:', error);
    })

})


    let eMail = document.getElementById('eMail').value;
    if (name === "" || lastName === "" || userName === "" || interestArea === "" || eMail === "") {
        alert('Por favor, completa todos los campos del formulario')
    } else {
        db.collection('members').add({
            first: name,
            last: lastName,
            user: userName,
            interest: interestArea,
            contactEmail: eMail
        }).then((docRef) => {
            console.log('Document written with ID:', docRef.id);
            document.getElementById('name').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById ('userName').value = '';
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
