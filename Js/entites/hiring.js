let hiringId = 0;
class Hiring{
    constructor(client,status){
        this.client = client;
        this.id = hiringId;
        this.status = status;
        hiringId++
    }

    
}
    function addHiring(newHiring){
        app.getHiri().push(new Hiring(newHiring.client, newHiring.status))
}