libreria.controlador('miControlador', {


  login: () => {
    (function () {
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            return true;
          },
          uiShown: function () {
            document.getElementById('loader').style.display = 'none';
          }
        },
        signInFlow: 'popup',
        signInSuccessUrl: '01index.html#/forum',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],

        tosUrl: '01index.html#/forum',
      };
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
                <td class="email">${doc.data().contactEmail}</td>
              </tr>`
      });
    });











  }


















})