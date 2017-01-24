const OWMAPIKEY = "bbc67f01cffb0e40951dbab4a4e69a87";
const OWMPRE = "http://api.openweathermap.org/data/2.5/weather?q=";
var city = "Portsmouth";
const OWMPOST = ",uk&appid=" + OWMAPIKEY;
const owmUrl = OWMPRE + city + OWMPOST;
const portsWeather = "http://api.openweathermap.org/data/2.5/forecast/city?id=2639996&APPID=bbc67f01cffb0e40951dbab4a4e69a87";

var coords = [];
var weatherInfo = [];

function getWeather(source="owm") {
  //var loc = getLocation();
  //console.log(Object.keys(loc));
  if (source === "owm") {
    $.getJSON(owmUrl, function(data) {
      if (data.cod != 200) {
        getWeather("dsn");
      } else {
        console.log("Using OpenWeatherMap for weather");
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
    });
  } else if (source === "dsn") {
    console.warn("owm failed, falling back to darksky.net");
    navigator.geolocation.getCurrentPosition(function(pos) {
      coords.push(pos.coords.latitude.toFixed(4));
      coords.push(pos.coords.longitude.toFixed(4));
      var dsn = "https://api.darksky.net/forecast/30b70d1026437f163d8e413b72d70d4c/" + coords[0] + "," + coords[1] +"?units=si";
      console.log(dsn);
      $.ajax(
        {
          dataType: "jsonp",
          url: dsn,
          success: function(data) {
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
      );
    });
  }
}

function putWeatherInCard() {
  console.log(Object.keys(weatherInfo));
  console.log(weatherInfo.avg);
  const weatherArea = document.getElementById("weather-content");
  const weatherText = document.getElementById("weather-text");
  const weatherDesc = weatherInfo.desc;
  const curTemp = weatherInfo.avg;
  const minTemp = weatherInfo.min;
  const maxTemp = weatherInfo.max;
  const weatherAnnonce = "Current Temp: "+curTemp+" with lows of "+minTemp+" and highs of "+maxTemp;
  const curAnnounce = "The sky is " + weatherDesc;
  var tempPara = document.createElement('p');
  var descPara = document.createElement('p');
  tempPara.textContent = weatherAnnonce;
  descPara.textContent = curAnnounce;
  weatherArea.appendChild(tempPara);
  weatherArea.appendChild(descPara);
}

function getLocation() {
  var coord = {}

  return coord;
}

function kelvinToCelsius(tempK) {
  return (parseInt(tempK) - 273.15).toFixed(2);
}

function kelvinToFareneit(tempK) {
  return (parseInt(tempK) * (9/5) - 459.67).toFixed(2);
}
