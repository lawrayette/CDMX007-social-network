libreria.controlador('miControlador', {


  login: () => {
    (function () {
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '01index.html#/forum',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],

        // Terms of service url.
        tosUrl: '01index.html#/forum',
        // Privacy policy url.
        //privacyPolicyUrl: '<your-privacy-policy-url>'
      };
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    })()
  },



  forumFunctions:()=>{

    const generalTable = document.getElementById('state-user');

    let db = firebase.firestore();
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

// Función para guardar datos de usuario logueado en imprimirlas en el foro
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

      let printPhoto = document.getElementById('print-photo')
      let photo = user.photoURL
      printPhoto.innerHTML =  `<img src="${photo}" alt="FotoPerfil" style="width: 40px; border-radius:50%"></img>`
     
      let nameCurrent = document.getElementById('name-input').innerHTML = ` ${name}`
     
      console.log(nameCurrent)
      console.log(uid)
    }
    });
})()




  },



  printComunity: () => {
       db = firebase.firestore();

    let table = document.getElementById('table');
    //datos de usuarios
    db.collection("members").get().then((querySnapshot) => {
      table.innerHTML = "";
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        table.innerHTML += `
                <tr>
                <td>${doc.data().first}</td>
                <td>${doc.data().user}</td>
                <td>${doc.data().interest}</td>
                <td>${doc.data().contactEmail}</td>
              </tr>`
      });
    });
  },
  profileFunctions:()=>{

db = firebase.firestore();


//--------------------------trae datos de inicio de sesion ---------------------------//

const userCurrent = JSON.parse(localStorage.getItem('user'));
console.log(userCurrent)
let name = document.getElementById('name').value = userCurrent.displayName;

console.log (name)
let eMail = document.getElementById('eMail').value = userCurrent.email;
let printPhoto = document.getElementById('print-photo');
let photo = userCurrent.photoURL;
let uidCurrent = userCurrent.uid;
printPhoto.innerHTML =  `<img src="${photo}" alt="FotoPerfil" style="width: 100px; border-radius:50%"></img>`


//----------------------Guarda datos------------------------------------//

const saveProfile = document.getElementById('saveProfile');
saveProfile.addEventListener("click", () => {

  let name = document.getElementById('name').value;
  //let lastName = document.getElementById('lastName').value;
  let userName = document.getElementById('userName').value;
  let interestArea = document.getElementById('interestArea').value;
  let eMail = document.getElementById('eMail').value;
  let uid = uidCurrent;
  if (name === "" || /*lastName === ""||*/ userName === "" || interestArea === "" || eMail === "") {
      alert('Por favor, completa todos los campos del formulario')
  } else {
      db.collection('members').add({
          first: name,
         // last: lastName,
          user: userName,
          interest: interestArea,
          contactEmail: eMail,
          uid: uidCurrent
      }).then((docRef) => {
          console.log('Document written with ID:', docRef.id);
          document.getElementById('name').value = '';
         // document.getElementById('lastName').value = '';
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
          cardName.innerHTML = `${name}`;
          cardUser.innerHTML = `${userName}`;
          cardInterest.innerHTML = `${interestArea}`;
          cardContact.innerHTML = `${eMail}`;
      })
  }

})


   }


})