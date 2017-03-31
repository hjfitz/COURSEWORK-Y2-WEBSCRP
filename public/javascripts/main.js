let introRun = false
let intervals = [ ]
$(document).ready(() => {
  loadFromLS()
  getNewNews()
  startTime()
  getPicture()

  mainLoop()
})

function mainLoop(picWait=10, weatherWait=20) {
  // clearIntervals()
  // let nightCheck = new Weather()
  //need a websocket to listen for new todos to refresh them!
  if ('card_preferences' in window.localStorage) {
    let allCards = JSON.parse(window.localStorage.getItem('card_preferences'))
    window.setInterval(() => {
      //slightly messy, slightly not way to check that we can put the time on our card
      for (const card of allCards) {
        if (card.id == 'time-card'){
         putTimeOnCard()
         addDragListener('time')
       }
     }
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
      for (const card of allCards) if (card.id == 'weather-card') setWeatherCard()
    }, (weatherWait*60*1000))
  } else {
    if (!introRun) addIntroCard()
  }
}

/*
 * create an introduction card, call it setup
 * position it correctly, and add some nice information to help the user.
 * add an event listener to dismiss the card
 */
function addIntroCard() {
  introRun = true
  let introCard = new Card('intro',{'button':true, 'text': true})
  let informationCard = introCard.getCard()
  introCard.addCard(document.getElementById('setup'))
  informationCard.style.width = "400px"
  informationCard.style.height = "550px"
  informationCard.style.left = "5vw"
  informationCard.style.bottom = "5vw"
  informationCard.style.zIndex = '4'
  informationCard.style.top = "25%"
  informationCard.style.position = "absolute"
  let introTitle = document.getElementById('intro-title')
  let introContainer = document.getElementById('intro-content')
  let introButton = document.getElementById('intro-link')
  introButton.addEventListener('click', () => {informationCard.classList.toggle('hide')})
  introButton.textContent = "Dismiss"
  introTitle.textContent = 'Welcome!'
  introContainer.innerHtml =
  lines = [
    "Welcome to your dashboard!",
    "A few things to note before you get started.",
    "The tiles in the background are how you select where you want your widget to go.",
    "Click two tiles to specify a square.",
    "When you've selected your area, you can click the little pencil button in the bottom left,",
    "select a widget from the dropdown, and click 'add' to add it!.",
    "Some of these widgets have options. You can get to these by clicking the spanner in the top right of that widget.",
    "You can click the grey background to return",
    "You can also resize each of the widgets!",
    "Make sure to save and refresh the page when you're done! (Save is in the same menu as add)",
    "Have fun!"
  ]
  //much easier than making lots of <p>
  for (const line of lines) {
    let p = document.createElement('p')
    p.textContent = line
    introContainer.appendChild(p)
  }

}
