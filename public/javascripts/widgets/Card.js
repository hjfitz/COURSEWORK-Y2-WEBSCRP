/* * * * * */
/* C A R D */
/* * * * * */

/*
 * class-wrapper for materialize cards
 * upon creating an object of class Card, an element is instantly created;
 * this may be put on the page with Card().addCard()
 * the basic card has a text area, a title and a content area.
 * they are follow the convention of cardName-text, cardName-title and cardName-content.
 * (where cardName is the first argument you pass the constructor)
 * There are 3 main methods.
      getCard - returning the card created
      addCard - appends the card to an element (passed as a parameter)
      addSettings - creates a spanner icon, and adds an event listener for a click on to it.
                    this click invokes the function passed as a parameter
 */

class Card {
  constructor(cardName, extras={}, cardImage='images/loading.gif') {
    //create our element for the card. create the card when the object is constructed.
    this.card = document.createElement('div')
    this.cardName = cardName
    this.cardImage = cardImage
    this.extras = extras
    this.createCard()
  }

  getCard() {
    return this.card
  }

  //create a card using materialie classes.
  //each card has a content area and title
  //paragraph, image area and link button are optional and must be specified in the constructor.
  createCard() {
    //create the main card
    this.card.id = this.cardName + "-card"
    this.card.classList = 'card'

    let content = document.createElement('div')
    content.id = this.cardName + "-content"
    content.classList = "card-content"

    let text = document.createElement('p')
    text.id = this.cardName + '-text'
    text.textContent = this.cardName

    let title = document.createElement('span')
    title.id = this.cardName + "-title"
    if ("truncateTitle" in this.extras) {
      title.classList = "card-title truncate"
    } else {
      title.classList = "card-title"
    }
    title.textContent = this.cardName

    let imageContainer, image, imageLink

    if (this.extras.image) {
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

    if (this.extras.button) {
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


    if (this.extras.text) {
      content.appendChild(text)
    }


  }

  //optional settings for the card. a function is passed, so we can add an event listener.
  //we create a spanner icon and with css, put it in the top left. the function passed is the action of the event listener
  addSettings(action) {
    let settingsIcon            = document.createElement('i')
    settingsIcon.id             = this.cardName + ' setting-icon'
    settingsIcon.classList      = 'material-icons setting-icon'
    settingsIcon.dataset.widget = this.cardName + '-card'
    settingsIcon.textContent    = 'settings'
    this.card.appendChild(settingsIcon)
    settingsIcon.addEventListener('click', action)
  }

  addCard(appendingArea) {
    appendingArea.appendChild(this.card)
  }
}
