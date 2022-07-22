interface ISmartphone {
    credito: number; 
    numeroChiamate: number; 
  }

  abstract class Persona {
    protected _nome: string;
    protected _cognome: string;
    constructor(nome: string, cognome: string) {
        this._nome = nome;
        this._cognome = cognome;
    }
  }

  class User extends Persona implements ISmartphone {
    id: number;
    credito: number;
    numeroChiamate: number;
    constructor(id: number, _nome: string, _cognome: string, credito: number, numeroChiamate: number) {
        super(_nome, _cognome);
        this.id = id;
        this.credito = credito;
        this.numeroChiamate = numeroChiamate;
    }
    public ricarica(valoreRicarica: number): void {
        this.credito += valoreRicarica;
    }
    public chiamata(minDurata: number): void {
        this.numeroChiamate += 1;
        this.credito = +Number.parseFloat(this.credito - (0.22 + 0.24 * minDurata) + "").toFixed(2);
    }
    public t404(): number {
        return this.credito;
    }
    public getNumeroChiamate(): number {
        return this.numeroChiamate;
    }
    public azzeraChiamte(): void {
        this.numeroChiamate = 0;
    }
    get nome(): string {
        return this._nome;
    }
    get cognome(): string {
        return this._cognome;
    }
  }

  let user1 = new User(0, "Luca", "Quadrati", 10, 0);
  let user2 = new User(1, "Paolo", "Tondi", 20, 3);
  let user3 = new User(2, "Pino", "Rombi", 15, 2);
  
 
  let arr: User[] = [user1, user2, user3];
  let selectedUser: User;
  let durata: number;
  let interval: number;
  let tester = <HTMLDivElement>document.querySelector("#tester");
  let display = <HTMLSpanElement>document.querySelector("#display");
  let closeCall = <HTMLDivElement>document.querySelector("#closeCall");
  let userSelector = <HTMLSelectElement>document.querySelector("#userSelector");
 
  userSelector.addEventListener("change", selectUser);
  document.querySelector("#btn1")?.addEventListener("click", carica);
  document.querySelector("#btn2")?.addEventListener("click", numeroChiamate);
  document.querySelector("#btn3")?.addEventListener("click", ricarica1);
  document.querySelector("#btn4")?.addEventListener("click", ricarica2);
  document.querySelector("#btn5")?.addEventListener("click", ricarica3);
  document.querySelector("#btn6")?.addEventListener("click", ricarica4);
  document.querySelector("#btn7")?.addEventListener("click", azzeramentoCalls);
  document.querySelector("#btn8")?.addEventListener("click", telefonata);
  document.querySelector("#newUser")?.addEventListener("click", aggiungiUtente);
  document.querySelector("#callBtn")?.addEventListener("click", stopTelefonata);
  
  
  for (let i = 0; i < arr.length; i++) {
   
    let id: number = arr[i].id;
    let name: string = arr[i].nome;
    let surname: string = arr[i].cognome;
    let credit: number = arr[i].credito;
    let call: number = arr[i].numeroChiamate;
   
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${id}</td>
                        <td>${name}</td>
                        <td>${surname}</td>
                        <td id="credito${id}">${credit}&euro;</td>
                        <td id="call${id}">${call}</td>`;
    document.querySelector("#tb")?.appendChild(newRow);
    
    let newOption = document.createElement("option");
    newOption.value = id + "";
    newOption.innerText = id + " " + name + " " + surname;
    userSelector.appendChild(newOption);
  }
  
  
  function aggiungiUtente(): void {
   
    let input1 = <HTMLInputElement>document.querySelector("#name");
    let input2 = <HTMLInputElement>document.querySelector("#surname");
    let input3 = <HTMLInputElement>document.querySelector("#credit");
   
    let id: number = arr.length;
    let name: string = input1.value.trim();
    let surname: string = input2.value.trim();
    let credit: number = Number(input3.value);
   
    if (name == "" || surname == "") {
        return alert("Scrivi nome e cognome per aggiungere un nuovo clienete");
    } else {
        arr.push(new User(id, name, surname, credit, 0));
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${id}</td>
                            <td>${name}</td>
                            <td>${surname}</td>
                            <td id="credito${id}">${credit}&euro;</td>
                            <td id="call${id}">0</td>`;
        document.querySelector("#tb")?.appendChild(newRow);
        let newOption = document.createElement("option");
        newOption.value = id + "";
        newOption.innerText = id + " " + name + " " + surname;
        userSelector.appendChild(newOption);
    }
  }
  
  function selectUser() {
    if (userSelector.value === "null") {
        display.innerText = "Seleziona un utente";
    } else {
        let sel = Number(userSelector.value);
        selectedUser = arr[sel];
        display.innerText = selectedUser.nome;
    }
  }
  

  function carica() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
        display.innerText = "Credito attuale: " + selectedUser.t404() + "€";
    }
  }
  
  function ricarica1() {
    ricarica(5);
  }
  function ricarica2() {
    ricarica(15);
  }
  function ricarica3() {
    ricarica(25);
  }
  function ricarica4() {
    ricarica(50);
  }
  function ricarica(val: number) {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
        selectedUser.ricarica(val);
        let aggiornaCredito = <HTMLInputElement>document.querySelector("#credito" + selectedUser.id);
        aggiornaCredito.innerText = selectedUser.credito + "€";
        display.innerText = "Ricarica effettuata";
    }
  }
  

  function numeroChiamate() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
        display.innerText = "N. chiamate: " + selectedUser.getNumeroChiamate();
    }
  }
  function azzeramentoCalls() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
        selectedUser.azzeraChiamte();
        let aggiornaChiamate = <HTMLInputElement>document.querySelector("#call" + selectedUser.id);
        aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
        display.innerText = "Chiamate azzerate";
    }
  }
  

  function telefonata() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else if (selectedUser.credito < 0.25) {
        display.innerText = "Credito insufficente";
    } else {
        startTelefonata();
    }
  }
  
  function startTelefonata() {
    let creditCounter: number = selectedUser.credito - 0.22;
    let s = 0,
        m = 0;
    tester.style.display = "none";
    closeCall.style.display = "flex";
    userSelector.disabled = true;
    interval = setInterval(function () {
        display.innerText = m + ":" + s;
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        durata = m + s / 60;
        creditCounter -= 0.004;
        let aggiornaCredito = <HTMLInputElement>document.querySelector("#credito" + selectedUser.id + "");
        aggiornaCredito.innerText = creditCounter.toFixed(2) + "€";
        if (creditCounter <= 0.01) {
            stopTelefonata();
            display.innerText = "Credito esaurito";
        }
    }, 1000);
  }
  
  function stopTelefonata() {
    tester.style.display = "flex";
    closeCall.style.display = "none";
    userSelector.disabled = false;
    display.innerText = "Chiamata terminata";
    clearInterval(interval);
    selectedUser.chiamata(durata);
    let aggiornaCredito = <HTMLInputElement>document.querySelector("#credito" + selectedUser.id);
    aggiornaCredito.innerText = selectedUser.credito + "€";
    let aggiornaChiamate = <HTMLInputElement>document.querySelector("#call" + selectedUser.id);
    aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
  }