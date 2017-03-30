document.addEventListener('DOMContentLoaded', () => {
  loadFromLS()
  getNewNews()
  startTime()
  getPicture()
  mainLoop()
})

function mainLoop(picWait=10, weatherWait=20) {
  //need a websocket to listen for new todos to refresh them!
  const allCards = JSON.parse(window.localStorage.getItem('card_preferences'))
  window.setInterval(() => {
    //slightly messy, slightly not way to check that we can put the time on our card
    for (const card of allCards) if (card.id == 'time-card') putTimeOnCard()
  }, 1000)

  window.setInterval(() => {
    for (const card of allCards) {
      if (card.id == "news-card") getNewNews()
      if (card.id == "pic-card") getPicture()
      if (card.id == "todo-card") getTodos(putTodosInCard)
    }
  }, (picWait*1000))

  window.setInterval(() => {
    //refresh the weather
    for (const card of allCards) if (card.id == 'weather-card') getWeatherCard()
  }, (weatherWait*60*1000))
}
