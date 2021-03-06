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
    this.tilesVisible = true
    let row = 0
    //loop from the buffer added by the navbar to the height of the page. with each loop, we loop from the left to the right.
    //steps in the loop are defined as the width and height of tiles we wish to add. those are calculated by
    //dividing by the height and width of the page by the values given in the constructor.
    //on each of the internal (column) loops, we add the tile created in to a list. when that loop terminates, we add the list to another list.
    //we then add that list to a variable created in the constructor
    //we increment the row and col values on their respective loops. this is stored in a dataset for easy access later on.
    // with each loop, we create a div with calculated height, width, top and left values. event listeners are added.
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
    //set visible to true
    if (this.tilesVisible == true) {
      this.tilesVisible = false
    } else {
      this.tilesVisible = true
    }
    //add a class to EVERY tile, causing it to hide.
    for (const tile of this.tilesOnPage) {
      tile.classList.toggle('hide')
    }
  }

  //set the background color of each tile to the default one defined earlier.
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
      //access the dataset defined earlier
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
      //find the furthest left
      if (locationStart.col <= locationEnd.col) {
        startY = locationStart.col
        endY = locationEnd.col
      } else {
        startY = locationEnd.col
        endY = locationStart.col
      }
      //now that the closest to the bottom, top, left and right have been defined,
      //we use their dataset values defined earlier to iterate through the 2d array of tiles, changing their coloue
      //pick a random colour for getRandomColor
      let colour = ['red','green'][Util.randomNumber(2)]
      for (let i = startX; i <= endX; i++) {
        let curRow = this.columns[i]
        for (let j = startY; j <= endY; j++) {
          //fill the tiles with color!
          curRow[j].style.backgroundColor = Util.randomColor(colour)
          curRow[j].style.opacity = "1"
        }
      }

      //define the area to stick the card in
      this.selectedArea.push(this.selectedTiles[0])
      this.selectedArea.push(this.selectedTiles[1])
    } else {
      this.selectedTiles[0].style.opacity = null
    }
    this.selectedTiles.length = 0 //reset the array
  }

}
