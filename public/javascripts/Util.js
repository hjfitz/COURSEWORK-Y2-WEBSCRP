/* * * * * * * * * * * * * * * * * * */
/* U T I L I T Y   F U N C T I O N S */
/* * * * * * * * * * * * * * * * * * */

class Util {
  static getJSON(url, callback) {
    console.log("getjson called: " + url)
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

  static hideElem(element) {
    element.classList.toggle('hidden')
  }

  static randomNumber(max) {
      return Math.floor(Math.random() * max)
  }

  // probably a *SIGNIFICANTLY* better way to do this
  static randomColor(col="rand") {
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

  static toggleNightMode() {
    let cards = document.querySelectorAll('.card')
    let notChange = document.querySelectorAll('.not-dark, select')
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
}
