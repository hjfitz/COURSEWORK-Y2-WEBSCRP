const
  setupArea   = document.getElementById('setup'),
  topBuffer   = document.querySelector('nav').offsetHeight
  winWidth    = document.documentElement.clientWidth,
  winHeight   = document.documentElement.clientHeight - topBuffer,
  maxWidth    = Math.floor(winWidth/24),
  maxHeight   = Math.floor(winHeight/11),
  optBoxWidth = winWidth / 4,
  weatherCard = document.getElementById('weather-card'),
  newsCard    = document.getElementById('news-card'),
  todoCard    = document.getElementById('todo-card'),
  imageCard   = document.getElementById('image-card'),
  cards       = [weatherCard, newsCard, todoCard, imageCard],
  card = {
    'weather': weatherCard,
    'news': newsCard,
    'image': imageCard,
    'todo': todoCard
  }
;

let
  blocks = [],
  selected = [],
  input = []
;

function setup() {
  let row = 0
  for (let j=topBuffer; j<winHeight; j += maxHeight) {
    let col = 0
    let rowList = []
    for (let i=0; i<(winWidth-maxWidth); i+= maxWidth) {
      let index = { "row": row, "col": col }
      let div = document.createElement('div')
      div.style.position = "absolute",
      div.style.backgroundColor = "#3F51B5"//getRandomColour()
      div.style.height = maxHeight + "px"
      div.style.width = maxWidth + "px"
      div.style.top = j + "px"
      div.style.left = i + "px"
      div.style.border = "2px solid #000"
      div.classList = "option-button"
      div.dataset.index = JSON.stringify(index)
      div.dataset.clicked = "false"
      div.addEventListener('click', changeOpacity)
      setupArea.appendChild(div)
      rowList.push(div)
      col++
    }
    blocks.push(rowList)
    row++
  }
  //create the options
  let
    select  = document.createElement("select"),
    add     = document.getElementById('add'),
    load    = document.getElementById('load'),
    save    = document.getElementById('save'),
    dropper = document.getElementById('dropper')
  ;
  select.classList = "browser-default black-text"
  select.id        = "card-list"
  add.addEventListener('click', addToForm)
  save.addEventListener('click', saveAll)
  load.addEventListener('click', loadFromLS)
  for (let key in card) {
    let option = document.createElement('option')
    option.textContent = key
    option.value = key
    select.appendChild(option)
  }
  dropper.appendChild(select)
}

function addToForm() {
  if (input.length === 0) {
    Materialize.toast('No area selected!', 3000)
  } else {
    //make me work all ways
    let firstCardTop = parseInt(input[0].style.top, 10)
    let firstCardLeft = parseInt(input[0].style.left, 10)
    let secondCardTop = parseInt(input[1].style.top, 10)
    let secondCardLeft = parseInt(input[1].style.left, 10)
    var top,left,width,height
    if (firstCardTop < secondCardTop) {
      top = firstCardTop
      height = secondCardTop - firstCardTop + maxHeight
    } else {
      top = secondCardTop
      height = firstCardTop - secondCardTop + maxHeight
    }

    if (firstCardLeft < secondCardLeft) {
      left = firstCardLeft
      width = secondCardLeft - firstCardLeft + maxWidth
    } else {
      left = secondCardLeft
      width = firstCardLeft - secondCardLeft + maxWidth
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
  configTiles()
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


function configTiles(opt="hide") {
  const tiles = document.querySelectorAll('.option-button')
  if (opt === 'hide') {
    for (const tile of tiles) tile.classList.toggle('hide')
  } else if (opt === 'reset') {
    for (const tile of tiles) tile.style.backgroundColor = "#3F51B5"
  }
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
  selected.push(e.target);
  let
    clicked = e.target.dataset.clicked,
    clicks = { "true": "false", "false":"true" }
  ; //yeah, I know...
  if (clicked === "true") {
    e.target.style.opacity = "1"
  } else {
    e.target.style.opacity = "0.8"
  }
  //toggle the 'boolean'... (can't store bool in dataset!)
  e.target.dataset.clicked = clicks[clicked]
  if (selected.length == 2) highlight()
}

function highlight() {
  configTiles('reset')
  input.length = 0
  let locationStart = JSON.parse(selected[0].dataset.index)
  let locationEnd = JSON.parse(selected[1].dataset.index)
  var startX,startY,endX,endY
  //check to see which tile is highest up
  if (locationStart.row <= locationEnd.row) {
     startX = locationStart.row
     endX = locationEnd.row
  } else {
    startX = locationEnd.row
    endX = locationStart.row
  }
  if (locationStart.col <= locationEnd.col) {
    startY = locationStart.col
    endY = locationEnd.col
  } else {
    startY = locationEnd.col
    endY = locationStart.col
  }
  for (let i = startX; i <= endX; i++) {
    let curRow = blocks[i]
    for (let j = startY; j <= endY; j++) {
      curRow[j].style.backgroundColor = randomColor("green")
      curRow[j].style.opacity = "1"
    }
  }
  input.push(selected[0])
  input.push(selected[1])
  selected.length = 0 //reset the array
}

//eat your heard out, jQuery
document.addEventListener('DOMContentLoaded', () => {
  setup()
})
