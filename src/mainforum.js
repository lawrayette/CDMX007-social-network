const generalTable = document.getElementById('state-user');
const filteredTable = document.getElementById('state-user-filter');
let db = firebase.firestore();
const image = document.getElementById('input.image');
let mainApp = {};

//let nameInput = document.getElementById('name-input')
(function () {
  let firebase = app_fireBase;
  //let uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      localStorage.setItem('user', JSON.stringify(user))
      name = user.displayName;
      eMail = user.email;
      photoURL = user.photoURL;
      uid = user.uid;
      //---------------Imprime foto y nombre de usuario-------------------//
      let printPhoto = document.getElementById('print-photo')
      let printPhotoPost = document.getElementById('print-photo-post')
      let photo = user.photoURL
      printPhoto.innerHTML =  `<img src="${photo}" alt="FotoPerfil" style="width: 40px; border-radius:50%"></img>`
    printPhotoPost.innerHTML =  `<img src="${photo}" alt="FotoPerfil" style="width: 40px; border-radius:50%"></img>`
      let nameCurrent = document.getElementById('name-input').innerHTML = `${name}`
      let nameCurrentPost = document.getElementById('name-input-post')
      nameCurrentPost.innerHTML = `${name}`
     
    } else {
      //redirect to login page
      uid = null;
      window.location.replace("index.html");
    }
  });
   function logOut() {
    firebase.auth().signOut();
  }
  mainApp.logOut = logOut;
})()

// Crea los datos y los manda a Firestore

  

function send() {
  let userPost = JSON.parse(localStorage.getItem("user"))
  let textInput = document.getElementById('input').value;
  let areaSelected = document.getElementById('dropdown3').value;
  console.log (areaSelected)
  let privateMsgChecked = document.getElementById('private').checked
  db.collection("state").add({
    name: userPost.displayName,
    area: areaSelected,
    first: textInput,
    uid:userPost.uid,
    private: privateMsgChecked,
    
  })
  .then(function (docRef) {
    console.log('llego')
      console.log("Document written with ID: ", docRef.id);
      let textInput = document.getElementById('input').value = '';
      let nametInput = document.getElementById('name-input').value = '';
  
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}


//filtra por tipo de contenido al dar click en el li del área impresa
let searchGlass = document.getElementById("filterSteamBtn");
let areaSelection= document.getElementsByClassName('area-name');
let listContainer= document.getElementById("dropdown1");

searchGlass.addEventListener('click', ()=>{
  listContainer.style.display="block";
  for (let i = 0; i < areaSelection.length; i++) {
    areaSelection[i].addEventListener('click', () => {
    let areaClicked = areaSelection[i].id;
    console.log(areaClicked);
    listContainer.style.display="none";

    db.collection("state").where("area", "==", areaClicked).get().then(printData);
    })}})

    //--------------- filtra mensajes privados y publicos-------------------//
    let filterByPrivacyBtn = document.getElementById("filter-by-privacy-btn");
let privacySelection= document.getElementsByClassName('privacy-name');
let listPrivacy = document.getElementById('list-privacy');
let privacyClicked = null
filterByPrivacyBtn.addEventListener('click', ()=>{
    for (let i = 0; i < privacySelection.length; i++) {
    privacySelection[i].addEventListener('click', () => {
    privacyClicked = privacySelection[i].id;
    console.log(privacyClicked);
  })}})

// if (privacyClicked == 'private') {
//  db.collection("state").where("uid", "==", uid).where("private", "==", true)
//     .get()
//     .then(printData)
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
//   }else{
//     console.log('son publicos')
//     db.collection("state").where("uid", "==", uid).where("private", "==", false)
//     .get()
//     .then(printData)
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
//   }


//--------------- termina mensajes privados y publicos-------------------//

// imprime los datos en el muro
db.collection("state").onSnapshot((querySnapshot) => {
  generalTable.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
    generalTable.innerHTML += `
    <div class="card  text-center alert alert-info">
       <p>${doc.data().name}</p>
      <p>${doc.data().first}</p>
      <li class="area" value="${doc.data().area}">${doc.data().area}</li>
      <p>
      <button class = "btn btn-danger btn-sm" onclick = "deleteData('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
      <button id = "edit-button" class = "btn btn-warning btn-sm"data-toggle="modal" data-target="#exampleModal" onclick = "editState('${doc.id}','${doc.data().first}','${doc.data().name}','${doc.data().area}')"><i class="fas fa-pen-nib"></i></button>
     <a href="https://twitter.com/share?url=https://jaurinu.github.io/CDMX007-social-network/src/&amp;text=Punto%20STEAM%20&amp;hashtags=puntosteam" target="_blank">
     <img src="https://simplesharebuttons.com/images/somacro/twitter.png" width="25 height="25" alt="Twitter" /></a>
     <button id="applause-container"><applause-button id="applause-${doc.id}" url="http://localhost:8887/${doc.id}" multiclap="true" class="applause-clase" color="Black"/></button>
     </p>
    </div>
    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
     <div class="modal-body">
     <textarea id="input-edit" class="form-control" rows="3" cols="50" aria-label="With textarea" autofocus></textarea>
         </div>
      <div class="modal-footer">
        <button id = "save-data" type="button" class="btn btn-primary" data-dismiss="modal"><i class="fas fa-save"></i></button>
      </div>
    </div>
  </div>
</div>
    `
  });
});

//imprime los datos del filtro
const printData = (querySnapshot) => {
  filteredTable.style.display= "block";
  filteredTable.innerHTML = "";
  querySnapshot.forEach((doc) => {
    filteredTable.innerHTML += `
    <div class="card  text-center alert alert-info">
    <p>${doc.data().name}</p>
    <p>${doc.data().first}</p>
    <p>${doc.data().image}</p>
    <li class="area" value="${doc.data().area}">${doc.data().area}</li>
      
      <p>
      <button id="delete-btn"class = "btn btn-danger btn-sm " onclick = "deleteData('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
      <button id="edit-btn"class = "btn btn-warning btn-sm " onclick = "editState('${doc.id}','${doc.data().first}','${doc.data().name}','${doc.data().area}')"><i class="fas fa-edit"></i></button>
     <a href="https://twitter.com/share?url=https://jaurinu.github.io/CDMX007-social-network/src/&amp;text=Punto%20STEAM%20&amp;hashtags=puntosteam" target="_blank">
     <img src="https://simplesharebuttons.com/images/somacro/twitter.png" width="25 height="25" alt="Twitter" /></a>
     <button id="applause-container"><applause-button id="applause-${doc.id}" url="http://localhost:8887/${doc.id}" multiclap="true" class="applause-clase" color="Black"/></button>
     </p>
    </div>
    `
  });
  generalTable.style.display = "none";
};						


//le funcion de filtrado y el 'back' al hacer el click en el logo steam funciona mostrando y ocultando
//los divs que contiene los datos
//nota para pasar a SPA

// elimina los datos del muro
function deleteData(id) {
  if (confirm('¿Realmente deseas eliminar tu mensaje?')) {
    db.collection("state").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  } else {
    return false;
  }
}

//Edita los datos
function editState(id, state) {
  let editButton = document.getElementById('save-data');
      document.getElementById('input-edit').value = state;
      
   editButton.onclick = function () {
     var washingtonRef = db.collection("state").doc(id);
 
     let newInput = document.getElementById('input-edit').value;
        return washingtonRef.update({
         first: newInput,
        })
       .then(function () {
         console.log("Document successfully updated!");
        
             })
       .catch(function (error) {
         // The document probably doesn't exist.
         console.error("Error updating document: ", error);
       });
   }
 }
 


// 
// Get a reference to the storage service, which is used to create references in your storage bucket

