//Variable declarations
import {API_KEY} from "../config.js";
const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const textBox = document.getElementById("textBox");
const weatherOutput = document.getElementById("weatherOutput");
const highLow = document.getElementById("highLow");
const bodyE = document.getElementById("b1");
const moon = document.getElementById("moon");
const weatherButton = document.getElementById("weatherBtn");
const credit = document.getElementById("credit");
const celsiusOutput = document.getElementById("celsiusOutput");
let newCelArray;


//Event Listeners
document.addEventListener("DOMContentLoaded",() => {
    moon.addEventListener("click", darkMode);
    celsiusOutput.addEventListener("mouseleave", removeCelTemp);
    celsiusOutput.addEventListener("mouseenter",celInput);
    weatherButton.addEventListener("click",getWeatherF);
    credit.addEventListener("click", creditAlert);  
});

//Functions 
let roundNumber = (value) => Math.round(value);

let removeCelTemp = () => celsiusOutput.innerHTML = "";

let darkMode = () => { bodyE.classList.toggle("darkmode"); weatherButton.classList.toggle("darkmode"); credit.classList.toggle("darkmode") ;};

let creditAlert = () => alert("The Boring Temperature App by Bobby De Luna using the           Open Weather Map API");

let convert = (value) => Math.round((value - 32) * 5/9);

function getWeatherF(){
    
    let city = textBox.value;

        fetch(apiURL + city + API_KEY)
        .then(res => res.json())
        .then(data => { weatherOutput.innerHTML = "It is currently " + Math.round(data.main.temp)+"°F "+"in "+city;
            let weatherArray = Object.values(data.main);
            weatherArray = weatherArray.slice(2,4);
            let newWeatherArray = weatherArray.map(roundNumber);
            highLow.innerHTML = "The high today in "+city+" is "+newWeatherArray[0]+"°F, and the low today is "+newWeatherArray[1]+"°F.";
            newCelArray = newWeatherArray;
            newCelArray = newCelArray.map(convert)})

        .catch(() => alert("For some reason, this didn't work. Please try again later."));
};

function celInput(){
    try {celsiusOutput.innerHTML = "The high is "+newCelArray[0]+"°C and the low is "+newCelArray[1]+"°C.";
}
    catch{alert("For some reason, this didn't work. Please try again later.")}
};