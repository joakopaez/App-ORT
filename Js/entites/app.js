class App {
    #arrClient;
    #arrWalker;
    #arrHiring;
    #currentUser;
    constructor(){
        this.#arrClient = [];
        this.#arrWalker = [];
        this.#arrHiring = [];
        this.#currentUser = null;
        this.preLoadData();
    }

    preLoadData(){
        // preload de clientes + perro 
        this.#arrClient.push(new Client("Marcos","Padilla","MarcosPad","Marcos123",new Dog("Firulais", 1)));
        this.#arrClient.push(new Client("Pablo","Lampone","BasiliodosSantos","Lampo01",new Dog("Betún", 4)));
        this.#arrClient.push(new Client("Emilio","Ravenna","MaxCozzetti","Cozzeti75",new Dog("Milú",2)));
        this.#arrClient.push(new Client("Gabriel","Medina","Dupont","Jaques89",new Dog("Manchita", 1)));
        this.#arrClient.push(new Client("Mario","Santos","AguirreFran","Fuegotiene?47",new Dog("Lassie", 4)));
        this.#arrClient.push(new Client("Marcos","Molero","AleAwada","Detecti3",new Dog("Ayudante de Santa", 4)));
        this.#arrClient.push(new Client("Franco","Milazzo","VianoCes","Vyfuerza77",new Dog("Maylo", 1)));
        this.#arrClient.push(new Client("Arturo","Gaona","Elasisitente","Ricci3",new Dog("Rin Tin Tin", 4)));
        this.#arrClient.push(new Client("José","Fehler","D'Elía","Guante1",new Dog("Hachiko", 2)));
        this.#arrClient.push(new Client("Lucio","Bonelli","Suerda","TortugaMaritima8",new Dog("Bolt", 1)));
        this.#arrClient.push(new Client("Martín","Vanegas","Laguzzi","LocoLope",new Dog("Beethoven",4)));
        this.#arrClient.push(new Client("Pedro","Velaso","Vaquero","Piquito5",new Dog("Pancho", 1)));
        this.#arrClient.push(new Client("Rubén","Bértora","BalSan","Srconductor1",new Dog("Brian", 2)));
        this.#arrClient.push(new Client("Bernardo","Galvan","Crissi","Margin4l",new Dog("Rex", 4)));
        this.#arrClient.push(new Client("Juan","Dumas","Miserisky","RectoDig5",new Dog("Pluto", 2)));
        this.#arrClient.push(new Client("Melina","Fichelson","Acarddi","Gime49",new Dog("Scooby Doo", 4)));
        this.#arrClient.push(new Client("Beatriz","Ledesma","Eleonora","W3exler",new Dog("Toto", 1)));
        this.#arrClient.push(new Client("José","Zarazola","BoyOlm","DrO1mi",new Dog("Balto", 2)));
        this.#arrClient.push(new Client("Roberto","Ávalos","Coria","Martin548C",new Dog("Laika", 2)));
        this.#arrClient.push(new Client("Damián","Szifron","Zorro","Simu1ador",new Dog("Smoky", 2)));

        //preload contrataciones
        this.#arrHiring.push(new Hiring(this.#arrClient[0],"Canceled"));
        this.#arrHiring.push(new Hiring(this.#arrClient[4],"Pending"));
        this.#arrHiring.push(new Hiring(this.#arrClient[7],"Pending"));
        this.#arrHiring.push(new Hiring(this.#arrClient[19],"Pending")); 
        this.#arrHiring.push(new Hiring(this.#arrClient[5],"Pending"));
        this.#arrHiring.push(new Hiring(this.#arrClient[14],"Pending"));
        this.#arrHiring.push(new Hiring(this.#arrClient[8],"Accepted"));
        this.#arrHiring.push(new Hiring(this.#arrClient[6],"Accepted"));
        this.#arrHiring.push(new Hiring(this.#arrClient[10],"Pending"));
        this.#arrHiring.push(new Hiring(this.#arrClient[18],"Pending"));

        // preload paseadores    
        this.#arrWalker.push(new DogWalker("Matthew","Murdock","DareD","NotFear",[this.#arrHiring[9]],"13", "13"));
        this.#arrWalker.push(new DogWalker("Carl","Lucas","Luke","PowerMan",[this.#arrHiring[1],this.#arrHiring[8],this.#arrHiring[6]],"19", "19"));
        this.#arrWalker.push(new DogWalker("Daniel","Rand","IronFi","KunLun",[this.#arrHiring[2],this.#arrHiring[3],this.#arrHiring[4]],"7", "7"));
        this.#arrWalker.push(new DogWalker("Jessica","Jones","Jewels","Purple",[this.#arrHiring[5],this.#arrHiring[7]],"12","12"));
        this.#arrWalker.push(new DogWalker("Mercedes","Knight","Misty","Detect",[],"16", "16"));
    }

    changeCurrentUser(x){
        this.#currentUser = x
    }
    getArrHiring(){
        return this.#arrHiring;
    }
    getCurrentUser(){
        return this.#currentUser;
    }
    getHirings(){
        return this.#currentUser.hiring;
    }
    getWalkerHirings(){
        return this.#arrWalker.hiring;
    }
    getArrClient(){
        return this.#arrClient;
    }
    getArrWalker(){
        return this.#arrWalker;
    }
    pushClient(name, lastName, userName, password, dogName, dogSize){
        const signedDog = new Dog(dogName, dogSize);
        const signedClient = new Client(name, lastName, userName, password, signedDog);
        this.#arrClient.push(signedClient)
        return signedClient
    }
    pushWalker(name, lastName, userName, password, slot, totalSlot){
        const signedWalker = new DogWalker(name, lastName, userName, password, [], slot, totalSlot);
        this.#arrWalker.push(signedWalker)
        return signedWalker
    }
    getDogSize(){
        return this.#currentUser.dog.size
    }
    pushNewHiring(currentClien){
        const pushedHiring = new Hiring(currentClien, "Pending")
        this.#arrHiring.push(pushedHiring)
    }

    addHiringToWalker(currentClient, walkerId){
        this.getArrWalker().forEach(walker =>{
        if(walkerId == walker.id){
            walker.hiring.push(new Hiring(currentClient, "Pending"))  
        }
    })  
    }
}

