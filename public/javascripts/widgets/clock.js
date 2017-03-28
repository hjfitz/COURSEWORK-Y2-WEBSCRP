const
  timeSettings       = document.getElementById('time-settings'),
  timeOverlay        = document.getElementById('black-overlay-time'),
  timeSaveButton     = document.getElementById('set-time'),
  clockFormatToggle  = document.getElementById('24h'),
  secondsToggle      = document.getElementById('seconds'),
  dateToggle         = document.getElementById('date-lever'),
  monthToggle        = document.getElementById('month-lever'),
  yearToggle         = document.getElementById('year-lever'),
  timeStylePreview   = document.getElementById('time-preview'),
  yearStylePreview   = document.getElementById('date-preview'),
  dayPreview         = document.getElementById('day'),
  datePreview        = document.getElementById('date'),
  monthPreview       = document.getElementById('month'),
  monthNumberPreview = document.getElementById('month-num'),
  yearShortPreview   = document.getElementById('year-short'),
  yearPreview        = document.getElementById('year'),
  levers             = document.getElementsByClassName('lever')
;

let
  seconds = false,
  allowDate = true,
  hours = false ,
  dayFormat = 'ddd',
  monthFormat = 'MMM',
  yearFormat = 'Y',
  altDayFormat = 'DD',
  altMonthFormat = 'MM',
  altYearFormat = 'YY',
  settings;

if ('time-settings' in window.localStorage) {
  settings = JSON.parse(window.localStorage.getItem('time-settings'))
} else {
  settings = {
    'allowDate': allowDate,
    'day':dayFormat,
    'month':monthFormat,
    'year': yearFormat,
    'hours':hours,
    'seconds':seconds,
    'dateFormat': dayFormat + '-' + monthFormat + '-' + yearFormat
  }
}

//add event listeners
document.addEventListener('DOMContentLoaded', () => {
  setSettings()
})
timeSaveButton.addEventListener('click', setTime)
timeOverlay.addEventListener('click', toggleTimeSettings)
clockFormatToggle.addEventListener('click', () => { hours = !hours })
secondsToggle.addEventListener('click', () => { seconds = !seconds })
dateToggle.addEventListener('click', changeDate)
monthToggle.addEventListener('click', changeMonth)
yearToggle.addEventListener('click', changeYear)
for (const lever of levers) {
  lever.addEventListener('click', setPreview)
  lever.addEventListener('click', setSettings)
}

function sendTime() {
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/time',
    data: settings,
    success: console.log,
    error: console.error
  })
}


function changeDate() {
  let temp = dayFormat
  dayFormat = altDayFormat
  altDayFormat = temp
}

function changeMonth() {
  let temp = monthFormat
  monthFormat = altMonthFormat
  altMonthFormat = temp
}

function changeYear() {
  let temp = yearFormat
  yearFormat = altYearFormat
  altYearFormat = yearFormat
}

function setSettings() {
  settings = {
    'allowDate': allowDate,
    'day':dayFormat,
    'month':monthFormat,
    'year': yearFormat,
    'hours':hours,
    'seconds':seconds,
    'dateFormat': dayFormat + '-' + monthFormat + '-' + yearFormat
  }
  putTimeOnCard()
}


function setPreview() {
  dayPreview.textContent         = moment().format("ddd")
  datePreview.textContent        = moment().format('DD')
  monthPreview.textContent       = moment().format('MMM')
  monthNumberPreview.textContent = moment().format('MM')
  yearShortPreview.textContent   = moment().format('YY')
  yearPreview.textContent        = moment().format('Y')

}

function toggleTimeSettings() {
  document.getElementById('time-settings').classList.toggle('hide')
  document.getElementById('black-overlay-time').classList.toggle('hide')
}

function setTime() {
  setSettings()
  toggleTimeSettings()
  saveTime()
}

function saveTime() {
  let savedTime = JSON.stringify(settings)
  sendTime()
  window.localStorage.setItem('time-settings', savedTime)
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

//by default, we want a 24h clock with no seconds
function getFormattedTime(twelveHours=false, allowSeconds=false) {
  const curDate = new Date()
  //get the main data for the clock
  let hours = curDate.getHours()
  let minutes = curDate.getMinutes()
  //ensure that they're formatted correctly
  if (hours.toString().length === 1) hours ='0' + hours
  if (minutes.toString().length === 1) minutes = '0' + minutes
  //format the time
  let time = hours + ':' + minutes
  //check if we want the clock in 12h form. if we do, format it correctly
  if (twelveHours && hours > 12) hours -= 12
  //if we want seconds on the clock, enable it.
  if (allowSeconds) {
    let seconds = curDate.getSeconds()
    return time + ':' + seconds
  } else {
    //otherwise return the time we've calculated
    return time
  }
}
//doesn't the word seconds look funny by now
