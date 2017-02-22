//there's probably a moment function for this. have yet to check the docs.
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startTime() {
  logTime();
  window.setInterval(logTime, 60000);
}

function logTime() {
  let container = document.getElementById("timeinfo");
  let day = moment().get('day');
  let month = moment().get("month");
  let year = moment().get("year");
  let hour = moment().get("hour");
  let min = moment().get("minute");
  let sec = moment().get("second");
  let time = hour + ":" + min;
  let curDate = days[day] + " " + day + " " + months[month];
  let datetime = curDate + ", " + time;
  container.textContent = datetime;
}

function putWeatherInStatus(weatherInfo) {
  // console.log(weatherInfo);
  let tempUnit = "°C";

  const weatherHigh = document.getElementById("weather-high");
  const weatherLow = document.getElementById("weather-low");
  const weatherDesc = document.getElementById("weather-description");
  const weatherInfoDesc = weatherInfo.desc;

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
  descPara.textContent = "It's " + weatherInfoDesc.toLowerCase() + " outside.";

  weatherHigh.appendChild(minTempPara);
  weatherLow.appendChild(maxTempPara);
  weatherDesc.appendChild(descPara);
}
