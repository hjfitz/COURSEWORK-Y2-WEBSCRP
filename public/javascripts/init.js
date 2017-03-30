document.addEventListener('DOMContentLoaded', () => {
  Util.getJSON('/api/configuration', data => {
    // window.localStorage.setItem('time_preferences', JSON.stringify(data.time))
    // window.localStorage.setItem('weather_preferenes', JSON.stringify(data.weather))
    // window.localStorage.setItem('news_preferences', JSON.stringify(data.news))
    // window.localStorage.setItem('location_preferences', JSON.stringify(data.weather))
    // window.localStorage.setItem('picture_preferences', JSON.stringify(data.reddit)) //TODO
  })
})
