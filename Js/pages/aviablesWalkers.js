function initavialbleWalkers(){
    document.querySelector("#btnOutAW").addEventListener("click", backToLogin);
    walkerAviable()
}
//-----Mostrar paseadores disponibles---------
function walkerAviable(){
    const clientDogSize = app.getDogSize();
    const aviableWalkers= [];
    app.getArrWalker().forEach(walker => {
        let notMachSize = false;
    walker.hiring.forEach(hiring =>{
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
    const bodyAviable = document.querySelector("#showAviableWalkers");

    bodyAviable.innerHTML = ""

    aviableWalkers.forEach( walker => {
        bodyAviable.innerHTML +=`
        <tr>
            <td>${walker.name}</td>
            <td>${walker.lastName}</td>
            <td>${walker.slot}</td>
            <td><button type="button" data-id="${walker.id}" id="" class="btn btn-aceptar btn-success">Solicitar paseo</button></td>
        </tr>
        `;
    })
    selectWalker()
}

function selectWalker(){
    const sendButton = document.querySelectorAll(".btn-aceptar")
    if(sendButton){
        sendButton.forEach(btn => {
            btn.addEventListener("click", sendNewHiring)
        })
    }
}

function sendNewHiring() {
    const id = Number(this.getAttribute("data-id"));
    const currentClient = app.getCurrentUser();
        app.pushNewHiring(currentClient)
        app.addHiringToWalker(currentClient, id)
    ;
    Swal.fire({
        icon: 'success',
        title: '¡Contratación enviada!',
        text: `Tu solicitud ha sido enviada, espera confirmación`
    });
    clientHiringSend()
}