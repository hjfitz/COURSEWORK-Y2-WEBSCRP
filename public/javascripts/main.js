const calElem = document.getElementById("cal-drop");
const calContainer = document.getElementById("cal-contain");
let nightMode = false;
calElem.addEventListener("mouseenter", toggleHiddenCal);
calElem.addEventListener("mouseout", toggleHiddenCal);

function toggleHiddenCal() {
  calContainer.classList.toggle("hidden");
}

function goNightMode() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    card.classList += " blue-grey white-text";
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
  //getWeather();
  getRedditPic();
});
