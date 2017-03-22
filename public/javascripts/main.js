document.addEventListener('DOMContentLoaded', () => {
  getNewNews()
  getRedditPic()
  startTime()
  main()
})

function main() {
    getWeatherWithGeoLocation('owm', data => {
      putWeatherInCard(data)
      putWeatherInStatus(data)
      //temporary, and most likely buggy, auto night mode feature
      let sunset = new Date(0)
      let today = new Date()
      sunset.setUTCSeconds(data.sunset)
      if (today < sunset) {
        Util.toggleNightMode()
      }

      window.setInterval(() => {
        today = new Date()
        if (today > sunset) {
          Util.toggleNightMode()
        }
      }, 300000)
    })
}
