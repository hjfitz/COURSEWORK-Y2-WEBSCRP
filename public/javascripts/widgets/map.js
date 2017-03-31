let mapHidden = true
//get the elements that we require
const
  mapArea           = document.getElementById('map-area'),
  weatherArea       = document.getElementById('weather-settings'),
  pressureCheck     = document.getElementById('pressure-check'),
  humidityCheck     = document.getElementById('humidity-check'),
  windspeedCheck    = document.getElementById('windspeed-check'),
  unitToggle        = document.getElementById('unit-toggle'),
  unitLever         = document.getElementById('unit-lever'),
  savedWeatherPrefs = JSON.parse(window.localStorage.getItem('weather_preferences')),
  weatherSaveBtn = document.getElementById('save-weather'),
  overlay = document.getElementById('black-overlay');

overlay.addEventListener('click', toggleWeatherSettings)
overlay.addEventListener('click', Weather.addToCard)
weatherSaveBtn.addEventListener('click', toggleWeatherSettings)
weatherSaveBtn.addEventListener('click', saveWeatherPreferences)

//hide the map on page load. google maps api has some weird behaviour if you set it's display:hidden
hideMap()

//add event listeners
pressureCheck.addEventListener('click', togglePressure)
humidityCheck.addEventListener('click',toggleHumidity)
windspeedCheck.addEventListener('click', toggleWindspeed)
unitToggle.addEventListener('click', toggleUnit)

//the values are stored as string, because JSON.stringify has some very strange behaviour,
// and I can't rely on it *partly* working. Therefore, we deal with booleans like this. applys to next 2 functions.
function togglePressure() {
  if (savedWeatherPrefs.pressure == true || savedWeatherPrefs.pressure == "true") {
    savedWeatherPrefs.pressure = "false"
  } else {
    savedWeatherPrefs.pressure = "true"
  }
}

function toggleHumidity() {
  if (savedWeatherPrefs.humidity == true || savedWeatherPrefs.humidity == "true") {
    savedWeatherPrefs.humidity = "false"
  } else {
    savedWeatherPrefs.humidity = "true"
  }
}

function toggleWindspeed() {
  if (savedWeatherPrefs.windspeed == true || savedWeatherPrefs.windspeed == "true") {
    savedWeatherPrefs.windspeed = "false"
  } else {
    savedWeatherPrefs.windspeed = "true"
  }
}

function toggleUnit() {
  let unitSwitcher = { 'F':'C', 'C':'F' }
  savedWeatherPrefs.unit = unitSwitcher[savedWeatherPrefs.unit]
}

//save the weather preferences and back up to the API.
function saveWeatherPreferences() {
  let newWeather = savedWeatherPrefs
  window.localStorage.setItem('weather_preferences', JSON.stringify(newWeather))
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/weather',
    data: (newWeather),
    success: data => {
      Materialize.toast("Weather Saved!", 3000)
    },
    error: console.warn
  })
}

//hide or show the container for the map
function toggleWeatherSettings() {
  overlay.classList.toggle('hide')
  if (mapHidden) {
    showMap()
  } else {
    hideMap()
  }
}

//actually delete the map from the page when we hide the container.
function hideMap() {
  mapHidden = true
  const
    weatherArea = document.getElementById('weather-settings'),
    map = document.getElementById('map');
  weatherArea.style.width = "0"
  map.parentElement.removeChild(map)
}

function showMap() {
   console.log(savedWeatherPrefs)
  getWeatherPreferences()
  const map = document.createElement('div')
  mapHidden = false
  //check the checkboxes depending on what's said in the options
  if (savedWeatherPrefs.pressure === true || savedWeatherPrefs.pressure == "true") {
    pressureCheck.checked = true
  }
  if (savedWeatherPrefs.humidity === true || savedWeatherPrefs.humidity == "true") {
    humidityCheck.checked = true
  }
  if (savedWeatherPrefs.windspeed === true || savedWeatherPrefs.windspeed == "true") {
    windspeedCheck.checked = true
  }
  unitLever.checked = (savedWeatherPrefs.unit == 'F')

  //set the weather area to it's original size
  weatherArea.style.width = "400px"
  map.id = 'map'
  mapArea.appendChild(map)
  //initialise the map in setLocation.js
  initMap()
}
