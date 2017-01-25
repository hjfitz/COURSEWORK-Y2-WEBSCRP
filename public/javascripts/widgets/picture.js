const APODAPIKEY = "https://api.nasa.gov/planetary/apod?api_key=zx2CHmoKEkOZl6YgpETGlgfjAvIcySy75iRMZMD3";
let subreddit = "earthporn";
const REDDITURL = "https://www.reddit.com/r/" + subreddit + "/top/.json";

function getRedditPic() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', REDDITURL, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      let picData = {};
      data = JSON.parse(xhr.responseText);
      picData.alt  = data.data.children[0].data.title;
      picData.src  = data.data.children[0].data.preview.images[0].source.url;
      picData.title = data.data.children[0].data.title;
      picData.href = "https://reddit.com" + data.data.children[0].data.permalink;
      putPicInCard(picData);
    } else {
      console.error("REDDIT IS KILL");
    }
  }
  xhr.send();
}

function getAPOD() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', APODAPIKEY, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      let picData = {};
      data = JSON.parse(xhr.responseText);
      picData.alt = data.explanation;
      picData.src = data.url;
      picData.title = data.title;
      picData.href = picData.src;
      putPicInCard(picData);
    } else {
      console.error("NASA IS KILL");
    }
  }
  xhr.send();
}

function putPicInCard(picData) {
  let img = document.getElementById("pic-image");
  let p = document.getElementById("pic-text");
  let a = document.getElementById("pic-link");
  img.src = picData.src;
  img.title = picData.alt;
  img.alt = picData.alt;
  a.href = picData.href;
  p.textContent = picData.title;
}
