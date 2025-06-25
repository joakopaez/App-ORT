function initWalkerHirings(){
    document.querySelector("#btnOutWH").addEventListener("click", backToLogin);
    showHirings();

}
//muestra las contrataciones del paseador logeado, en las tablas correspondientes
function showHirings(){
    const bodyAprob = document.querySelector("#tableAprobBody");
    const bodyPend = document.querySelector("#tablePendBody");
    const bodyStats = document.querySelector("#tableStatsBody");
    const message = document.querySelector("#message")
    let maxSlots = Number(app.getCurrentUser().totalSlot);
    let usedSlots = 0;
    let porcSlots = 0;

    //vacia el body de las tablas
    bodyPend.innerHTML = "";
    bodyAprob.innerHTML = "";
    bodyStats.innerHTML = "";
    bodyStats.innerHTML += `
        <tr>
            <td>${usedSlots}</td>
            <td>${maxSlots}</td>
            <td>%${porcSlots}</td>
        </tr> 
        `;
    
    //recorre las las contrataciones del usuario paseador logeado
    app.getHirings().forEach(hiring =>{
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
            usedSlots += hiring.client.dog.size;
            message.innerHTML = ``
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

    if(usedSlots > 0){
        bodyStats.innerHTML = ``
        porcSlots = parseInt((usedSlots*100)/maxSlots);
        bodyStats.innerHTML += `
        <tr>
            <td>${usedSlots}</td>
            <td>${maxSlots}</td>
            <td>%${porcSlots}</td>
        </tr> 
        `;
        
    }else{
        message.innerHTML = "<h1>No hay perros asignados actualmente<h1>";
    }

    handleWalkerHirings()
}

function handleWalkerHirings() {
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

    app.getHirings().forEach(hiring =>{
        if(hiring.id == id){
            hiring.status = "Rejected";
        }
    })
    showHirings();
}

function aceptarHiring(){
    //guarda el id del boton que disparo el evento
    const id = Number(this.getAttribute("data-id"));

    app.getHirings().forEach(hiring =>{
        if(hiring.id == id){
            hiring.status = "Accepted";
            app.getCurrentUser().slot = app.getCurrentUser().slot - hiring.client.dog.size;
        }
    })

    validatePendingHirings()
    showHirings();
}
