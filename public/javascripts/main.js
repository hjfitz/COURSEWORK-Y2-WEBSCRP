$(document).ready(() => {
  startTime()
  getWeather('owm', (data) => putWeatherInStatus(data))
  getNewNews()
  getRedditPic()
})
