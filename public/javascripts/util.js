/* * * * * * * * * * * * * * * * * * */
/* U T I L I T Y   F U N C T I O N S */
/* * * * * * * * * * * * * * * * * * */

function getJSON(url, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(JSON.parse(this.responseText))
    } else {
      console.error('Error with GET, url: ' + url)
    }
  }
  xhr.send()
}

/**
 * Sets a given element to not show on the page
 * @param element the element to hide
 */
function hideElem(element) {
  element.classList.toggle('hidden')
}

function toggleNightMode() {
  let cards = document.querySelectorAll('.card')
  cards.forEach(function(card) {
    card.classList.toggle('blue-grey')
    card.classList.toggle('white-text')
  })
  document.body.classList.toggle('dark')
}
