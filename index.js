//console.log(msg)
var timer = document.getElementById("timer");
var bonner = document.getElementById("bonner");
var timerOn;
var timeStatus = "100"
var werknemers = ["Gianni", "Louis", "Thibeus", "Ruben", "Sander"]
// status 000 = STOP BON press
// Status 100 = 0 Minuten
// Status 200 = >0 Minuten
// Status 300 = >10 Minuten
// Status 400 = >15 Minuten

document.addEventListener('DOMContentLoaded', function () {
    //const localSaveTimer = localStorage.getItem('switchSetting');
    const localSaveDarkMode = localStorage.getItem('DarkModeSwitch');
    const switchElement = document.getElementById('darkModeSwitch');

    if (localSaveDarkMode) {
        switchElement.checked = localSaveDarkMode === 'true';
    }

    // Add event listener for the switch change
    switchElement.addEventListener('change', function () {
        localStorage.setItem('DarkModeSwitch', switchElement.checked);
    });
});

window.onload = function(e){
    timer.innerText = '00:00:00';
    darkMode();
    fetch('localhost3000/test')
        .then(response => response.json())
        .then(data => {
            // Handle the data received from the server
            console.log(data); // Example: log the data to the console
            // Perform any further processing or manipulation of the data here
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getSwitchID(){
    //alert("Hello, " + userInput + "! Welcome to our website.");
    fetch('/getUser')
        .then(response => response.json())
        .then(data => {
            // Handle the data received from the server
            console.log(data); // Example: log the data to the console
            // Perform any further processing or manipulation of the data here
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    
}

function vergeetFunctie(){
    var vergeet = document.getElementById("vergeet");
    if(vergeet.hidden){
        vergeet.hidden = false
    } else {
        vergeet.hidden = true
    }
}

function knopklik(button){
    //console.log("test", button.innerHTML)
    if(button.innerHTML == "BON"){
        button.innerHTML = "STOP BON"
        button.style.backgroundColor = "Red"
        button.style.color = "white"
        button.style.borderColor = "White"
        var teller = tellerConverter(timer.innerText);

        var saveStatus = document.getElementById("saveStatus");
        saveStatus.hidden = true;

        timerOn = setInterval(function(){ //start_timer
            teller ++;
            //console.log(teller);
            //window[`teller_${knop.parentElement.id.charAt(knop.parentElement.id.length - 1)}`] = teller;
            timer.innerText = tijdConverter(teller)
            timeStatus = "200";
            statusUpdate(timeStatus);
            if(teller > 600){
                timer.style.color = "orange";
                timeStatus = "300";
                statusUpdate(timeStatus);
            } if(teller > 900){
                timer.style.color = "red";
                document.getElementById('timer').classList.add('flash-text');
                timeStatus = "400";
                statusUpdate(timeStatus);
            }
        }, 1000);
    } else {
        if(body.style.backgroundColor != "black"){
            button.style.backgroundColor = "#cccccc"
        }else{
            button.style.backgroundColor = "black"
        }
        button.style.borderColor = "#1bbacf"
        button.style.color = "#1bbacf"
        button.innerHTML = "BON"
        timeStatus = "000";
        statusUpdate(timeStatus);
        clearInterval(timerOn) //stop_timer
    }
}

function tijdConverter(nummer){
    var uur = Math.floor(nummer / 3600);
    var min = Math.floor(nummer / 60) - uur*60;
    var sec = nummer%60
    //console.log(sec, sec < 10, (sec < 10 ? "0" : ""))
    return `${(uur < 10 ? "0" : "")}${uur}:${(min < 10 ? "0" : "")}${min}:${(sec < 10 ? "0" : "")}${sec}`
}

function tellerConverter(tijd){
    const tijdteller = tijd.split(":")
    var uur = parseInt(tijdteller[0])*3600
    var min = parseInt(tijdteller[1])*60
    var sec = parseInt(tijdteller[2])
    return uur + min + sec
}

function resetClick(){
    var saveStatus = document.getElementById("saveStatus");

    if(buttonBon.innerHTML == "STOP BON"){
        saveStatus.innerHTML = "The time is running, don't try to reset it";
        saveStatus.style.color = "red";
        saveStatus.hidden = false;
    }
    else{
        if(timer.innerText == '00:00:00'){
            saveStatus.innerHTML = "The timer is already 0";
            saveStatus.style.color = "#1bbacf";
            saveStatus.hidden = false;
        }else {
            timer.innerText = '00:00:00';
            timer.style.color = "#1bbacf";
            saveStatus.innerHTML = "Timer has been reset!!";
            saveStatus.style.color = "#1bbacf";
            saveStatus.hidden = false;
        }
        timeStatus = "100";
        statusUpdate(timeStatus);
        document.getElementById('timer').classList.remove('flash-text');
    }

    setTimeout(function() {
        saveStatus.hidden = true; // Show the status after resetting
    }, 30000); // 30sec timeout
    
}

function secret(){
    document.getElementById('darkModeSwitchConctainer').hidden = false
}


function statusUpdate(timeStatus){
    var status = document.getElementById("status");
    //console.log(timeStatus);
    if(timeStatus == "000"){
        status.innerHTML = "HE IS BACK.... FINALLY"
        status.style.color = "#1bbacf"
        status.hidden = false;
    }
    if(timeStatus == "100"){
        status.hidden = true;
    }
    if(timeStatus == "200"){
        status.innerHTML = "SHITTING IN PROGRESSS..."
        status.style.color = "#1bbacf"
        status.hidden = false;
    }
    if(timeStatus == "300"){
        status.innerHTML = "DAMM YOU SHITTING A LOT";
        status.style.color = "orange"
        status.hidden = false;
    }
    if(timeStatus == "400"){
        status.innerHTML = "STOP SHITTINGG GODDAMMIT"
        status.style.color = "red"
        status.hidden = false;
    }
}

function darkMode(){
    var checkbox = document.getElementById('darkModeSwitch');
    if(checkbox.checked){
        body.style.backgroundColor = "#dbdbdb";
        mainContainer.style.backgroundColor = "#dbdbdb";
        buttonSave.style.backgroundColor = "#cccccc";
        document.getElementById('darkModeText2').hidden = true
        if(buttonBon.innerHTML == "BON"){
            buttonBon.style.backgroundColor = "#cccccc";
        }
        else{
            buttonBon.style.backgroundColor = "red";
        }
    }
    else{
        body.style.backgroundColor = "black";
        mainContainer.style.backgroundColor = "black";
        buttonSave.style.backgroundColor = "black";
        document.getElementById('darkModeText2').hidden = false
        document.getElementById('darkModeSwitchConctainer').hidden = true
        if(buttonBon.innerHTML == "BON"){
            console.log("Bon-> Zwart");
            buttonBon.style.backgroundColor = "black";
        }
        else{
            console.log("StopBon-> Rood");
            buttonBon.style.backgroundColor = "red";
        }
    }
}

function slaOp(knop){
    (knop.previousElementSibling.innerText == "Stop" ? toggleButton(knop.previousElementSibling) : null)
    var resultaat = window[`teller_${knop.parentElement.id.charAt(knop.parentElement.id.length - 1)}`]
    window[`teller_${knop.parentElement.id.charAt(knop.parentElement.id.length - 1)}`] = 0
    knop.previousElementSibling.previousElementSibling.innerText = '00:00:00'
    knop.nextElementSibling.childNodes[1].innerText = tijdConverter(tellerConverter(knop.nextElementSibling.childNodes[1].innerText) + resultaat);
    //console.log(resultaat, dagtotaal, knop.nextElementSibling.childNodes[1], tellerConverter("01:01:01"), knop.previousElementSibling)
}

/*function text(url) {
    return fetch(url).then(res => res.text());
}
  
var ip_res;
text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
    let ip = data.match(ipRegex)[0];
    console.log(ip);
    ip_res = ip;
});*/

function insertInto(){
    console.log(bonner.value, timer.innerText, tellerConverter(timer.innerText), ip_res);
    /*const data = {
        SwitchID, 
        BonTijd, 
        Logger
        created_at: new Date(),
        product_name: "Titielover deluxe"
    };*/
      
    // Configure the fetch request
    fetch('/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Failed to insert data');
          
        }
        console.log('Data inserted successfully');
        var saveStatus = document.getElementById("saveStatus");
        saveStatus.innerHTML = "Shit timer saved succesfully"
        saveStatus.style.color = "green"
        saveStatus.hidden = false
    })
    .catch(error => {
        console.error('Error inserting data:', error);
        var saveStatus = document.getElementById("saveStatus");
        saveStatus.innerHTML = "Error saving this piece of shit";
        saveStatus.style.color = "red";
        saveStatus.hidden = false;
    });
    
}

function userMaker(){
    const localSaveUserID = localStorage.getItem('UserID');
    if (localSaveUserID == null){
        console.log("test")
        var userInput = prompt("Geef username wollach:");
        if (userInput == null) {
            alert("Geef toch maar een username");
            var userInput = prompt("Geef username wollach:");
        } else {
            getSwitchID(userInput)
        }
    }

}
