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
    const userName = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const userType = document.getElementById('userType').value;
    logIn(userName, password, userType);
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
    const userHirings = 
}