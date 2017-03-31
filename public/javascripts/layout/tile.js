//initialise. create new cards, create our tiles and put everything in to a nice array
const
  setupArea   = document.getElementById('setup'),
  mainRow     = document.getElementById('main-row'),
  weatherCard = new Card('weather', {'image': true}),
  newsCard    = new Card('news', {'image': true, 'truncateTitle':true, 'text':true}),
  imageCard   = new Card('pic', {'image': true, 'truncateTitle': true, 'text':true }),
  todoCard    = new Card('todo'),
  timeCard    = new Card('time', { 'text':true}),
  pageTiles   = new Tiles(setupArea, "#3F51B5", { 'across': 32, 'down': 27}),
  weather     = new Weather()
  cardObjs    = [weatherCard, newsCard, todoCard, imageCard, timeCard],
  cards =
    [
      weatherCard.getCard(),
      newsCard.getCard(),
      todoCard.getCard(),
      imageCard.getCard(),
      timeCard.getCard()
    ],
  card = {
    'weather': weatherCard.getCard(),
    'news': newsCard.getCard(),
    'image': imageCard.getCard(),
    'todo': todoCard.getCard(),
    'time': timeCard.getCard()
  };

//add event listeners
weatherCard.addSettings(toggleWeatherSettings)
timeCard.addSettings(toggleTimeSettings)
newsCard.addSettings(newsSettings)
imageCard.addSettings(togglePictureSettings)

//add the cards to the page, but hide in a hidden area
for (const card of cardObjs) {
  card.addCard(mainRow)
}

function setup() {
  //if we don't have any settings, let the user create some!
  if (!('card_preferences' in window.localStorage)) {
    pageTiles.createTiles()
  }
  let
    select  = document.createElement("select"),
    add     = document.getElementById('add'),
    save    = document.getElementById('save'),
    edit    = document.getElementById('edit'),
    dropper = document.getElementById('dropper')
  ;
  //add event listeners
  select.classList = "browser-default black-text"
  select.id        = "card-list"
  add.addEventListener('click', addCardToForm)
  save.addEventListener('click', saveAll)
  edit.addEventListener('click', editForm)
  //go through out dict, and add the keys to a dropdown.
  //the key value is later used to acces the card
  for (let key in card) {
    let option = document.createElement('option')
    option.textContent = key
    option.value = key
    select.appendChild(option)
  }
  dropper.appendChild(select)
}

function addCardToForm() {
  if (pageTiles.selectedArea.length === 0) {
    Materialize.toast('No area selected!', 3000)
  } else {
    //each tile you see on the page is an absolutely positioned div.
    //getting the top and left of each tile allows us to define
    //left and top values of the card we aim to put on the page.
    //because we get the left of each of the positioned cards,
    //we can define the width (by adding the width defined, too!)
    let
      firstCardTop = parseInt(pageTiles.selectedArea[0].style.top, 10),
      firstCardLeft = parseInt(pageTiles.selectedArea[0].style.left, 10),
      secondCardTop = parseInt(pageTiles.selectedArea[1].style.top, 10),
      secondCardLeft = parseInt(pageTiles.selectedArea[1].style.left, 10),
      top = secondCardTop,
      left = secondCardLeft,
      width = (firstCardLeft - secondCardLeft + pageTiles.pageInfo.maxWidth),
      height = (firstCardTop - secondCardTop + pageTiles.pageInfo.maxHeight)
    ;

    //we check if the other card selected is higher, and redfine top based on that
    if (firstCardTop < secondCardTop) {
      top = firstCardTop
      height = secondCardTop - firstCardTop + pageTiles.pageInfo.maxHeight
    }

    //same as before, but for left
    if (firstCardLeft < secondCardLeft) {
      left = firstCardLeft
      width = secondCardLeft - firstCardLeft + pageTiles.pageInfo.maxWidth
    }

    let
    //we access the card we want to add to the page, based on the value of the dropdown
      newCard = card[$('#card-list').val()],
      prefs = {
        'left':   left + "px",
        'top':    top + "px",
        'width':  width + "px",
        'height': height + "px"
      }
      //put the card on the page!
    putCardInPosition(prefs,newCard)
  }
}

function editForm() {
  //start by creating our awesome grid
  pageTiles.createTiles()
  //reset the font settings for the clock, if it exists
  if ('clock_font_pref' in localStorage) localStorage.removeItem('clock_font_pref')
  //because our cards are stored in classes, accessible from a list, we can just remove them
  for (const card of cards) {
    card.parentElement.removeChild(card)
    card.dataset['onPage'] = 0
  }
}

function putCardInPosition(pref, newCard) {
  newCard.style.left = pref.left
  newCard.style.position = "absolute"
  newCard.style.top = pref.top
  newCard.style.width = pref.width
  newCard.style.height = pref.height
  //make the card visible
  newCard.style.zIndex = 3
  //notify us later on, when we go to save.
  //the card could be removed from the dropdown, but what if we want to reposition?
  newCard.dataset['onPage'] = 1
  setupArea.appendChild(newCard)
}

function saveAll() {
  mainLoop()
  console.log("all saved")
  pageTiles.toggleTiles()
  //save to local storage for later retrieval
  let visCards = []
  for (const cd of cards) {
    //when we put the card in position, we set its on-page dataset to 1
    //this lets us know now that we need to save the information.
    if (cd.dataset['onPage'] == 1) {
      visCards.push({
        'id': cd.id,
        'pref': {
          'left':   cd.style.left,
          'top':    cd.style.top,
          'width':  cd.style.width,
          'height': cd.style.height
        }
      })
    }
  }
  //save preferences to localStorage
  window.localStorage.setItem('card_preferences', JSON.stringify(visCards))
  //call the loop for news, weather and so on
  // mainLoop()
}

function loadFromLS() {
  //gather our information from localStorage. Perform a check first.
  if ('card_preferences' in window.localStorage) {
    const info = JSON.parse(window.localStorage.card_preferences)
    for (const cardInfo of info) {
      let newCard = document.getElementById(cardInfo.id)
      let pref = cardInfo.pref
      putCardInPosition(pref,newCard)
    }
    pageTiles.toggleTiles()
    console.log("loaded")
  } else {
    Materialize.toast('Error, could not find settings!', 3000)
  }
}

//each of the div/tiles have an event listener for changeOpacity
//this reduces the opacity of a div when it's been clicked. when two are clicked, we highlight an area
function changeOpacity(e) {
  pageTiles.selectedTiles.push(e.target);
  let
    clicked = e.target.dataset.clicked,
    clicks = { "true": "false", "false":"true" }
  ; //yeah, I know...
  if (clicked === "true") {
    e.target.style.opacity = null
  } else {
    e.target.style.opacity = "0.8"
  }
  //toggle the 'boolean'... (can't store bool in dataset!)
  e.target.dataset.clicked = clicks[clicked]
  //highlight an area when we've selected corners
  if (pageTiles.selectedTiles.length == 2) pageTiles.highlight()
}

//eat your heart out, jQuery
document.addEventListener('DOMContentLoaded', () => {
  setup()
  setWeatherCard()
})
