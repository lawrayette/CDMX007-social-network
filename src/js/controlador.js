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
  /*forumFunctions:()=>{
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
    
          let printPhoto = document.getElementById('print-photo')
          let photo = user.photoURL
          printPhoto.innerHTML =  `<img src="${photo}" alt="FotoPerfil" style="width: 20px; border-radius:50%"></img>`
         
          let nameCurrent = document.getElementById('name-input').innerHTML = ` ${name}`
         
          console.log(nameCurrent)
          console.log(uid)
          
        } else {
          //redirect to login page
          uid = null;
          window.location.replace("index.html");
        }
      });
      
      console.log(name)
      //console.log(uid)
    
    
      function logOut() {
        firebase.auth().signOut();
      }
      mainApp.logOut = logOut;
    })()
    
    // Crea los datos y los manda a Firestote
    function send() {
      let textInput = document.getElementById('input').value;
      // let nameInput = document.getElementById('name-input').value;
      let areaInput = document.getElementById('area-select').value;
      let privateMsgChecked = document.getElementById('private').checked
    
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
    
    //filtra por tipo de contenido al dar click en el li del área impresa
    let searchGlass = document.getElementById("dropdownMenuButton");
    let areaSelection= document.getElementsByClassName('area-name');
    let listContainer= document.getElementById("area-search");
    //eventos del dom para mostrar y ocultar post
    let principalPrint = document.getElementById('principalPrint');
    let printDataFunction = document.getElementById('printDataFunction');
    
    
    //logo de steam con función de "home"
    // let logoSteamHome = document.getElementById("logo-nav");
    // logoSteamHome.addEventListener('click', ()=>{
    //   console.log ('funciona');
    //   filteredTable.style.display = "none";
    //   generalTable.style.display= "block";
    // })
    
    //---------------mensajes privados y publicos-------------------//
    // let selectPrivacy = document.getElementById('select-Privacy')
    // selectPrivacy.addEventListener('change', () => {
    //   console.log(selectPrivacy.value)
    // if (selectPrivacy.value == 'private') {
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
    // });
    //--------------- termina mensajes privados y publicos-------------------//
    
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
    
    // imprime los datos en el muro
    // db.collection("state").onSnapshot((querySnapshot) => {
    //   generalTable.innerHTML = '';
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data().first}`);
    //     generalTable.innerHTML += `
    //     <div class="card  text-center alert alert-info">
    //        <p>${doc.data().name}</p>
    //       <p>${doc.data().first}</p>
    //       <li class="area" value="${doc.data().area}">${doc.data().area}</li>
    //       <p>
    //       <button class = "btn btn-danger btn-sm" onclick = "deleteData('${doc.id}')"><i class="fas fa-trash-alt"></i></button>
    //       <button id = "edit-button" class = "btn btn-warning btn-sm"data-toggle="modal" data-target="#exampleModal" onclick = "editState('${doc.id}','${doc.data().first}','${doc.data().name}','${doc.data().area}')"><i class="fas fa-pen-nib"></i></button>
    //      <a href="https://twitter.com/share?url=https://jaurinu.github.io/CDMX007-social-network/src/&amp;text=Punto%20STEAM%20&amp;hashtags=puntosteam" target="_blank">
    //      <img src="https://simplesharebuttons.com/images/somacro/twitter.png" width="25 height="25" alt="Twitter" /></a>
    //      <button id="applause-container"><applause-button id="applause-${doc.id}" url="http://localhost:8887/${doc.id}" multiclap="true" class="applause-clase" color="Black"/></button>
    //      </p>
    //     </div>
    //     <!-- Modal -->
    // <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //   <div class="modal-dialog" role="document">
    //     <div class="modal-content">
    //      <div class="modal-body">
    //      <textarea id="input-edit" class="form-control" rows="3" cols="50" aria-label="With textarea" autofocus></textarea>
    //          </div>
    //       <div class="modal-footer">
    //         <button id = "save-data" type="button" class="btn btn-primary" data-dismiss="modal"><i class="fas fa-save"></i></button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //     `
    //   });
    // });
    
    
     //aparecen botones editar y eliminar
     
    //  const ButtonUnhide = () => {
       
    //   if (`${doc.id}.uid == uid`) {
    //     console.log(doc.data().uid)
    //     document.getElementById('delete-btn').classList.remove('hide');
    //     document.getElementById('edit-btn').classList.remove('hide');
    //   }
    // }
    // ButtonUnhide();
    
    // let selectPrivacy = document.getElementById('select-Privacy')
    // selectPrivacy.addEventListener('change', () => {
    //   console.log(selectPrivacy.value)
    // if (selectPrivacy.value == 'private') {
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
    // });
    
    
     
    
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
     
    
    
    //See User
    const userProfile = document.getElementById('button-user')
    userProfile.addEventListener("click", () => {
      window.location = 'profile.html';
    })
    
    
    // 
    // Get a reference to the storage service, which is used to create references in your storage bucket
    
    
  },*/
  





  forumFunctions: () => {

    //const unhideButtons = document.getElementById('unhideButtons')
/*
    const showMenu = () => {
      //unhideButtons.classList.remove('hide');
      document.getElementById('hideLogin').style.display = 'none';
    }
    showMenu()
    const filterSteamBtn = document.getElementById('filterSteamBtn');
    const filterByPrivacyBtn = document.getElementById('filterByPrivacyBtn');
    const showDropdownButtons = () => {
      filterSteamBtn.classList.remove('hide');
      filterByPrivacyBtn.classList.remove('hide');
    }
    showDropdownButtons();

    */







    /*
         const showDropdownButtons = ()=>{
         

         } 
         showDropdownButtons();*/


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


  },


  printComunity: () => {
    /*
          firebase.initializeApp({
            apiKey: "AIzaSyCckaF20jG2kPIzpahf3_8P6trQmFf5yq0",
            authDomain: "steam-3b4ca.firebaseapp.com",
            projectId: "steam-3b4ca",
        });
        */
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
                <td>${doc.data().last}</td>
                <td>${doc.data().user}</td>
                <td>${doc.data().interest}</td>
                <td>${doc.data().contactEmail}</td>
              </tr>`
      });
    });











  }


















})