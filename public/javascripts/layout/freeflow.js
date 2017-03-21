const
  setupArea   = document.getElementById('setup'),
  topBuffer   = document.querySelector('nav').offsetHeight
  winWidth    = document.documentElement.clientWidth,
  winHeight   = document.documentElement.clientHeight - topBuffer,
  maxWidth    = Math.floor(winWidth/12),
  maxHeight   = Math.floor(winHeight/6),
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
  selected = []
;

function getRandomColour() {
  let letters = '0123456789ABCE'
  let color = '#'
  for (let i = 0; i < 4; i++ ) {
    color += letters[Math.floor(Math.random() * letters.length)]
  }
  return color + "ff";
}

function setup() {
  let row = 0
  for (let j=topBuffer; j<winHeight; j += maxHeight) {
    let col = 0
    let rowList = []
    for (let i=0; i<(winWidth-maxWidth-optBoxWidth); i+= maxWidth) {
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
  let opt = document.createElement("div")
  opt.id = "options-area"
  opt.style.position = "absolute"
  opt.style.height = winHeight + "px"
  opt.style.width = optBoxWidth + "px"
  opt.style.top = topBuffer + "px"
  opt.style.right = "0px"
  opt.style.backgroundColor = "#f0f"
  addToOpt(opt)
  setupArea.appendChild(opt)
}

function addToOpt() {

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
      console.log(curRow[j])
      curRow[j].style.backgroundColor = getRandomColour()//"#f0f"
      curRow[j].style.opacity = "1"
    }
  }
  selected.length = 0 //reset the array
  console.log("oi")
}

setup()
