let clientId = 0;
class Client{
    constructor(name,lastName,userName,password,dog){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.id = clientId;
        this.dog = dog;
        clientId++;
    }

}

function addClient(signedClient){
        app.getArrClient().push(new Client(signedClient.name, signedClient.lastName, signedClient.userName, signedClient.password, signedClient.signedDog))
    }