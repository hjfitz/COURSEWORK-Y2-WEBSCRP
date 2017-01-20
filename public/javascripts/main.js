const OWMAPIKEY = "bbc67f01cffb0e40951dbab4a4e69a87";
const portsWeather = "http://api.openweathermap.org/data/2.5/forecast/city?id=2639996&APPID=bbc67f01cffb0e40951dbab4a4e69a87";
let weatherItems = [];

$(document).ready(function() {
  getWeather(6);
  getEvents(5);
});

function getWeather(city, days=5) {
  if (!city) {
    $.getJSON(portsWeather, function(data) {
      let nextDays = data.list;
      for (let i=0;i<days;i++) {
        weatherItems.push(nextDays[i]);
      }
    });
  }
}

function getEvents(nextDays) {
  const calURL = "https://www.googleapis.com/calendar/v3/calendars/89d61hh5bupr6o5kcdu677ja24fonsf6@import.calendar.google.com/events";
  $.get(calURL, function(data) {
    console.log(data);
  });
}
