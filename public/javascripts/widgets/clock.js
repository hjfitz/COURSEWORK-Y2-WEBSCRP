const
  timeSettings       = document.getElementById('time-settings'),
  timeOverlay        = document.getElementById('black-overlay-time'),
  timeSaveButton     = document.getElementById('set-time'),
  dateButton         = document.getElementById('date-toggle'),
  monthButton        = document.getElementById('month-toggle'),
  yearButton         = document.getElementById('year-toggle'),
  secondsCheck       = document.getElementById('seconds-check'),
  check24h           = document.getElementById('24h-check')
;

//get the settings, or fall back, if they don't exist.
if ('time-settings' in window.localStorage) {
  settings = JSON.parse(window.localStorage.getItem('time-settings'))
} else {
  //if we've somehow managed to not pull from the API, and have nothing saved,
  //we fall back to some defaults
  settings = {
    'allowDate': true,
    'day':'ddd',
    'month':'MMM',
    'year': 'YY',
    'hours':true,
    'seconds':true,
    'dateFormat': 'ddd' + '-' + 'MMM' + '-' + 'YY',
  }
}

/* It appears that the only event listener for resize is only for the window.
 * therefore, our own is created; A mousedown event listener is added.
 * the mousedown adds two, one for mousemove and one for mouseup
 * mouseup removes the mousedown event listener
 * mousemove brings us to a function where we can change the height, width and font size
 * of the info in the area.
 * Ideally, I would have liked to have this for every card. It's not *really* necessary though, and time was a constraint.
 */
function addDragListener(cardName) {
  let
    card = document.getElementById(cardName+'-card'),
    cardTime = document.getElementById(cardName+'-title'),
    cardDate = document.getElementById(cardName+'-content'),
    dragTangle = document.createElement('span');

  if ('clock_font_pref' in window.localStorage) {
    cardTime.style.fontSize = window.localStorage.getItem('clock_font_pref')
  } else {
    cardTime.style.fontSize = window.getComputedStyle(cardTime).fontSize
  }
  cardDate.style.fontSize = window.getComputedStyle(cardDate).fontSize || 0
  //create a small area to draw the window, and stick it on the bottom left
  dragTangle.style.height = "20px"
  dragTangle.style.width = "20px"
  dragTangle.style.position = "absolute"
  dragTangle.style.bottom = "0px"
  dragTangle.style.right = "0px"
  card.appendChild(dragTangle)
  // add the event listener that allows us to resize!
  dragTangle.addEventListener('mousedown', dragme)
  function dragme(ev) {
    ev.preventDefault()
    //adding the event listeners to the window let us drag move the window,
    //even if the moue leaves the card - calculation is done on the
    //size of the card, and the position of the mouse on the page.
    window.addEventListener('mousemove', changeFontSize)
    window.addEventListener('mouseup', removeDrag)
  }
  function removeDrag(ev) {
    ev.preventDefault()
    //save the font size. don't pass to server.
    //if we reset, clock may have massive size but tiny container size
    window.localStorage.setItem('clock_font_pref', cardTime.style.fontSize)
    window.removeEventListener('mouseup', removeDrag) //there will only be one event listener
    window.removeEventListener('mousemove', changeFontSize)
  }
  function changeFontSize(ev) {
    //make the card move! just like the CSS attrbiute 'draggable:both;'
    //however, we can add in stuff with JS!
    card.style.width = (ev.clientX - card.offsetLeft) + 3 + "px"
    card.style.minWidth = (ev.clientX - card.offsetLeft) + 3 + "px"
    card.style.height = (ev.clientX - card.offsetTop) + 3 + "px"
    card.style.minHeight = (ev.clientY - card.offsetTop) + 3 + "px"
    let
      currentSize = card.getBoundingClientRect(),
      width = currentSize.width,
      height = currentSize.height;
    cardTime.style.fontSize = (width+height) * 0.1 + "px"
  }
}

//document's ready, run this
document.addEventListener('DOMContentLoaded', () => {
  putTimeOnCard()
  setButtons()
})
//add event listeners
timeOverlay.addEventListener('click', toggleTimeSettings)
dateButton.addEventListener('click', changeDateFormat)
monthButton.addEventListener('click', changeMonthFormat)
yearButton.addEventListener('click', changeYearFormat)
timeSaveButton.addEventListener('click', sendTime)
secondsCheck.addEventListener('click', toggleSeconds)
check24h.addEventListener('click', toggleHours)

//set the buttons to their corresponding format using moment.
function setButtons() {
  dateButton.textContent = moment().format(settings.day)
  monthButton.textContent = moment().format(settings.month)
  yearButton.textContent = moment().format(settings.year)
  if (settings.seconds) secondsCheck.checked = "checked"
  if (!settings.hours) check24h.checked = "checked"
  settings.dateFormat = settings.day + '-' + settings.month + '-' + settings.year
}

function toggleSeconds() {
  settings.seconds = !settings.seconds
}

function toggleHours() {
  settings.hours = !settings.hours
}

function changeDateFormat() {
  if (settings.day == "DD") {
    settings.day = "ddd"
  } else {
    settings.day = "DD"
  }
  setButtons()
}

function changeMonthFormat() {
  if (settings.month == "MM") {
    settings.month = "MMM"
  } else {
    settings.month = "MM"
  }
  setButtons()
}

function changeYearFormat() {
  if (settings.year == "Y") {
    settings.year = "YY"
  } else {
    settings.year = "Y"
  }
  setButtons()
}

function toggleTimeSettings() {
  timeSettings.classList.toggle('hide')
  timeOverlay.classList.toggle('hide')
}


function sendTime() {
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/time',
    data: settings,
    success: (data) => {
      console.log(data)
      window.localStorage.setItem('time-settings', JSON.stringify(settings))
    },
    error: console.error
  })
  putTimeOnCard()
}

function putTimeOnCard() {
  let timeArea = document.getElementById('time-title')
  let dateArea = document.getElementById('time-text')
  if (settings.allowDate) {
    let date = moment().format(settings.dateFormat)
    dateArea.textContent = date
  }
  timeArea.textContent = getFormattedTime(settings.hours, settings.seconds)
}
//
// //by default, we want a 24h clock with no seconds
function getFormattedTime(twelveHours, allowSeconds) {
  const curDate = new Date()
  //get the main data for the clock
  let hours = curDate.getHours()
  let minutes = curDate.getMinutes()
  //ensure that they're formatted correctly
  if (hours.toString().length === 1) hours ='0' + hours
  if (minutes.toString().length === 1) minutes = '0' + minutes
  //check if we want the clock in 12h form. if we do, format it correctly
  if (twelveHours && hours > 12) hours -= 12
  //format the time
  let time = hours + ':' + minutes
  //if we want seconds on the clock, enable it.
  if (allowSeconds) {
    let seconds = curDate.getSeconds()
    if (seconds.toString().length == 1) seconds = '0' + seconds
    return time + ':' + seconds
  } else {
    //otherwise return the time we've calculated
    return time
  }
}
// //doesn't the word seconds look funny by now
