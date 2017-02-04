$(document).ready(function() {
  const nightSwitch = document.getElementById("night-mode-toggle");
  nightSwitch.addEventListener("click", toggleNightMode);

});

function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(JSON.parse(this.responseText));
    } else {
      console.error("Error with GET, url: " + url);
    }
  }
  xhr.send();
}

function hideElem(element) {
  element.classList.toggle("hidden");
}

function toggleNightMode() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(function(card) {
    card.classList.toggle("blue-grey");
    card.classList.toggle("white-text");
  });
  document.body.classList.toggle("dark");
}

function inArr(item, arr) {
  arr.forEach(function(entry) {
    if (item == entry) {
      return true;
    }
  });
  return false;
}
