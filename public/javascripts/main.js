document.addEventListener('DOMContentLoaded', () => {
  getNewNews()
  if (!('picture_preferences' in window.localStorage)) {
    Util.getJSON('/api/configuration/reddit', data => {
      window.localStorage.setItem('picture_preferences', JSON.stringify(data))
      getRedditPic(data.subreddit)
    })
  } else {
    subredditFromLocalStor = window.localStorage.getItem('picture_preferences'),
    subreddit              = JSON.parse(subredditFromLocalStor).subreddit;
    getRedditPic(subreddit)
  }

  startTime()
  main()
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
