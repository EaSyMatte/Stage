var vetEmail = ["matteo@gmail.com"];
var vetPass = ["Password"];
var vetServizi = ["Pulizie vetri condominio", "Pulizie scale condominio", "Pulizie interni condominio", "Pulizie complete condominio"];
var servizioScelto = [];
var email="";
var pass="";

//var listino;

/*function btnCarica() {
    $.ajax({
        url: 'https://raw.githubusercontent.com/EaSyMatte/Stage/main/EmailPassword.json',
        success: function(data) {
            btnLogin(data);
        }
    });
}*/

function openPage(pageName,elmnt,color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

function btnLogin(){
    $.ajax({
        url: 'https://raw.githubusercontent.com/EaSyMatte/Stage/main/EmailPassword.json',
        success: function(data) {
            var listino = JSON.parse(data);
        }
    });
    let t="";
    t+="<tr><td>"+"<label>Email:</label> "+"</td>";
    t+="<td>"+"<input type='text' id='txtEmail'>"+"</td></tr>";
    t+="<tr><td>"+"<label>Password:</label> "+"<td>";
    t+="<td>"+"<input type='text' id='txtPass'>"+"</td></tr>";

    t+="<tr><td>"+"<button onclick='btnAccedi()'>ACCEDI"+"</td>";
    t+="<td>"+"<button onclick='btnRegistrati()'>REGISTRATI"+"</td></tr>";

    document.getElementById("tableLogin").innerHTML = t;
}

function btnAccedi(){

    email = document.getElementById("txtEmail").value;
    pass = document.getElementById("txtPass").value;
    let sentEmail = false;
    let sentPass = false;

    for(let i=0; i<vetEmail.length; i++){
        if(vetEmail[i] == email){
           sentEmail = true;
        }
    }
    for(let i=0; i<vetPass.length; i++){    
        if(vetPass[i] == pass){
            sentPass = true;
        }
    }
    if(sentEmail == false)
        window.alert("Email sbagliata");
    else if(sentPass == false)
        window.alert("Password sbagliata");
    else 
        window.alert("Accesso completato con successo");

    openPage("Home", this, "green");

}

function btnRegistrati(){
    let mail = document.getElementById("txtEmail").value;
    let pas = document.getElementById("txtPass").value;
    
    let i = vetEmail.length;
    vetEmail[i] = mail;
    vetPass[i] = pas;
}

function btnOrdine(i){
    /*servizioScelto[0] = vetServizi[i];
    servizioScelto[1] = document.getElementById("btnOrdine("+i+")").value;
    window.alert("Hai scelto" + vetServizi[i]);*/
    window.alert("Hai scelto" + i.value);
}

function btnConferma(){
    let superficie="";
    let preventivi="";
    let citta = document.getElementById("txtCitta").value;

    if(document.getElementById("rd25").checked == true)
        superficie = document.getElementById("rd25").value;
    else if(document.getElementById("rd50").checked == true)
        superficie = document.getElementById("rd50").value;
    else if(document.getElementById("rd75").checked == true)
        superficie = document.getElementById("rd75").value;
    else 
        superficie = document.getElementById("rd100").value;

    if(document.getElementById("rdSi").checked == true)
        preventivi = document.getElementById("rdSi").value;
    else
        preventivi = document.getElementById("rdNo").value;

    let tot = servizioScelto[1] * superficie;

    creaPreventivo(tot, superficie, preventivi, citta);
    openPage("Preventivo", this, "green");
}

function btnAnnulla(){
    valueOrdine = 0;
    document.getElementById("txtCitta").value = "";
    document.getElementById("rd25").checked = false;
    document.getElementById("rd50").checked = false;
    document.getElementById("rd75").checked = false;
    document.getElementById("rd100").checked = false;
    document.getElementById("rdSi").checked = false;
    document.getElementById("rdNo").checked = false;
    servizioScelto = [];
}

function creaPreventivo(tot, superficie, preventivi, citta){
    let s="";
    let nome="";
    let i=0;
    while(email[i] != '@'){
        nome += email[i];
        i++;
    }
    s+= email + "\n";
    s+= "Preventivo per: " + nome + "\n";
    s+= "Servizio scelto: " + servizioScelto[0] + ", costo per mq: " + servizioScelto[1] + "\n";
    s+= "Importo totale: " + tot;

    document.getElementById("txtPreventivo").value = s;
}