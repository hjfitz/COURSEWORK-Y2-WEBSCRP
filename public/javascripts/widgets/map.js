const overlay = document.getElementById('black-overlay')
overlay.addEventListener('click', toggleWeatherSettings)
overlay.addEventListener('click', Weather.addToCard)

function hideMap() {
  mapHidden = true
  const
    weatherArea = document.getElementById('weather-settings'),
    map = document.getElementById('map');
  weatherArea.style.width = "0"
  map.parentElement.removeChild(map)
}

function showMap() {
  getWeatherPreferences()
  mapHidden = false
  const
    map               = document.createElement('div')
    mapArea           = document.getElementById('map-area'),
    weatherArea       = document.getElementById('weather-settings'),
    pressureCheck     = document.getElementById('pressure-check'),
    humidityCheck     = document.getElementById('humidity-check'),
    windspeedCheck    = document.getElementById('windspeed-check'),
    savedWeatherPrefs = JSON.parse(window.localStorage.getItem('weather_preferenes'))
  ;
  pressureCheck.checked = savedWeatherPrefs.pressure
  humidityCheck.checked = savedWeatherPrefs.humidity
  windspeedCheck.checked = savedWeatherPrefs.windspeed

  weatherArea.style.width = "400px"
  map.id = 'map'
  mapArea.appendChild(map)
  initMap()
}
