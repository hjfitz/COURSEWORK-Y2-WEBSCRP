/* * * * * */
/* C A R D */
/* * * * * */


class Card {
  constructor(cardName, extras={}, cardImage='images/loading.png') {
    this.card = document.createElement('div')
    this.cardName = cardName
    this.cardImage = cardImage
    if (extras) {
      this.button = extras.button
      this.settings = extras.settings
      this.image = extras.image
    }
    this.extras = extras
    this.createCard()
  }

  getCard() {
    return this.card
  }

  createCard() {
    //create the main card
    this.card.id = this.cardName + "-card"
    this.card.classList = 'card'

    let content = document.createElement('div')
    content.id = this.cardName + "-content"
    content.classList = "card-content"

    let text = document.createElement('p')
    text.id = this.cardName + '-text'

    let title = document.createElement('span')
    title.id = this.cardName + "-title"
    if ("truncateTitle" in this.extras) {
      title.classList = "card-title truncate"
    } else {
      title.classList = "card-title"
    }
    title.textContent = this.cardName

    let imageContainer, image, imageLink

    if (this.image) {
      imageContainer = document.createElement('div')
      imageContainer.classList = 'card-image'
      imageLink = document.createElement('a')
      imageLink.id = this.cardName + '-image-link'
      imageLink.href = '#'
      image = document.createElement('img')
      image.id = this.cardName + '-image'
      image.src = this.cardImage
      imageLink.appendChild(image)
      imageContainer.appendChild(imageLink)
      this.card.appendChild(imageContainer)
    }

    this.card.appendChild(content)

    if (this.button) {
      let action = document.createElement('div')
      action.classList = 'card-action'
      let link = document.createElement('a')
      link.id = this.cardName + '-link'
      link.href = '#'
      link.textContent = 'Link'
      action.appendChild(link)
      this.card.appendChild(action)
    }



    content.appendChild(title)
    content.appendChild(text)

  }

  addSettings(action) {
    let settingsIcon = document.createElement('i')
    settingsIcon.id = this.cardName + 'setting-icon'
    settingsIcon.classList = 'material-icons setting-icon'
    settingsIcon.dataset.widget = this.cardName + '-card'
    settingsIcon.textContent = 'settings'
    this.card.appendChild(settingsIcon)
    settingsIcon.addEventListener('click', action)
  }

  addCard(appendingArea) {
    appendingArea.appendChild(this.card)
  }
}
