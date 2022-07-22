var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
var Persona = /** @class */ (function () {
    function Persona(nome, cognome) {
        this._nome = nome;
        this._cognome = cognome;
    }
    return Persona;
}());
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(id, _nome, _cognome, credito, numeroChiamate) {
        var _this = _super.call(this, _nome, _cognome) || this;
        _this.id = id;
        _this.credito = credito;
        _this.numeroChiamate = numeroChiamate;
        return _this;
    }
    User.prototype.ricarica = function (valoreRicarica) {
        this.credito += valoreRicarica;
    };
    User.prototype.chiamata = function (minDurata) {
        this.numeroChiamate += 1;
        this.credito = +Number.parseFloat(this.credito - (0.22 + 0.24 * minDurata) + "").toFixed(2);
    };
    User.prototype.t404 = function () {
        return this.credito;
    };
    User.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    User.prototype.azzeraChiamte = function () {
        this.numeroChiamate = 0;
    };
    Object.defineProperty(User.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "cognome", {
        get: function () {
            return this._cognome;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}(Persona));
var user1 = new User(0, "Luca", "Quadrati", 10, 0);
var user2 = new User(1, "Paolo", "Tondi", 20, 3);
var user3 = new User(2, "Pino", "Rombi", 15, 2);
var arr = [user1, user2, user3];
var selectedUser;
var durata;
var interval;
var tester = document.querySelector("#tester");
var display = document.querySelector("#display");
var closeCall = document.querySelector("#closeCall");
var userSelector = document.querySelector("#userSelector");
userSelector.addEventListener("change", selectUser);
(_a = document.querySelector("#btn1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", carica);
(_b = document.querySelector("#btn2")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", numeroChiamate);
(_c = document.querySelector("#btn3")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", ricarica1);
(_d = document.querySelector("#btn4")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", ricarica2);
(_e = document.querySelector("#btn5")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", ricarica3);
(_f = document.querySelector("#btn6")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", ricarica4);
(_g = document.querySelector("#btn7")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", azzeramentoCalls);
(_h = document.querySelector("#btn8")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", telefonata);
(_j = document.querySelector("#newUser")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", aggiungiUtente);
(_k = document.querySelector("#callBtn")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", stopTelefonata);
for (var i = 0; i < arr.length; i++) {
    var id = arr[i].id;
    var name_1 = arr[i].nome;
    var surname = arr[i].cognome;
    var credit = arr[i].credito;
    var call = arr[i].numeroChiamate;
    var newRow = document.createElement("tr");
    newRow.innerHTML = "<td>".concat(id, "</td>\n                        <td>").concat(name_1, "</td>\n                        <td>").concat(surname, "</td>\n                        <td id=\"credito").concat(id, "\">").concat(credit, "&euro;</td>\n                        <td id=\"call").concat(id, "\">").concat(call, "</td>");
    (_l = document.querySelector("#tb")) === null || _l === void 0 ? void 0 : _l.appendChild(newRow);
    var newOption = document.createElement("option");
    newOption.value = id + "";
    newOption.innerText = id + " " + name_1 + " " + surname;
    userSelector.appendChild(newOption);
}
function aggiungiUtente() {
    var _a;
    var input1 = document.querySelector("#name");
    var input2 = document.querySelector("#surname");
    var input3 = document.querySelector("#credit");
    var id = arr.length;
    var name = input1.value.trim();
    var surname = input2.value.trim();
    var credit = Number(input3.value);
    if (name == "" || surname == "") {
        return alert("Scrivi nome e cognome per aggiungere un nuovo clienete");
    }
    else {
        arr.push(new User(id, name, surname, credit, 0));
        var newRow = document.createElement("tr");
        newRow.innerHTML = "<td>".concat(id, "</td>\n                            <td>").concat(name, "</td>\n                            <td>").concat(surname, "</td>\n                            <td id=\"credito").concat(id, "\">").concat(credit, "&euro;</td>\n                            <td id=\"call").concat(id, "\">0</td>");
        (_a = document.querySelector("#tb")) === null || _a === void 0 ? void 0 : _a.appendChild(newRow);
        var newOption = document.createElement("option");
        newOption.value = id + "";
        newOption.innerText = id + " " + name + " " + surname;
        userSelector.appendChild(newOption);
    }
}
function selectUser() {
    if (userSelector.value === "null") {
        display.innerText = "Seleziona un utente";
    }
    else {
        var sel = Number(userSelector.value);
        selectedUser = arr[sel];
        display.innerText = selectedUser.nome;
    }
}
function carica() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
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
function ricarica(val) {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
        selectedUser.ricarica(val);
        var aggiornaCredito = document.querySelector("#credito" + selectedUser.id);
        aggiornaCredito.innerText = selectedUser.credito + "€";
        display.innerText = "Ricarica effettuata";
    }
}
function numeroChiamate() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
        display.innerText = "N. chiamate: " + selectedUser.getNumeroChiamate();
    }
}
function azzeramentoCalls() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
        selectedUser.azzeraChiamte();
        var aggiornaChiamate = document.querySelector("#call" + selectedUser.id);
        aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
        display.innerText = "Chiamate azzerate";
    }
}
function telefonata() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else if (selectedUser.credito < 0.25) {
        display.innerText = "Credito insufficente";
    }
    else {
        startTelefonata();
    }
}
function startTelefonata() {
    var creditCounter = selectedUser.credito - 0.22;
    var s = 0, m = 0;
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
        var aggiornaCredito = document.querySelector("#credito" + selectedUser.id + "");
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
    var aggiornaCredito = document.querySelector("#credito" + selectedUser.id);
    aggiornaCredito.innerText = selectedUser.credito + "€";
    var aggiornaChiamate = document.querySelector("#call" + selectedUser.id);
    aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
}
