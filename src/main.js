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



