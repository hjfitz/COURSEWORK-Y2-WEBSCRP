function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(JSON.parse(this.responseText));
    } else {
      console.error("Error with GET, url: " + url);
    }
  }
  xhr.send();
}
