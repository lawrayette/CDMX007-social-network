const name = document.getElementById('name-space');
let db = firebase.firestore();
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

function send() {
  let textInput = document.getElementById('input').value;
  db.collection("state").add({
      first: textInput,

    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      let textInput = document.getElementById('input').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

}

//
let table = document.getElementById('table-state');
db.collection("state").onSnapshot((querySnapshot) => {
  table.innerHTML = '';
  querySnapshot.forEach((doc) => {
     console.log(`${doc.id} => ${doc.data().first}`);
    table.innerHTML += `
    <tr>
      <td>${doc.data().first}</td>
      <p>
      <button class = "btn btn-danger" onclick = "deleteData('${doc.id}')"> Eliminar </button>
      <button class = "btn btn-warning" onclick = "editState('${doc.id}','${doc.data().first}' )"> Editar </button>
     </p>
     </tr>
    `
  });
});


function deleteData(id) {
  if (confirm ('¿Realmente deseas eliminar tu mensaje?')){
  db.collection("state").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });  
}else{
  return false;
}
}



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
 

