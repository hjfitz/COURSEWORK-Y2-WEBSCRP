const OWMAPIKEY = "bbc67f01cffb0e40951dbab4a4e69a87";
var owm = "http://api.openweathermap.org/data/2.5/weather?lat=";
var dsn = "https://api.darksky.net/forecast/30b70d1026437f163d8e413b72d70d4c/";
var weatherInfo = {};


function getWeather(source="owm") {
  let xhr = new XMLHttpRequest();
  navigator.geolocation.getCurrentPosition(function(pos) {
    const COORDS = {
      lat: pos.coords.latitude.toFixed(4),
      lon: pos.coords.longitude.toFixed(4)
    };
    if (source === "owm") {
      console.log("Using OWM!");
      owm += COORDS.lat + "&lon=" + COORDS.lon + "&appid=" + OWMAPIKEY;
      xhr.open('GET', owm, true);
      xhr.onload = function() {
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
      console.warn("Falling back to darksky.net for weather");
      dsn += pos.coords.latitude.toFixed(4) + ",";
      dsn +=pos.coords.longitude.toFixed(4) +"?units=si";
      // darksky.net has a no access-control-header present
      // rather than force the user to install a chrome extension
      // we use jquery's $.ajax and json with padding as the datatype
      $.ajax({
        url: dsn,
        dataType: 'jsonp',
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
      });
    }
  });
}

function putWeatherInCard() {
  let tempUnit = "°C";
  const weatherArea = document.getElementById("weather-content");
  const weatherText = document.getElementById("weather-text");
  const weatherDesc = weatherInfo.desc;

  const curTemp = weatherInfo.avg + tempUnit;
  const minTemp = weatherInfo.min + tempUnit;
  const maxTemp = weatherInfo.max + tempUnit;

  let tempPara = document.createElement('p');
  let minTempPara = document.createElement('p');
  let maxTempPara = document.createElement('p');
  let descPara = document.createElement('p');

  let coldSpan = document.createElement('span');
  let warmSpan = document.createElement('span');

  coldSpan.classList = "coldWeather";
  warmSpan.classList = "warmWeather";

  coldSpan.textContent = minTemp;
  warmSpan.textContent = maxTemp;

  tempPara.textContent = "It's currently " + curTemp;
  minTempPara.textContent = "Maximum temp is ";
  maxTempPara.textContent = "Minimum temp is ";

  minTempPara.appendChild(coldSpan);
  maxTempPara.appendChild(warmSpan);
  descPara.textContent = "It's " + weatherDesc.toLowerCase() + " outside.";
  weatherArea.appendChild(tempPara);
  weatherArea.appendChild(minTempPara);
  weatherArea.appendChild(maxTempPara);
  weatherArea.appendChild(descPara);
}


function kelvinToCelsius(tempK) {
  return (parseInt(tempK) - 273.15).toFixed(2);
}

function kelvinToFareneit(tempK) {
  return (parseInt(tempK) * (9/5) - 459.67).toFixed(2);
}
