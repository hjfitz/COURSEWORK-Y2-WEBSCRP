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
  };

let
  blocks = [],
  selected = [],
  input = []
;

function getRandomColour() {
  let letters = '0123456789ABCE'
  let color = '#'
  for (let i = 0; i < 4; i++ ) {
    color += letters[Math.floor(Math.random() * letters.length)]
  }
  return color + "ff"; //makes it nice and blue
}

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
  //create the options area
  let
    button = document.createElement('a'),
    save = document.createElement('a'),
    select = document.createElement("select"),
    dropper = document.getElementById('dropper'),
    addbtn = document.getElementById('add'),
    savebtn = document.getElementById('save')
  ;
  button.textContent = "Add"
  save.textContent = "Save"
  button.classList = "waves-effect waves-light btn"
  save.classList = "waves-effect waves-light btn"
  select.classList = "browser-default black-text"
  select.id = "card-list"
  button.addEventListener('click', addToForm)
  save.addEventListener('click', saveAll)
  for (let key in card) {
    let option = document.createElement('option')
    option.textContent = key
    option.value = key
    select.appendChild(option)
  }
  dropper.appendChild(select)
  addbtn.appendChild(button)
  savebtn.appendChild(save)
}

function addToForm() {
  if (input.length === 0) {
    console.warn("no area selected")
  } else {
    //make me work all ways
    let
      left = input[0].style.left,
      top = input[0].style.top,
      //hacky looking
      width = (parseInt(input[1].style.left, 10) - parseInt(left)) + maxWidth + "px",
      height = (parseInt(input[1].style.top, 10) - parseInt(top)) + maxHeight + "px",
      newCard = card[$('select').val()]//,
      //TODO
      // select = document.getElementById('card-list')
      // select.remove(select.selectedIndex)
      ;
    newCard.style.left = left
    newCard.style.position = "absolute"
    newCard.style.top = top
    newCard.style.width = width
    newCard.style.height = height
    newCard.style.minWidth = width
    newCard.style.minHeight = height
    newCard.style.zIndex = 3
    setupArea.appendChild(newCard)

  }
}

function saveAll() {
  let tiles = document.querySelectorAll('.option-button')
  for (const tile of tiles) {
    tile.classList.toggle("hide")
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
  e.target.dataset.clicked = clicks[clicked]
  if (selected.length == 2) highlight()
}

function highlight() {
  resetColours()
  input.length = 0
  let
    locationStart = JSON.parse(selected[0].dataset.index),
    locationEnd = JSON.parse(selected[1].dataset.index),
    startX = locationStart.row ,
    startY = locationStart.col,
    endX = locationEnd.row,
    endY = locationEnd.col;
  // get our rows highlighted
  for (let i = startX; i <= endX; i++) {
    let curRow = blocks[i]
    for (let j = startY; j <= endY; j++) {
      // console.log(curRow[j])
      curRow[j].style.backgroundColor = getRandomColour()
      curRow[j].style.opacity = "1"
    }
  }
  input.push(selected[0])
  input.push(selected[1])
  selected.length = 0 //reset the array
}

function resetColours() {
  for (const tile of document.querySelectorAll('.option-button')) {
    tile.style.backgroundColor = "#3F51B5"
  }
}

setup()
