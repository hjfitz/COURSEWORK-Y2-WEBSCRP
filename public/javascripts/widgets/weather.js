const OWMAPIKEY = "bbc67f01cffb0e40951dbab4a4e69a87";
const OWMPRE = "http://api.openweathermap.org/data/2.5/weather?q=";
var city = "Portsmouth";
const OWMPOST = ",uk&appid=" + OWMAPIKEY;
const owmUrl = OWMPRE + city + OWMPOST;
const portsWeather = "http://api.openweathermap.org/data/2.5/forecast/city?id=2639996&APPID=bbc67f01cffb0e40951dbab4a4e69a87";

var weatherInfo = {};
var coords = []

function getWeather(source="owm") {
  var xhr = new XMLHttpRequest();
  if (source === "owm") {
    console.log("Using OWM!");
    xhr.open('GET', owmUrl, true);
    xhr.onload = function() {
      console.log("working")
      if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        if (data.cod !== 200) {
          getWeather("dsn");
        } else {
          weatherInfo.min      = kelvinToCelsius(data.main.temp_min);
          weatherInfo.max      = kelvinToCelsius(data.main.temp_max);
          weatherInfo.avg      = kelvinToCelsius(data.main.temp);
          weatherInfo.pressure = data.main.pressure;
          weatherInfo.humidity = data.main.humidity;
          weatherInfo.sunrise  = data.sys.sunrise; //parse me!
          weatherInfo.sunset   = data.sys.sunset;
          weatherInfo.desc     = data.weather[0].main;
          putWeatherInCard();
        }
      } else  {
        console.error("Error with owm");
      }
    }
    xhr.send();
  } else if (source === "dsn") {
    console.warn("Falling back to darksky.net");
    navigator.geolocation.getCurrentPosition(function(pos) {
      var dsn = "https://api.darksky.net/forecast/30b70d1026437f163d8e413b72d70d4c/" + pos.coords.latitude.toFixed(4) + "," + pos.coords.longitude.toFixed(4) +"?units=si";
      xhr.open('GET', dsn, true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(weatherInfo);
          data = JSON.parse(xhr.responseText);
          weatherInfo.min      = data.daily.data[0].temperatureMin;
          weatherInfo.max      = data.daily.data[0].temperatureMax;
          weatherInfo.avg      = data.currently.temperature;
          weatherInfo.pressure = data.currently.pressure;
          weatherInfo.humidity = data.currently.humidity;
          weatherInfo.sunrise  = data.daily.data[0].sunriseTime;
          weatherInfo.sunset   = data.daily.data[0].sunsetTime;
          weatherInfo.desc     = data.currently.summary;
          putWeatherInCard();
        }
      }
      xhr.send();
    });
  }
}

function putWeatherInCard() {
  let tempUnit = "°C";
  const weatherArea = document.getElementById("weather-content");
  const weatherText = document.getElementById("weather-text");
  const weatherDesc = weatherInfo.desc;
  const curTemp = weatherInfo.avg + tempUnit;
  const minTemp = weatherInfo.min + tempUnit;
  const maxTemp = weatherInfo.max + tempUnit;
  const weatherAnnonce = "Current Temp: "+curTemp+" with lows of "+minTemp+" and highs of "+maxTemp;
  const curAnnounce = "The sky is " + weatherDesc;
  var tempPara = document.createElement('p');
  var descPara = document.createElement('p');
  tempPara.textContent = weatherAnnonce;
  descPara.textContent = curAnnounce;
  weatherArea.appendChild(tempPara);
  weatherArea.appendChild(descPara);
}


function kelvinToCelsius(tempK) {
  return (parseInt(tempK) - 273.15).toFixed(2);
}

function kelvinToFareneit(tempK) {
  return (parseInt(tempK) * (9/5) - 459.67).toFixed(2);
}
