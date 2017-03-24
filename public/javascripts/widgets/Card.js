//extras concept, list of JSON for extra internal content
// [
//   {
//     name: "icon",
//     type: 'img',
//     classList: 'icon right',
//     style: {
//       left: '100px',
//       right: '30px'
//     }
//   },
//   {
//     name: 'settings',
//     type: 'p'
//   }
// ]

/* * * * * */
/* C A R D */
/* * * * * */


class Card {
  constructor(cardName, cardText, settingsMethod, extras, allowImage=false, cardImage=null) {
    this.cardName = cardName
    this.image = allowImage
    this.settings = settingsMethod
    this.cardText = cardText
    this.cardImage = () => {
      if (allowImage && cardImage) {
        return cardImage
      } else {
        return null
      }
    }
    this.cardElements = {
      'body': null,
      'contentArea': null,
      'title': null,
      'image': null
    }
  }

  createCard(appendingArea) {
    //create the main card
    let card = document.createElement('div')
    card.id = this.cardName + "-card"
    card.classList = 'card'

    let content = document.createElement('div')
    content.id = this.cardName + "-content"
    content.classList = "card-content"

    let title = document.createElement('span')
    title.id = this.cardName + "-title"
    title.classList = "card-title"

    let settingsIcon = document.createElement('i')
    settingsIcon.id = this.cardName + 'setting-icon'
    settingsIcon.classList = 'material-icons setting-icon'
    settingsIcon.dataset.widget = this.cardName + '-card'
    settingsIcon.textContent = 'settings'

    let image
    if (this.image) {
      image = document.createElement('img')
      image.id = this.cardName + '-image'
      image.src = this.cardImage
    }

    let text = document.createElement('p')
    text.id =
  }

  setTitle() {

  }

  set
}
