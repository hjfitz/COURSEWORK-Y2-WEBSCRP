saveBtn.addEventListener('click', toggleWeatherSettings)
let mapHidden = true
hideMap()


function setWeatherCard() {
  if (!('location_preferences' in window.localStorage)) {
    Util.getJSON('/api/configuration/location', data => {
      console.log(data)
      window.localStorage.setItem('location_preferences', JSON.stringify(data))
      weather.getByLatLong('dsn', 'weather', data)
    })
  } else {
    weather.getByLatLong('dsn', 'weather', JSON.parse(window.localStorage.getItem('location_preferences')))
  }
}

function toggleWeatherSettings() {
  overlay.classList.toggle('hide')
  if (mapHidden) {
    showMap()
  } else {
    hideMap()
  }
}

function getWeatherPreferences() {
  if (!('weather_preferenes' in window.localStorage)) {
    Util.getJSON('/api/configuration/weather', data => {
      window.localStorage.setItem('weather_preferences', JSON.stringify(data))
    })
  }
}
