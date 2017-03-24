const
  setupArea   = document.getElementById('setup'),
  weatherCard = document.getElementById('weather-card'),
  newsCard    = document.getElementById('news-card'),
  todoCard    = document.getElementById('todo-card'),
  imageCard   = document.getElementById('image-card'),
  pageTiles   = new Tiles(setupArea, "#3F51B5", { 'across': 32, 'down': 25}),
  cards       = [weatherCard, newsCard, todoCard, imageCard],
  card = {
    'weather': weatherCard,
    'news': newsCard,
    'image': imageCard,
    'todo': todoCard
  }

function setup() {
  pageTiles.createTiles()
  let
    select  = document.createElement("select"),
    add     = document.getElementById('add'),
    load    = document.getElementById('load'),
    save    = document.getElementById('save'),
    edit    = document.getElementById('edit'),
    dropper = document.getElementById('dropper')
  ;
  select.classList = "browser-default black-text"
  select.id        = "card-list"
  add.addEventListener('click', addCardToForm)
  save.addEventListener('click', saveAll)
  load.addEventListener('click', loadFromLS)
  edit.addEventListener('click', editForm)
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

    if (firstCardTop < secondCardTop) {
      top = firstCardTop
      height = secondCardTop - firstCardTop + pageTiles.pageInfo.maxHeight
    }

    if (firstCardLeft < secondCardLeft) {
      left = firstCardLeft
      width = secondCardLeft - firstCardLeft + pageTiles.pageInfo.maxWidth
    }

    let
      newCard = card[$('select').val()],
      prefs = {
        'left':   left + "px",
        'top':    top + "px",
        'width':  width + "px",
        'height': height + "px"
      }
    putCardInPosition(prefs,newCard)
  }
}

function editForm() {
  pageTiles.toggleTiles()
  pageTiles.resetTiles()
  //something else
}

function putCardInPosition(pref, newCard) {
  newCard.style.left = pref.left
  newCard.style.position = "absolute"
  newCard.style.top = pref.top
  newCard.style.width = pref.width
  newCard.style.height = pref.height
  newCard.style.minWidth = pref.width
  newCard.style.minHeight = pref.height
  newCard.style.zIndex = 3
  newCard.dataset['onPage'] = 1
  setupArea.appendChild(newCard)
}

function saveAll() {
  pageTiles.toggleTiles()
  //save to local storage for later retrieval
  let visCards = []
  for (const cd of cards) {
    //need a better way to parse this
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
  //save preferences
  window.localStorage.setItem('card_preferences', JSON.stringify(visCards))
}

function loadFromLS() {
  const info = JSON.parse(window.localStorage.card_preferences)
  for (const cardInfo of info) {
    let newCard = document.getElementById(cardInfo.id)
    let pref = cardInfo.pref
    putCardInPosition(pref,newCard)
  }
}

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
  if (pageTiles.selectedTiles.length == 2) pageTiles.highlight()
}

//eat your heart out, jQuery
document.addEventListener('DOMContentLoaded', () => {
  setup()
})
