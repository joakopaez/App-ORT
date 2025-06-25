function initSignUp (){
    document.querySelector("#registerClient").addEventListener("click",newClient)
}
//-------Agregar cliente-----
function newClient() {
    const name = document.querySelector("#inputName").value.trim();
    const lastName = document.querySelector("#inputLastName").value.trim();
    const userName = document.querySelector("#inputUserName").value.trim();
    const password = document.querySelector("#inputPassword").value.trim();
    const dogName = document.querySelector("#inputDogName").value.trim();
    const dogSize = parseInt(document.querySelector("#inputDogSize").value);

    if (signInClient(name, lastName, userName, password, dogName, dogSize)) {
        const signedDog = new Dog(dogName, dogSize);
        const signedClient = new Client(name, lastName, userName, password, signedDog);
        app.pushClient(signedClient);
        Swal.fire({
            icon: 'success',
            title: '¡Registro completado!',
            text: `Tu registro se realizó con éxito`
        });
    app.changeCurrentUser(signedClient)
    availableWalkers()
    walkerAviable()
    }
}