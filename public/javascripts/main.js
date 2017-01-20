const OWMAPIKEY = "bbc67f01cffb0e40951dbab4a4e69a87";
const OWMPRE = "http://api.openweathermap.org/data/2.5/weather?q=Portsmouth";
const OWMPOST = ",uk&appid=" + OWMAPIKEY;
const PortsInfo = OWMPRE + "Portsmouth" + OWMPOST;
const portsWeather = "http://api.openweathermap.org/data/2.5/forecast/city?id=2639996&APPID=bbc67f01cffb0e40951dbab4a4e69a87";
var weatherItems = [];

$(document).ready(function() {
  getWeather();
//  getEvents(5);
  console.log(weatherItems);
});

function getWeather(days=5) {
  $.getJSON(portsWeather, function(data) {
    if (data.cod != 200) {
      console.error("owm fucked again");
      console.error(data);
      putErrorInCard();
    } else {
      let nextDays = data.list;
      for (let i=0;i<days;i++) {
        weatherItems.push(nextDays[i]);
      }
      putWeatherInCard();
    }
  });
}
function putWeatherInCard() {
  const weatherArea = document.getElementById("weather-content");
  const weatherText = document.getElementById("weather-text");
  const todayWeather = weatherItems[0];
  const weatherDesc = todayWeather.weather.main;
  const curTemp = kelvinToCelsius(todayWeather.main.temp);
  const minTemp = kelvinToCelsius(todayWeather.main.temp_min);
  const maxTemp = kelvinToCelsius(todayWeather.main.temp_max);
  var weatherAnnonce = "Current Temp: "+ curTemp+" with lows of "+minTemp+" and highs of "+maxTemp;
  var tempPara = document.createElement('p');
  var descPara = document.createElement('p');
  tempPara.textContent = weatherAnnonce;
  weatherArea.appendChild(tempPara);
}

function kelvinToCelsius(tempK) {
  return parseInt(tempK) - 273.15;
}

function kelvinToFareneit(tempK) {
  return parseInt(tempK) * (9/5) - 459.67;
}

function putErrorInCard() {
  document.getElementById("weather-text").textContent = "owm fucked again";
}

function getEvents(nextDays) {
  const calURL = "https://www.googleapis.com/calendar/v3/calendars/89d61hh5bupr6o5kcdu677ja24fonsf6@import.calendar.google.com/events";
  $.get(calURL, function(data) {
    console.log(data);
  });
}
