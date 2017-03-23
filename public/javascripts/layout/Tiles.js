//TODO use the tilesAcross and tilesDown to configure the layout
class Tiles {
  constructor(area, tileColor, tiles) {
    this.selectedArea    = []
    this.tilesOnPage     = []
    this.columns         = []
    this.selectedTiles   = []
    this.tilesAcross     = tiles.across
    this.tilesDown       = tiles.down
    this.tileColor       = tileColor
    this.secondaryColor  = '#7986CB'
    this.drawArea        = area
    this.pageInfo = {
      'topBuffer': document.querySelector('nav').offsetHeight,
      'winWidth': document.documentElement.clientWidth,
      'winHeight': document.documentElement.clientHeight - (document.querySelector('nav').offsetHeight),
      'maxWidth': Math.floor(document.documentElement.clientWidth/this.tilesAcross),
      'maxHeight': Math.floor(document.documentElement.clientHeight/this.tilesDown)
    }
  }

  createTiles() {
    let row = 0
    for (let j=this.pageInfo.topBuffer; j<=(this.pageInfo.winHeight + this.pageInfo.maxHeight); j+= this.pageInfo.maxHeight) {
      let col = 0
      let rowList = []
      for (let i=0; i< (this.pageInfo.winWidth - this.pageInfo.maxWidth); i += this.pageInfo.maxWidth) {
        let index = { "row": row, "col": col }
        let div = document.createElement('div')
        div.style.position = "absolute",
        div.style.backgroundColor = this.tileColor
        div.style.height = this.pageInfo.maxHeight + "px"
        div.style.width = this.pageInfo.maxWidth + "px"
        div.style.top = j + "px"
        div.style.left = i + "px"
        div.style.border = "2px solid #000"
        div.classList = "option-button"
        div.dataset.index = JSON.stringify(index)
        div.dataset.clicked = "false"
        div.addEventListener('click', changeOpacity)
        this.drawArea.appendChild(div)
        rowList.push(div)
        this.tilesOnPage.push(div)
        col++
      }
      this.columns.push(rowList)
      row++
    }
  }

  toggleTiles() {
    for (const tile of this.tilesOnPage) {
      tile.classList.toggle('hide')
    }
  }

  resetTiles() {
    for (const tile of this.tilesOnPage) {
      tile.style.backgroundColor = this.tileColor
      tile.style.opacity = null
    }
  }

  highlight() {
    this.resetTiles()
    this.selectedArea.length = 0
    if (this.selectedTiles[0] !== this.selectedTiles[1]) {
      let locationStart = JSON.parse(this.selectedTiles[0].dataset.index)
      let locationEnd = JSON.parse(this.selectedTiles[1].dataset.index)
      var startX,startY,endX,endY
      //check to see which tile is highest up
      if (locationStart.row <= locationEnd.row) {
         startX = locationStart.row
         endX = locationEnd.row
      } else {
        startX = locationEnd.row
        endX = locationStart.row
      }
      if (locationStart.col <= locationEnd.col) {
        startY = locationStart.col
        endY = locationEnd.col
      } else {
        startY = locationEnd.col
        endY = locationStart.col
      }
      let colour = ['red','green'][Util.randomNumber(2)]
      for (let i = startX; i <= endX; i++) {
        let curRow = this.columns[i]
        for (let j = startY; j <= endY; j++) {

          curRow[j].style.backgroundColor = Util.randomColor(colour)
          curRow[j].style.opacity = "1"
        }
      }
      this.selectedArea.push(this.selectedTiles[0])
      this.selectedArea.push(this.selectedTiles[1])
    } else {
      this.selectedTiles[0].style.opacity = null
    }
    this.selectedTiles.length = 0 //reset the array
  }

}
