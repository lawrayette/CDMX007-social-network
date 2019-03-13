const table = document.getElementById('state-user');
let db = firebase.firestore();
const image = document.getElementById('input.image');
let mainApp = {};


(function () {
  let firebase = app_fireBase;
  let uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
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

// Crea los datos y los manda a Firestote
function send() {
  let textInput = document.getElementById('input').value;
  let nameInput = document.getElementById('name-input').value;
  let areaInput = document.getElementById('area-select').value;
  let imageInput = document.getElementById('input-image').value;
  db.collection("state").add({
      area: areaInput,
      name: nameInput,
      first: textInput,
      image: imageInput,

    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      let textInput = document.getElementById('input').value = '';
      let nametInput = document.getElementById('name-input').value = '';
      let imageInput = document.getElementById('input-image').value = '';

    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

}

// imprime los datos en el muro
db.collection("state").onSnapshot((querySnapshot) => {
  table.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
    table.innerHTML += `
    <div class="card  text-center alert alert-info">
       <p>${doc.data().name}</p>
      <p>${doc.data().first}</p>
      <p>${doc.data().image}</p>
      <li class="area" value="${doc.data().area}">${doc.data().area}</li>

      <p>
      <button class = "btn btn-danger btn-sm" onclick = "deleteData('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
      <button class = "btn btn-warning btn-sm" onclick = "editState('${doc.id}','${doc.data().first}','${doc.data().name}','${doc.data().area}')"><i class="fas fa-edit"></i></button>
     <a href="https://twitter.com/share?url=https://jaurinu.github.io/CDMX007-social-network/src/&amp;text=Punto%20STEAM%20&amp;hashtags=puntosteam" target="_blank">
     <img src="https://simplesharebuttons.com/images/somacro/twitter.png" width="25 height="25" alt="Twitter" /></a>
     <button id="applause-container"><applause-button id="applause-${doc.id}" url="http://localhost:8887/${doc.id}" multiclap="true" class="applause-clase" color="Black"/></button>
     </p>
    </div>
    `
  });  
});


//imprime los datos del filtro
const printData = (querySnapshot) => {
  table.innerHTML = "";
  querySnapshot.forEach((doc) => {
    table.innerHTML += `
    <div>
       <p>${doc.data().name}</p>
      <td>${doc.data().first}</td>
      <li class="area" value="${doc.data().area}">${doc.data().area}</li>
      <div id="applause-container"><applause-button id="applause-${doc.id}" url="http://localhost:8887/${doc.id}" multiclap="true" class="applause-clase" color="Black"/></div>

      <p>
      <button class = "btn btn-danger" onclick = "deleteData('${doc.id}')"> Eliminar </button>
      <button class = "btn btn-warning" onclick = "editState('${doc.id}','${doc.data().first}','${doc.data().name}','${doc.data().area}')"> Editar </button>
     </p>

     </div>
    `
	});
};						


//filtra por tipo de contenido al dar click en el li del área impresa
let searchGlass = document.getElementById("button-search-on-user");
let areaSelection= document.getElementsByClassName('area-name');
let listContainer= document.getElementById("area-search");

searchGlass.addEventListener('click', ()=>{
  listContainer.style.display="block";
  for (let i = 0; i < areaSelection.length; i++) {
    areaSelection[i].addEventListener('click', () => {
    let areaClicked = areaSelection[i].id;
    console.log(areaClicked);
    listContainer.style.display="none";

    db.collection("state").where("area", "==", areaClicked).get().then(printData);
    })}
  

})
  

  //searchByAreaInput.addEventListener("keyup", () => {
   // let searchValue = searchInput.value;
    //console.log(searchValue);
  //})

//db.collection("state").where("userId", "==", user.Id).get().then(printData)













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
function editState(id, state, name) {
  document.getElementById('input').value = state;
  document.getElementById('name-input').value = name;

  let editButton = document.getElementById('sendButton');
  editButton.innerHTML = "Editar";

  editButton.onclick = function () {
    var washingtonRef = db.collection("state").doc(id);

    let textInput = document.getElementById('input').value;
    let nameInput = document.getElementById('name-input').value;

    return washingtonRef.update({
        first: textInput,
        name: nameInput,
      })
      .then(function () {
        console.log("Document successfully updated!");
        let textInput = document.getElementById('input').value = '';
        editButton.innerHTML = "Guardar";
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}

//See User
const userProfile = document.getElementById('button-user')
userProfile.addEventListener("click", () => {
  window.location = 'profile.html';
})


// 
// Get a reference to the storage service, which is used to create references in your storage bucket

