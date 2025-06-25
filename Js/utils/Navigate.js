let userView = "Login";
function NavigateTo(templateName, callback)  {
    const app = document.querySelector("#app")
    const template = document.querySelector(`#${templateName}`)
    if(template) {
        app.innerHTML = template.innerHTML
        if(callback) {
            callback()
        }
    }
}

function signClientChange(){
    userView = "SingUpClient"
    NavigateTo(userView,initSignUp)
}
function backToLogin(){
    userView = "Login"
    NavigateTo(userView, initLogin)
    currentUser = null
}
function signWalkerChange(){
    userView = "SignUpWalker"
    NavigateTo(userView,initSignUpW)
}
function availableWalkers(){
    userView = "availableWalkers"
    NavigateTo(userView,initavialbleWalkers)
}
function walkerHirings(){
    userView = "walkerHirings";
    NavigateTo(userView,initWalkerHirings);
}
function clientHiringSend(){
    userView = "clientHiringSend";
    NavigateTo(userView,initSendHiring)
}