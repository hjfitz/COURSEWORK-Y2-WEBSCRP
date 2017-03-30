const
  timeSettings       = document.getElementById('time-settings'),
  timeOverlay        = document.getElementById('black-overlay-time'),
  timeSaveButton     = document.getElementById('set-time'),
  dateButton = document.getElementById('date-toggle'),
  monthButton = document.getElementById('month-toggle'),
  yearButton = document.getElementById('year-toggle'),
  secondsCheck = document.getElementById('seconds-check'),
  check24h = document.getElementById('24h-check')
;

if ('time-settings' in window.localStorage) {
  console.log("time settings found")
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

//curse you, for not having an event listener for container resize!
function addDragListener(cardName) {

  let card = document.getElementById(cardName+'-card')
  let cardTime = document.getElementById(cardName+'-title')
  let cardDate = document.getElementById(cardName+'-content')
  cardTime.style.fontSize = window.getComputedStyle(cardTime).fontSize
  cardDate.style.fontSize = window.getComputedStyle(cardDate).fontSize || 0
  let dragTangle = document.createElement('span')
  dragTangle.style.height = "20px"
  dragTangle.style.width = "20px"
  dragTangle.style.position = "absolute"
  dragTangle.style.bottom = "0px"
  dragTangle.style.right = "0px"
  dragTangle.style.backgroundColor = "#f0f"
  card.appendChild(dragTangle)
  const initArea = card.getBoundingClientRect().width * card.getBoundingClientRect().height
  const initSize = parseInt(cardTime.style.fontSize)
  dragTangle.addEventListener('mousedown', dragme)
  function dragme(ev) {
    ev.preventDefault()
    // ev.target.addEventListener('mousemove', changeFontSize)
    window.addEventListener('mousemove', changeFontSize)
    // ev.target.addEventListener('mouseup', removeDrag)
    window.addEventListener('mouseup', removeDrag)
  }
  function removeDrag(ev) {
    ev.preventDefault()
    ev.target.removeEventListener('mousemove', changeFontSize)
    window.removeEventListener('mousemove', changeFontSize)
  }
  function changeFontSize(ev) {
    card.style.width = (ev.clientX - card.offsetLeft) + 3 + "px"
    card.style.minWidth = (ev.clientX - card.offsetLeft) +3+ "px"
    card.style.height = (ev.clientX - card.offsetTop) + 3 + "px"
    card.style.minHeight = (ev.clientY - card.offsetTop) +3+ "px"
    let currentSize = card.getBoundingClientRect()
    let width = currentSize.width
    let height = currentSize.height
    let area = height*width
    let prop = area/initArea
    cardTime.style.fontSize = (width+height) * 0.1 + "px"//initSize *prop + "px"
    // console.log
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

//set functions
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
  // setButtons()
}

function toggleHours() {
  settings.hours = !settings.hours
  // setButtons()
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
