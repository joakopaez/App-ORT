let walkerId = 0;
class DogWalker{
    constructor(name,lastName,userName,password,hiring,slot,totalSlot){
        this.name = name;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.id = walkerId;
        this.hiring = hiring;
        this.slot = slot;
        this.totalSlot = totalSlot;
        walkerId ++;
    }

}


