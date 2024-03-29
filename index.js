//import { PostData } from "./server.js";

//console.log(msg)
var timer = document.getElementById("timer");
var bonner = document.getElementById("bonner");
var timerOn;
var timeStatus = "100"
// status 000 = STOP BON press
// Status 100 = 0 Minuten
// Status 200 = >0 Minuten
// Status 300 = >10 Minuten
// Status 400 = >15 Minuten
var werknemers = ["Gianni", "Louis", "Thibeus", "Ruben", "Sander"]

document.addEventListener('DOMContentLoaded', function () {
    timer.innerText = '00:00:00';
    darkMode();
    //const localSaveTimer = localStorage.getItem('switchSetting');
    const localSaveDarkMode = localStorage.getItem('DarkModeSwitch');
    const switchElement = document.getElementById('darkModeSwitch');
    var userList = document.getElementById("userList");
    userList.style.display = "none"

    if (localSaveDarkMode) {
        switchElement.checked = localSaveDarkMode === 'true';
    }

    // Add event listener for the switch change
    switchElement.addEventListener('change', function () {
        localStorage.setItem('DarkModeSwitch', switchElement.checked);
    });
});

async function getData() {
    const response = await fetch('http://localhost:3000/data');
    const data = await response.json();
    console.log('Data:', data);
    return data
}
  
async function updateData() {
    var oldData = await getData()
    var newData = {
        "id": 3,
        "name": "Jane Doe",
        "age": 30
    }
    var updatedData = oldData.push(newData)
    console.log(oldData, newData, updatedData)
    const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(oldData),
    });
  console.log(await response.text());
}

/*function getSwitchID(){
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
    
}*/

function vergeetFunctie(){
    var vergeet = document.getElementById("vergeet");
    if(vergeet.hidden){
        vergeet.hidden = false
    } else {
        vergeet.hidden = true
    }
}

function showUserList(){
    var userList = document.getElementById("userList");
    if(userList.style.display == "none"){
        console.log("userList > visible");
        userList.style.display = "flex"
    } else {
        console.log("userList > hidden");
        userList.style.display = "none"
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
        hiddenElement.style.color = "#dbdbdb";
        document.getElementById('darkModeText2').hidden = true
        if(buttonBon.innerHTML == "BON"){
            buttonBon.style.backgroundColor = "#cccccc";
        }
        else{
            buttonBon.style.backgroundColor = "red";
        }
    }
    else{
        //document.getElementById('darkModeText2').style.color = "black"
        body.style.backgroundColor = "black";
        mainContainer.style.backgroundColor = "black";
        buttonSave.style.backgroundColor = "black";
        hiddenElement.style.color = "black";
        document.getElementById('darkModeText2').hidden = false
        document.getElementById('darkModeSwitchConctainer').hidden = true
        if(buttonBon.innerHTML == "BON"){
            buttonBon.style.backgroundColor = "black";
        }
        else{
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

// Fetch the user.json file
//fetchJSON('user.json')
//fetchJSON('log.json')

/*function fetchJSON(naam){ //'user.json'
    fetch(naam)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${naam}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(naam, 'data:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function postJSON(){
    fetch('/run-script', { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to run server script');
        }
        console.log('Server script executed successfully');
      })
      .catch(error => {
        console.error('Error running server script:', error);
      });   
}

async function testJson(){
    await fetch('/execute');    
}*/

/* function testPOST(){
    var url = 'https://script.google.com/macros/s/AKfycbyHGV1vSmR7z036i_R4-6w6kJpiqnhchbToAO9ChdX4MVfTIOyNX6NHN3Q3iJ0ujKjd/exec'
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          field1: 'Value 1',
          field2: 'Value 2'
        })
      })
      .then(response => {
        if (response.ok) {
          console.log('Data added to spreadsheet.');
        } else {
          console.error('Failed to add data to spreadsheet.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyHGV1vSmR7z036i_R4-6w6kJpiqnhchbToAO9ChdX4MVfTIOyNX6NHN3Q3iJ0ujKjd/exec');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
    if (xhr.status == 200) {
        console.log('Request successful');
    } else {
        console.error('Request failed');
    }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send(JSON.stringify({
        field1: 'Value 1',
        field2: 'Value 2'
    }));
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyHGV1vSmR7z036i_R4-6w6kJpiqnhchbToAO9ChdX4MVfTIOyNX6NHN3Q3iJ0ujKjd/exec');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); // Add this line
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Add this line
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add this line
    xhr.onload = function() {
      if (xhr.status == 200) {
        console.log('Request successful');
      } else {
        console.error('Request failed');
      }
    };
    xhr.onerror = function() {
      console.error('Request failed');
    };
    xhr.send(JSON.stringify({
      field1: 'Value 1',
      field2: 'Value 2'
    }));
} */

  