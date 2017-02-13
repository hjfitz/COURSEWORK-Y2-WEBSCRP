
// let nightMode = false;

function toggleHiddenCal() {
  calContainer.classList.toggle("hidden");
}

$(document).ready(function() {
  const calElem = document.getElementById("cal-drop");
  const calContainer = document.getElementById("cal-contain");
  calElem.addEventListener("mouseenter", toggleHiddenCal);
  calElem.addEventListener("mouseout", toggleHiddenCal);

  startTime();
  getWeather("owm", (data) => putWeatherInStatus(data));
  getNewNews();
  getRedditPic();
  // getAPOD();
  // getBing();
  // getUserPreferences
  // make a call to api. /config and save to localStorage
});
