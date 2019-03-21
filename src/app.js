//funcion para desloguear

let mainApp = {};
function logOut() {
  firebase.auth().signOut();
}
mainApp.logOut = logOut;

db = firebase.firestore();
// Crea los datos y los manda a Firestore
function send() {
  let userPost = JSON.parse(localStorage.getItem("user"));
  let textInput = document.getElementById('input').value;
  // let areaSelected = document.getElementById('dropdown3').value;
  // console.log (areaSelected);
  let privateMsgChecked = document.getElementById('private').checked;
  db.collection("state").add({
    name: userPost.displayName,
    // area: areaSelected,
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