const
  loc = document.getElementById('location'),
  saveBtn = document.getElementById('save'),
  portsmouth = {lat: 50.7886994, lng: -1.0750918}
  markers = []
;

saveBtn.addEventListener('click', save)

function setLocation(latLng) {
  console.log('setLoc invoked')
  const lat = latLng.lat()
  const lng = latLng.lng()
  let sentence = "Latitude: " + lat.toFixed(2) + " Longitude: " + lng.toFixed(2)
  console.log("setLocaiton invoked")
  Materialize.toast("location set :" + sentence, 3000)

  // loc.textContent = sentence
}

function save() {
  let curLoc = markers[0].position //we assume that there's always only one markers
  let location = {
    'lat': curLoc.lat(),
    'lon': curLoc.lng()
  }
  setLocation(curLoc)
  let saveLoc = JSON.stringify(location)
  localStorage.setItem('location', saveLoc)
  console.log(markers)
  console.log('saved!')
  console.log(location)
  console.log(localStorage.location)
}

function initMap() {
  const loc = document.getElementById('location')
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: portsmouth
    })
    const marker = new google.maps.Marker({
      position: portsmouth,
      map: map
    })
    markers.push(marker)

  google.maps.event.addListener(map, 'click', (ev) => {
    clearMarkers()
    placeMarker(ev.latLng)
    setLocation(ev.latLng)
  })

  function placeMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: map
    })
    markers.push(marker)
  }

  function clearMarkers() {
    markers.length = 0
    for (const marker of markers) {
      marker.setMap(null)
    }
  }
}
