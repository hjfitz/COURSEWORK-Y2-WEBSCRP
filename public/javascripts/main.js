document.addEventListener('DOMContentLoaded', () => {
  getNewNews()
  getRedditPic()
  startTime()
  main()
  if ('card_preferences' in window.localStorage) {
    loadFromLS()
    Util.getJSON('/api/configuration', data => {
      window.localStorage.setItem('time_preferences', JSON.stringify(data.time))
      window.localStorage.setItem('weather_preferenes', JSON.stringify(data.weather))
      window.localStorage.setItem('news_preferences', JSON.stringify(data.news))
      window.localStorage.setItem('picture_preferences', JSON.stringify(data.reddit)) //TODO
    })
  }
})

function main() {
  // if (window.localStorage.getItem('location') !== null) {
  //   Weather.getByLatLong('owm', () => {
  //     Weather.addToCard()
  //   },
  //   JSON.parse(window.localStorage.getItem('location')))
  // } else {
  //   Weather.getWithGeolocation('owm', () => {
  //       Weather.addToCard()
  //
  //   })
  // }
    // getWeatherWithGeoLocation('owm', data => {
    //   putWeatherInCard(data)
    //   putWeatherInStatus(data)
    //   //temporary, and most likely buggy, auto night mode feature
    //   let sunset = new Date(0)
    //   let today = new Date()
    //   sunset.setUTCSeconds(data.sunset)
    //   if (today < sunset) {
    //     Util.toggleNightMode()
    //   }
    //
    //   window.setInterval(() => {
    //     today = new Date()
    //     if (today > sunset) {
    //       Util.toggleNightMode()
    //     }
    //   }, 300000)
    // })
}
