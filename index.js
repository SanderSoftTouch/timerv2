//console.log(msg)
var timer = document.getElementById("timer");
var timerOn;

window.onload = function(e){
    timer.innerText = '00:00:00'
    fetch('/test')
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
    console.log("test", button.innerHTML)
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
            if(teller > 600){
                timer.style.color = "orange"
            } if(teller > 900){
                timer.style.color = "red"
            }
        }, 1000);
    } else {
        button.innerHTML = "BON"
        button.style.backgroundColor = "#cccccc"
        button.style.borderColor = "#1bbacf"
        button.style.color = "#1bbacf"
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
    timer.innerText = '00:00:00'
    timer.style.color = "#1bbacf"
    var saveStatus = document.getElementById("saveStatus");
    saveStatus.innerHTML = "Timer has been reset!!";
    saveStatus.style.color = "#1bbacf";
    saveStatus.hidden = false;
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
    const data = {
        created_at: new Date(),
        product_name: "Titielover deluxe"
    };
      
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

