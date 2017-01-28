const calElem = document.getElementById("cal-drop");
const calContainer = document.getElementById("cal-contain");
const nightSwitch = document.getElementById("night-mode-toggle");
let nightMode = false;
calElem.addEventListener("mouseenter", toggleHiddenCal);
calElem.addEventListener("mouseout", toggleHiddenCal);
nightSwitch.addEventListener("click", toggleNightMode);

function toggleHiddenCal() {
  calContainer.classList.toggle("hidden");
}

function toggleNightMode() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    card.classList.toggle("blue-grey");
    card.classList.toggle("white-text");
  });
  document.body.classList.toggle("dark");
  nightMode = true;
}
$(document).ready(function() {
  startTime();
  getWeather("owm", (data) => putWeatherInStatus(data));
  getNewNews();
  // getRedditPic();
  getAPOD();
});
