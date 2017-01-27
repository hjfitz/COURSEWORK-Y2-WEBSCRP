const calElem = document.getElementById("cal-drop");
const calContainer = document.getElementById("cal-contain");
const logo = document.getElementById("main-logo");
let nightMode = false;
calElem.addEventListener("mouseenter", toggleHiddenCal);
calElem.addEventListener("mouseout", toggleHiddenCal);
logo.addEventListener("click", toggleNightMode);

function toggleHiddenCal() {
  calContainer.classList.toggle("hidden");
}

function toggleNightMode() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    card.classList.toggle("blue-grey");
    card.classList.toggle("white-text");
    document.body.classList.toggle("dark");
  });
  nightMode = true;
}

function goDayMode() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    card.classList = "card";
  });
  nightMode = false;
}

$(document).ready(function() {
  getWeather();
  getNewNews();
  // getRedditPic();
  getAPOD();
});
