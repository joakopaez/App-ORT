function signInClient(name, lastName, userName, password, dogName, dogSize) {
    if (!name || !lastName || !userName || !password || !dogName || isNaN(dogSize)) {
        alert("Todos los campos son obligatorios");
        return false;
    }
    let userExists = false
    arrClient.forEach(c => {
      if (c.userName.toLowerCase() === userName.toLowerCase()) {
        userExists = true;
      }
    });
    if (userExists) {
      alert("Nombre de usuario ya registrado");
      return false;
    }
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
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
        alert("La contraseña debe incluir al menos una mayúscula, una minúscula y un número");
        return false;
    }

    return true;
}

function signInDogWalker(name, lastName, userName, password, slot) {
    if (!name || !lastName || !userName || !password || isNaN(slot) || slot <= 0) {
        alert("Todos los campos son obligatorios y el Tamaño debe ser un número válido");
        return false;
    }
    let userExists = false;
    arrWalker.forEach(w => {
        if (!userExists && w.userName.toLowerCase() === userName.toLowerCase()) {
            userExists = true;
        }
    });
    if (userExists) {
        alert("Nombre de usuario ya registrado");
        return false;
    }
    return true;
}

function logIn(userName, password, userType) {
    if(userType == "Cliente") {
        arrClient.forEach(function(client) {
            if (client.userName == userName && client.password == password){
                userView = "Client";
                user = userName;
            }
        });
        if(!user){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos'
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: `Bienvenido ${user}`,
                text: 'Inicio de sesión Cliente exitoso'
            });
        }
    }else if(userType == "Paseador") {
        arrWalker.forEach(function(walker) {
            if (walker.userName === userName && walker.password === password) {
                userView = "Walker";
                user = userName;
            }
        });
        if(!user){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos'
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: `Bienvenido ${user}`,
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
}

