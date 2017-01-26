const APODAPIKEY = "https://api.nasa.gov/planetary/apod?api_key=zx2CHmoKEkOZl6YgpETGlgfjAvIcySy75iRMZMD3";
let subreddit = "aww";
let allowedHosts = ["imgur.com", "i.imgur.com"];
const REDDITURL = "http://www.reddit.com/r/" + subreddit + "/top/.json";
const BINGURL = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US";

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

// postponed until I get something else working
function getRedditPic() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', REDDITURL, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      let picData = {};
      let randEntry = parseInt((Math.random() * 10).toFixed(0));
      data = JSON.parse(xhr.responseText);
      let notImage = true;
      while (data.data.children[randEntry].data.preview === undefined || notImage) {
        console.error("can't unfuck");
        console.log("Random number: " + randEntry);
        if (inArr(data.data.children[randEntry].domain, allowedHosts)) {
          notImage = true;
        }
        randEntry = parseInt((Math.random() * 10).toFixed(0));
      }
      // console.log(typeof randEntry);
      // console.log(data);
      // while (typeof data.data.children[randEntry].data.preview === undefined || randEntry > 4) {
      //   randEntry = parseInt((Math.random() * 10).toFixed(0));
      // }
      picData.alt  = data.data.children[randEntry].data.title;
      picData.src  = data.data.children[randEntry].data.preview.images[0].source.url;
      console.log(picData.src);
      console.log(data.data.children[randEntry].domain);
      picData.title = data.data.children[randEntry].data.title;
      picData.href = "https://reddit.com" + data.data.children[randEntry].data.permalink;
      putPicInCard(picData);
    } else {
      console.error("REDDIT IS KILL");
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

function inArr(item, arr) {
  arr.forEach(function(entry) {
    if (item == entry) {
      return true;
    }
  });
  return false;
}
