
const filteredTable = document.getElementById('state-user-filter');



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

// Crea los datos y los manda a Firestore
function send() {
  let textInput = document.getElementById('input').value;
  // let nameInput = document.getElementById('name-input').value;
  let areaInput = document.getElementById('area-select').value;
  let privateMsgChecked = document.getElementById('private').checked

  if (privateMsgChecked == true){
  
  db.collection("private").add({
    area: areaInput,
    name: name,
    first: textInput,
    uid: uid,
   private: privateMsgChecked,  
  })
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
    let textInput = document.getElementById('input').value = '';
    let nametInput = document.getElementById('name-input').value = '';
   })
   .catch(function (error) {
    console.error("Error adding document: ", error);
  });
}else{ 
  db.collection("state").add({
    area: areaInput,
    name: name,
    first: textInput,
    uid:uid,
   private: privateMsgChecked,  
  })
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
    let textInput = document.getElementById('input').value = '';
    let nametInput = document.getElementById('name-input').value = '';
   })

  .catch(function (error) {
    console.error("Error adding document: ", error);
  });
  
}
}

//filtra por tipo de contenido al dar click en el li del área impresa
let searchGlass = document.getElementById("dropdownMenuButton");
let areaSelection= document.getElementsByClassName('area-name');
let listContainer= document.getElementById("area-search");
//eventos del dom para mostrar y ocultar post
let principalPrint = document.getElementById('principalPrint');
let printDataFunction = document.getElementById('printDataFunction');


//da eventos de click a lista de 'areas'
searchGlass.addEventListener('click', ()=>{
  listContainer.style.display="block";
  for (let i = 0; i < areaSelection.length; i++) {
    areaSelection[i].addEventListener('click', () => {
    let areaClicked = areaSelection[i].id;
    console.log(areaClicked);
    listContainer.style.display="none";

    db.collection("state").where("area", "==", areaClicked).get().then(printData);
    })}})


//---------------mensajes privados y publicos-------------------//
let selectPrivacy = document.getElementById('select-Privacy')
selectPrivacy.addEventListener('change', () => {
  console.log(selectPrivacy.value)
if (selectPrivacy.value == 'private') {
 db.collection("private").where("uid", "==", uid).where("private", "==", true)
    .get()
    .then(printData)
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }else{
    console.log('son publicos')
    db.collection("state").where("uid", "==", uid).where("private", "==", false)
    .get()
    .then(printData)
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
});
//--------------- termina mensajes privados y publicos-------------------//




