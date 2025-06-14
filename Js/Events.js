function addClient() {
    const name = document.querySelector("#inputName").value.trim();
    const lastName = document.querySelector("#inputLastName").value.trim();
    const userName = document.querySelector("#inputUserName").value.trim();
    const password = document.querySelector("#inputPassword").value.trim();
    const dogName = document.querySelector("#inputDogName").value.trim();
    const dogSize = parseInt(document.querySelector("#inputDogSize").value);

    if (signInClient(name, lastName, userName, password, dogName, dogSize)) {
        const signedDog = new Dog(dogName, dogSize);
        const signedClient = new Client(name, lastName, userName, password, IdClient++, signedDog);
        arrClient.push(signedClient);
        alert("Cliente agregado con éxito");
    }
}  

function addDogWalker() {
    const name = document.querySelector("#inputName").value.trim();
    const lastName = document.querySelector("#inputLastName").value.trim();
    const userName = document.querySelector("#inputUserName").value.trim();
    const password = document.querySelector("#inputPassword").value.trim();
    const slot = parseInt(document.querySelector("#inputSlot").value);

    if (signInDogWalker(name, lastName, userName, password, slot)) {
        const newWalker = new DogWalker(name, lastName, userName, password, IdWalker++, [], slot);
        arrWalker.push(newWalker);
        alert("Paseador agregado con éxito");
    }
}

function loged() {
    const userName = document.querySelector("#inputRegistedUser").value;
    const password = document.querySelector("#inputRegistedPassword").value;
    const userType = document.querySelector("#inputUserType").value;
    logIn(userName, password, userType)
    userView = "Loged Client"
}

function sendNewHiring(walkerId) {
  const currentClient = user;
  const newHiringId = idHiring;
  const newHiring = new Hiring(currentClient, newHiringId, 'Pending');
  arrHiring.push(newHiring);
  Swal.fire({
    icon: 'success',
    title: '¡Contratación enviada!',
    text: `Tu solicitud ha sido enviada, espera confirmación`
  });
  idHiring ++
}
function walkerAviable(user){
    const clientDogSize = user.dog.size;
    const aviableWalkers= [];
    arrWalker.forEach(walker => {
        let notMachSize = false;
    walker.hirings.forEach(hiring =>{
        const hClient = hiring.client;
        const hDogSize = hClient.dog.size;
        if((clientDogSize === 1 && hDogSize === 4) || (clientDogSize === 4 && hDogSize === 1)){
            notMachSize = true;
        }
    })
    if(!notMachSize){
        aviableWalkers.push(walker);
    }
    })
    return aviableWalkers;
}

function showHirings(user){
    let currentWalker = "";
    
    arrWalker.forEach(walker => {
        if(walker.userName == user){
            currentWalker = walker;
            console.log(currentWalker);
        }
    })

    currentWalker.hiring.forEach(hiring =>{
        if(hiring.status == "Pending"){
            const body = document.querySelector("#tablePendBody");
            
            body.innerHTML += `
                <tr>
                    <td>${hiring.client.name} ${hiring.client.lastName}</td>
                    <td>${hiring.client.dog.name}</td>
                    <td>${hiring.client.dog.size}</td>
                    <td>${hiring.status}</td>
                    <td><button type="button" class="btn btn-success">Aceptar</button></td>
                </tr>  
            `;
            
        }else if(hiring.status == "Acepted"){
            const body = document.querySelector("#tableAprobBody");
            
            body.innerHTML += `
                <tr>
                    <td>${hiring.client.name} ${hiring.client.lastName}</td>
                    <td>${hiring.client.dog.name}</td>
                    <td>${hiring.client.dog.size}</td>
                    <td>${hiring.status}</td>
                </tr>  
            `;

            
        }
    })


}