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
  let notChange = document.querySelectorAll('.not-dark')
  cards.forEach(card => {
    card.classList.toggle('blue-grey')
    card.classList.toggle('white-text')
  })
  notChange.forEach(item => {
    item.classList.toggle('black-text')
  })
  document.body.classList.toggle('dark')
  Materialize.toast('Night mode toggled!', 3000)
}

// probably a *SIGNIFICANTLY* better way to do this
randomColor = function(col="rand") {
  let letters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','E']
  let color = ''
  if (col == "rand") {
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)]
    }
    return '#' + color
  } else if (col == "blue") {
    for (let i = 0; i < 4; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)]
    }
    return '#' + color + "ff";
  } else if (col == "red") {
    for (let i = 0; i < 4; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)]
    }
    return '#ff' + color
  } else if (col == "green") {
      for (let i = 0; i < 2; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)]
      }
      color += "ff"
      for (let i = 0; i < 2; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)]
      }
      return '#' + color
    }
}
