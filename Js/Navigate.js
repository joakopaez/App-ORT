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