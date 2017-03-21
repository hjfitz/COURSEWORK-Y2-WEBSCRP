const
  mainArea = document.getElementById('main-row'),
  //get coordinates
  leftCoords  = left.getBoundingClientRect(),
  rightCoords = right.getBoundingClientRect(),
  // getcards
  cardNews    = document.getElementById('news-card'),
  cardTodo    = document.getElementById('todo-card'),
  cardImage   = document.getElementById('image-card'),
  cardAgenda  = document.getElementById('agenda-card'),
  cardDrag    = document.getElementById('drag-toggle-card'),
  cardWeather = document.getElementById('weather-card')
  //get toggle button
  toggleBtn   = document.getElementById('drag-toggle'),
  cards       = [cardWeather, cardNews, cardTodo, cardImage, cardAgenda],
  columns     = [left,right]
  ;

mainArea.addEventListener('dragover', allowDrop)
mainArea.addEventListener('drop', drop)
toggleBtn.addEventListener('click', () => {
  draggable = !draggable
  //let me know because I'm stupid
  console.log('Draggable toggled! ' + draggable)
  //add a little handle to each card
  cards.forEach(card => {
    // if draggable is set, create a little nub at the bottom of each card
    //so that we can click and drag that to move the card
    if (draggable) {
      let div = document.createElement('div');
      div.classList = 'card-action handle'
      div.setAttribute('draggable', true)
      card.appendChild(div)
    } else {
      //otherwise, we get all of the handles that we added and remove them
      let div = card.getElementsByClassName('handle')
      for (const dragger of div) {
        card.removeChild(dragger)
      }
    }
  })
 })

// put the items in their default location
//otherwise they would just make a list of cards - not ideal for a dashboard
function setLayout (cards) {
  cards.forEach(card => {
    mainArea.append(card)
    card.addEventListener('dragstart', drag)
    card.addEventListener('drop', drop)
  })
}

function allowDrop (e) {
  e.preventDefault()
}

function drag (e) {
  console.log("item dragging")
  e.dataTransfer.setData("text", e.target.id)
  e.dataTransfer.effectAllowed = "move"
}

function drop (e) {
  console.log('Drop invoked')
  e.preventDefault()
  let cardID = e.dataTransfer.getData('text')
  let card = document.getElementById(cardID)
  let mouseX = e.clientX
}


setDefault(cards)
