class Dog{
    constructor(name,size){
        this.name = name;
        this.size =size;
    }
}
class Client{
    constructor(name,lastName,userName,password,id,dog){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.id = id;
        this.dog = dog;
    }
}
class DogWalker{
    constructor(name,lastName,userName,password,id,hiring,slot){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.id = id;
        this.hiring = hiring
        this.slot = slot;
    }
}
class Hiring{
    constructor(client,id,status){
        this.client = client;
        this.id = id;
        this.status = status;
    }
}