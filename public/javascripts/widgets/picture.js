const APODAPIKEY = "https://api.nasa.gov/planetary/apod?api_key=zx2CHmoKEkOZl6YgpETGlgfjAvIcySy75iRMZMD3";
let subreddit = "funny";
const REDDITURL = "https://www.reddit.com/r/" + subreddit + "/top/.json";

function getAPOD() {
  getJSON(APODAPIKEY, function(data) {
    let picData = {
      alt: data.explanation,
      src: data.url,
      title: data.title,
      href: data.url
    };
    putPicInCard(picData);
  });
}

//TODO fri 03 feb
function getRedditPic() {
  getJSON(REDDITURL, function(data) {
    //random number for entry - constant length 25 thanks to reddit api
    let randomPost = (Math.random() * 25).toFixed(0);
    let numChecks = 0; //max bound of 25
    let picList = data.data.children;
    let currentPost = picList[randomPost];
    let notImage = true;
    while (notImage) {
      randomPost = (Math.random() * 25).toFixed(0);
      currentPost = picList[randomPost];
      let postUrl = "http://www.reddit.com" + currentPost.data.permalink;
      let imgUrl = currentPost.data.url;


      console.log(currentPost.data.url);
      console.log(imgUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
      if (imgUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        notImage = false;
      }
    }

    let picData = {
      alt: currentPost.data.title,
      src: currentPost.data.url,
      title: currentPost.data.title,
      href: "https://www.reddit.com" + currentPost.data.permalink
    };
    putPicInCard(picData);
  });
}

//maybe change add callback then run the parser (random choice?)
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
