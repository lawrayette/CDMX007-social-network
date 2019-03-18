/*
firebase.initializeApp({
    apiKey: "AIzaSyCckaF20jG2kPIzpahf3_8P6trQmFf5yq0",
    authDomain: "steam-3b4ca.firebaseapp.com",
    projectId: "steam-3b4ca",
});

 db = firebase.firestore();*/
   

 
    //datos de usuarios
    db.collection("members").get().then((querySnapshot) => {
     
        let table = document.getElementById('table');
        table.innerHTML = "";
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            table.innerHTML +=`
            <tr>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().user}</td>
            <td>${doc.data().interest}</td>
            <td>${doc.data().contactEmail}</td>
          </tr>`
        });
    });


    //Función para imprimir data 
    const printDataMembers= (table)=>{
        querySnapshot.forEach((doc)=>{
            `tr>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().user}</td>
            <td>${doc.data().interest}</td>
            <td>${doc.data().contactEmail}</td>
          </tr>`
          printDataMembers.insertAdjacentHtml(beforeend, table)
        })
    }
  





    
    /*
const uploadProfileimage = ()=>{

}
*/