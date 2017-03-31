function setWeatherCard() {
  //if we've got location preferences, set the weather. else, fetch it!
  if (!('location_preferences' in window.localStorage)) {
    Util.getJSON('/api/configuration/location', data => {
      //save the weather info
      window.localStorage.setItem('location_preferences', JSON.stringify(data))
      weather.getByLatLong('dsn', 'weather', data)
    })
  } else {
    weather.getByLatLong('dsn', 'weather', JSON.parse(window.localStorage.getItem('location_preferences')))
  }
}

function getWeatherPreferences() {
  //if we've not got weather preferences, get it!
  if (!('weather_preferenes' in window.localStorage)) {
    Util.getJSON('/api/configuration/weather', data => {
      window.localStorage.setItem('weather_preferences', JSON.stringify(data))
    })
  }
}
