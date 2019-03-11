vidMembers= document.getElementById('vid-members');

firebase.initializeApp({
    apiKey: "AIzaSyCckaF20jG2kPIzpahf3_8P6trQmFf5yq0",
    authDomain: "steam-3b4ca.firebaseapp.com",
    projectId: "steam-3b4ca",
});

let db = firebase.firestore();

vidMembers.addEventListener("click", ()=>{
        window.location = 'members.html';  
})


const saveProfile = document.getElementById('saveProfile')

saveProfile.addEventListener("click", () => {
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let interestArea = document.getElementById('interestArea').value;
    let contact = document.getElementById('contact').value;
    db.collection('members').add({
     first: name,
     last: lastName, 
     interest: interestArea,
     contactEmail: contact
    }).then( (docRef)=>{
        console.log('Document written with ID:', docRef.id);
        document.getElementById ('name').value ='';
        document.getElementById('lastName').value ='';
        document.getElementById('interestArea').value = '';
        document.getElementById('contact').value ='';
    }).catch((error)=>{
        console.log('Error adding document:', error);
    }).then (()=>{
        window.location = 'members.html';
    })

})


