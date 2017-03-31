const saveBtn = document.getElementById('save-weather')
//give a default value for the center - UoP
let
  mapCenter = {lat: 50.7886994, lng: -1.0750918},
  markers = [];

saveBtn.addEventListener('click', save)

function save() {
  let curLoc = markers[0].position //we assume that there's always only one marker
  //get the lat and long of  the marker, to save to LS and send to the server for backup
  let location = {
    'lat': curLoc.lat(),
    'lon': curLoc.lng()
  }
  setLocation(curLoc)
  let saveLoc = JSON.stringify(location)
  localStorage.setItem('location_preferences', saveLoc)
}

function setLocation(location) {
  let loc = {
    "lat":location.lat(),
    "lon": location.lng()
  }
  //PATCH to the server - we aren't creating anything new.
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/location',
    data: loc,
    success: data => {
      Materialize.toast("Location Saved!", 3000)
    },
    error: console.warn
  })
}

function initMap() {
  //we get a big error if we don't check if the map is hidden, on page load.
  //this is because, when the gAPI for maps loads, it automagically invoked initMap
  //which then looks for #map on the screen, when it tries to create the new google.maps.map
  //but, we hide this on page load. meaning there's no #map, therefore causing gAPI to throw an error
  //this check keeps the console clean!
  if (!mapHidden) {
    //if we say where we are, set the center to that!
    if ("location_preferences" in window.localStorage) {
      let prefPosition = JSON.parse(window.localStorage.getItem('location_preferences'))
      mapCenter = { "lat": parseFloat(prefPosition.lat), "lng": parseFloat(prefPosition.lon) }
    }
    //create a map
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: mapCenter
      });
      const marker = new google.maps.Marker({
        position: mapCenter,
        map: map
      })
      markers.push(marker)

      //add a new tack and remove the old one.
    google.maps.event.addListener(map, 'click', (ev) => {
      clearMarkers()
      console.log(ev)
      placeMarker(ev.latLng)
    })

    //place our new marker
    function placeMarker(location) {
      let marker = new google.maps.Marker({
        position: location,
        map: map
      })
      markers.push(marker)
    }

    //remove the markers from the map and set the length to 0
    function clearMarkers() {
      for (const marker of markers) {
        marker.setMap(null)
      }
      markers.length = 0
    }
  }
}
