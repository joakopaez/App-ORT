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

function signClientChange(){
    userView = "SingUpClient"
    NavigateTo(userView,initSignUp)
}

function signWalkerChange(){
    userView = "SignUpWalker"
    NavigateTo(userView,initSignUpW)
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


//--------------- FUNCIONES CONTRATACIONES PENDIENTES/ACEPTADAS ---------------
function walkerLogged(user){
    //busca la instancia del paseador logeado segun su usuario
    arrWalker.forEach(walker => {
        if(walker.userName == user){
            currentWalker = walker;
        }
    })
    return currentWalker;
}

//muestra las contrataciones del paseador logeado, en las tablas correspondientes
function showHirings(user){
    let currentWalker = walkerLogged(user);
    console.log(currentWalker);

    const bodyAprob = document.querySelector("#tableAprobBody");
    const bodyPend = document.querySelector("#tablePendBody");

    //vacia el body de las tablas
    bodyPend.innerHTML = "";
    bodyAprob.innerHTML = "";

    //recorre las las contrataciones del usuario paseador logeado
    currentWalker.hiring.forEach(hiring =>{
        //separa las contrataciones por estado, entre las dos tablas
        if(hiring.status == "Pending"){
            bodyPend.innerHTML += `
                <tr>
                    <td>${hiring.client.name} ${hiring.client.lastName}</td>
                    <td>${hiring.client.dog.name}</td>
                    <td>${hiring.client.dog.size}</td>
                    <td>${hiring.status}</td>
                    <td>
                        <button type="button" data-id="${hiring.id}" class="btn btn-aceptar btn-success">Aceptar</button>
                        <button type="button" data-id="${hiring.id}" class="btn btn-rechazar btn-danger">Rechazar</button>
                    </td>
                </tr>  
            `;
            
        }else if(hiring.status == "Accepted"){

            bodyAprob.innerHTML += `
                <tr>
                    <td>${hiring.client.name} ${hiring.client.lastName}</td>
                    <td>${hiring.client.dog.name}</td>
                    <td>${hiring.client.dog.size}</td>
                    <td>${hiring.status}</td>
                </tr>  
            `;

            
        }
    })
    contrataciones();
}

function contrataciones() {
    //guarda los botones para aceptar, en la tabla de hirings pendientes
    const btnsAceptar = document.querySelectorAll(".btn-aceptar");
    const btnsRechazar = document.querySelectorAll(".btn-rechazar");
    //si hay contrataciones pendientes
    if(btnsAceptar){
        //recorre todos los botones y le agrega un evento a cada uno
        btnsAceptar.forEach(btn => {
            btn.addEventListener("click", aceptarHiring);
        })
        
        btnsRechazar.forEach(btn => {
            btn.addEventListener("click", rechazarHiring);
        })
    }


}

function rechazarHiring(){
    const id = Number(this.getAttribute("data-id"));
    let currentWalker = walkerLogged(user);

    currentWalker.hiring.forEach(hiring =>{
        if(hiring.id == id){
            hiring.status = "Rejected";
        }
    })
    showHirings(user);
}

function aceptarHiring(){
    //cambiar estado y espacio disponible
    //validar que las pendientes restantes puedan ser aceptadas, si no rechazar
    //volver a llamar a showHirings

    //guarda el id del boton que disparo el evento
    const id = Number(this.getAttribute("data-id"));
    let currentWalker = walkerLogged(user);

    currentWalker.hiring.forEach(hiring =>{
        if(hiring.id == id){
            hiring.status = "Accepted";
            currentWalker.slot = currentWalker.slot - hiring.client.dog.size;
            console.log(currentWalker.slot);
        }
    })

    validatePendingHirings(currentWalker)
    showHirings(user);
}

// valida que las contrataciones pendientes cumplen con 
function validatePendingHirings(walker){
    walker.hiring.forEach(hiring =>{
        if(hiring.status == "Pending"){
            let pendingDogSize = hiring.client.dog.size;

            walker.hiring.forEach(hiring2 =>{
                if(hiring2.status == "Accepted"){
                    let acceptedDogSize = hiring2.client.dog.size;

                    if(pendingDogSize > walker.slot || (acceptedDogSize == 1 && pendingDogSize == 4) || (acceptedDogSize == 4 && pendingDogSize == 1)){
                        hiring.status = "Rejected";
                    }
                }
            })
        }
    })
    
    showHirings(user);
}