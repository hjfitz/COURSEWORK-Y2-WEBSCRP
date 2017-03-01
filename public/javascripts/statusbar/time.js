//there's probably a moment function for this. have yet to check the docs.
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function startTime () {
  logTime();
  window.setInterval(logTime, 60000)
}

function logTime () {
  let container = document.getElementById('timeinfo')
  let day = moment().get('day')
  let month = moment().get('month')
  let year = moment().get('year')
  let hour = moment().get('hour')
  let min = moment().get('minute')
  let sec = moment().get('second')
  let time = hour + ':' + min
  let curDate = days[day] + ' ' + day + ' ' + months[month]
  let datetime = curDate + ', ' + time
  container.textContent = datetime
}
