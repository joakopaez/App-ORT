function initLogin() {
    document.querySelector("#logInButton").addEventListener("click", loged)
    document.querySelector("#toSignClient").addEventListener("click", signClientChange)
    document.querySelector("#toSignWalker").addEventListener("click", signWalkerChange)
}
//----------Legeo de cliente o peseador, devuelve la intancia del cliente
function loged() {
    const userName = document.querySelector("#inputRegistedUser").value;
    const password = document.querySelector("#inputRegistedPassword").value;
    const userType = document.querySelector("#inputUserType").value;
    if(logIn(userName,password,userType)){
    if(logIn){
        if(userType == "Paseador"){
            walkerHirings()
        }else if(userType == "Cliente"){
            whatShow()
        }
    }}
}