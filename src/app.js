

//funcion para desloguear

let mainApp = {};
function logOut() {
  firebase.auth().signOut();
}
mainApp.logOut = logOut;

db = firebase.firestore();

//Crea los datos y los manda a Firestore
function send() {
  let userPost = JSON.parse(localStorage.getItem("user"));
  let textInput = document.getElementById('input').value;
  let areaSelected = document.getElementById('dropdown3').value;
  // console.log (areaSelected);
  let privateMsgChecked = document.getElementById('private').checked;
  db.collection("state").add({
    name: userPost.displayName,
    area: areaSelected,
    first: textInput,
    uid:userPost.uid,
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

   //función para el sidenav
   let sideNavMenu =
   (function(){
     document.addEventListener('DOMContentLoaded', function() {
       var elems = document.querySelectorAll('.sidenav');
       var instances = M.Sidenav.init(elems,{direction: 'left'});
     })})()

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
function editState(id,state) {
  document.getElementById('input').value = state;
  let editButton = document.getElementById('sendButton');
  editButton.innerHTML = "Editar";
 
  editButton.onclick = function () {
    var washingtonRef = db.collection("state").doc(id);
 
    let textInput = document.getElementById('input').value;
      return washingtonRef.update({
      first: textInput,
    })
    .then(function() {
        console.log("Document successfully updated!");
        let textInput = document.getElementById('input').value = '';
        editButton.innerHTML = "Enviar";
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    }
  }


 

 



