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
  loc.textContent = sentence
}

function save() {
  let curLoc = markers[0].position //we assume that there's always only one markers
  let location = {
    'lat': curLoc.lat(),
    'lon': curLoc.lng()
  }
  setLocation(curLoc)
  let saveLoc = JSON.stringify(location)
  setLocation(location)
  localStorage.setItem('location', saveLoc)
  console.log('saved!')
}

function setLocation(location) {
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/weather',
    data: settings,
    success: console.log,
    error: console.error
  })
}

function initMap() {
  //we get a big error if we don't check if the map is hidden, on page load.
  //this is because, when the gAPI for maps loads, it automagically invoked initMap
  //which then looks for #map on the screen, when it tries to create the new google.maps.map
  //but, we hide this on page load. meaning there's no #map, therefore causing gAPI to throw an error
  //this check keeps the console clean!
  if (!mapHidden) {
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
}
