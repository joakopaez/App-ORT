//Verifica los datos de ingreso de sesión///
function logIn(userName, password, userType) {
    let flag = null
    if(userType == "Cliente") {
        app.getArrClient().forEach(client => {
            if (client.userName == userName && client.password == password){
                app.changeCurrentUser(client);
                flag = true;            
            }
        });
        if(!flag){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos'
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: `Bienvenido ${app.getCurrentUser().userName}`,
                text: 'Inicio de sesión Cliente exitoso'
            });
        }
    }else if(userType == "Paseador") {
        app.getArrWalker().forEach(walker => {
            if (walker.userName === userName && walker.password === password) {
                app.changeCurrentUser(walker);
                flag = true
            }
        });
        if(!flag){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos'
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: `Bienvenido ${app.getCurrentUser().userName}`,
                text: 'Inicio de sesión Paseador exitoso'
            });
        }  
    }else if(userType == ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tipo de usuario Incorrecto'
        });
    }
    return app.getCurrentUser() != null;
    }
//Permite registrar un nuevo cliente//
function signInClient(name, lastName, userName, password, dogName, dogSize) {
    if (!name || !lastName || !userName || !password || !dogName || isNaN(dogSize)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios'
            });
        return false;
    }
    let userExists = false
    app.getArrClient().forEach(c => {
      if (c.userName.toLowerCase() === userName.toLowerCase()) {
        userExists = true;
      }
    });
    if (userExists) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Nombre de usuario no diponible'
            });
      return false;
    }
    if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener más de 6 caracteres'
            });
        return false;
    }
    let hasUpper = false;
    let hasLower = false;
    let hasDigit = false;

    for (let i = 0; i < password.length; i++) {
        const code = password.charCodeAt(i);
        if (code >= 65 && code <= 90) hasUpper = true;      
        else if (code >= 97 && code <= 122) hasLower = true; 
        else if (code >= 48 && code <= 57) hasDigit = true;  
        if (hasUpper && hasLower && hasDigit) break;
    }

    if (!hasUpper || !hasLower || !hasDigit) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
            });
        return false;
    }
    return true
    }
//Permite registrar un nuevo paseador//
function signInDogWalker(name, lastName, userName, password, slot) {
    if (!name || !lastName || !userName || !password || isNaN(slot) || slot <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios'
            });
        return false;
    }
    let userExists = false;
    app.getArrWalker().forEach(w => {
        if (!userExists && w.userName.toLowerCase() === userName.toLowerCase()) {
            userExists = true;
        }
    });
    if (userExists) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Nombre de usuario no disponible'
            });;
        return false;
    }
    return true;
    }

    
// valida que las contrataciones pendientes del paseador, cumplan con los requisitos para ser aceptadas, de lo contrario las rechaza.
function validatePendingHirings(){
    let reject = false;
    app.getHirings().forEach(hiring =>{
        if(hiring.status == "Pending"){
            let pendingDogSize = hiring.client.dog.size;

            app.getHirings().forEach(hiring2 =>{
                if(hiring2.status == "Accepted"){
                    let acceptedDogSize = hiring2.client.dog.size;

                    if(pendingDogSize > app.getCurrentUser().slot || (acceptedDogSize == 1 && pendingDogSize == 4) || (acceptedDogSize == 4 && pendingDogSize == 1)){
                        hiring.status = "Rejected";
                        reject = true;
                    }
                }
            })
        }
    })
    if(reject){
        Swal.fire({
            icon:`error`,
            title:`Atención`,
            text:`Se ha/n rechazado contratacion/es pendiente/s por falta de espacio`
        });
    }
    showHirings();
}
//Valida si al usuario que ingresa como cliente, se le muestra la página de paseadores diponibles o la de la solicitud enviada//
function whatShow(){
    app.getArrHiring().forEach (hiring => {
        if(hiring.client == app.getCurrentUser()){
            if(hiring.status != "Pending" && hiring.status != "Accepted"){
                availableWalkers()
            }else{
                clientHiringSend()
            }
        }
    })
}