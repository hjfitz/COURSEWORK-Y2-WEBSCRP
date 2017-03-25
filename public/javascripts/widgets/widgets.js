const weatherSettingIcon = document.getElementById('weather-setting-icon')
const overlay = document.getElementById('black-overlay')
weatherSettingIcon.addEventListener('click', toggleWeatherSettings)
overlay.addEventListener('click', toggleWeatherSettings)
overlay.addEventListener('click', Weather.addToCard)
let mapHidden = true
hideMap()
function toggleWeatherSettings() {
  overlay.classList.toggle('hide')
  if (mapHidden) {
    showMap()
  } else {
    hideMap()
  }
}

function hideMap() {
  mapHidden = true
  const map = document.getElementById('map-card')
  map.parentElement.removeChild(map)
}

function showMap() {
  mapHidden = false
  //hacky, but it works.
  //setting display:none messes with the map created by google
  //setting z-index doesn't work
  const weatherArea = document.getElementById('weather-settings')
  const mapArea = document.createElement('div')
  const mapCard = document.createElement('div')
  const content = document.createElement('div')
  const locInfo = document.createElement('p')
  const locArea = document.createElement('span')
  const saveButtonPara = document.createElement('p')
  const saveButton = document.createElement('a')
  locInfo.textContent = "Your location is: "
  locArea.id = 'location'
  locInfo.appendChild(locArea)
  saveButton.href = '#'
  saveButton.id = 'save'
  saveButton.classList = 'waves-effect waves-light btn'
  saveButton.textContent = 'Save'
  content.classList = 'card-content'
  mapCard.id = 'map-card'
  mapCard.classList = 'card'
  mapArea.id = 'map'
  saveButton.addEventListener('click', save)
  saveButtonPara.appendChild(saveButton)
  weatherArea.appendChild(mapCard)
  mapCard.appendChild(content)
  content.appendChild(mapArea)
  content.appendChild(locInfo)
  content.appendChild(saveButtonPara)
  initMap()
}
