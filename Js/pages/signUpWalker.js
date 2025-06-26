function initSignUpW(){
    document.querySelector("#registerWalker").addEventListener("click",newWalker)
}

//-------- Agregar paseador
function newWalker() {
    const name = document.querySelector("#inputName").value.trim();
    const lastName = document.querySelector("#inputLastName").value.trim();
    const userName = document.querySelector("#inputUserName").value.trim();
    const password = document.querySelector("#inputPassword").value.trim();
    const slot = parseInt(document.querySelector("#inputSlot").value);
    const totalSlot = slot;

    if (signInDogWalker(name, lastName, userName, password, slot, totalSlot)) {
        const signedWalker = app.pushWalker(name, lastName, userName, password, slot, totalSlot);
        Swal.fire({
        icon: 'success',
        title: '¡Registro completado!',
        text: `Tu registo se realizó con éxito`
    });
    app.changeCurrentUser(signedWalker)
    walkerHirings()
    }
}