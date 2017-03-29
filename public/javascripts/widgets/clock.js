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
let settings,
  dayFormat = 'ddd',
  monthFormat = 'MMM',
  yearFormat = 'YY'
;
if ('time-settings' in window.localStorage) {
  console.log("time settings found")
  settings = JSON.parse(window.localStorage.getItem('time-settings'))
} else {
  settings = {
    'allowDate': true,
    'day':dayFormat,
    'month':monthFormat,
    'year': yearFormat,
    'hours':true,
    'seconds':true,
    'dateFormat': dayFormat + '-' + monthFormat + '-' + yearFormat,
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
  console.log(twelveHours)
  console.log(settings)
  console.log(JSON.parse(window.localStorage.getItem('time-settings')))
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
