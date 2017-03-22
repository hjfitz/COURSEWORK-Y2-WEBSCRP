$(document).ready( () => {
  startTime()
  //check if it's night mode, if it is then toggle!
  nightModeWatch()
})


function nightModeWatch() {
    getWeatherWithGeoLocation('owm', data => {
      putWeatherInCard(data)
      putWeatherInStatus(data)
      //temporary, and most likely buggy, auto night mode feature
      let sunset = new Date(0)
      let today = new Date()
      sunset.setUTCSeconds(data.sunset)
      if (today < sunset) {
        toggleNightMode()
      }

      window.setInterval(() => {
        today = new Date()
        if (today > sunset) {
          toggleNightMode()
        }
      }, 300000)
    })
}
