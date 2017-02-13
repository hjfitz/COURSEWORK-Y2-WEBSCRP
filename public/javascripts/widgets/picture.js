const APODAPIKEY = "https://api.nasa.gov/planetary/apod?api_key=zx2CHmoKEkOZl6YgpETGlgfjAvIcySy75iRMZMD3";
let subreddit = "aww";
let allowedHosts = ["i.redd.it", "i.imgur.com"];//, "i.reddiuploads.com"];
let allowedExtensions = ['png']
const REDDITURL = "http://www.reddit.com/r/" + subreddit + "/top/.json";

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
    let notImage = true;
    let numChecks = 0; //max bound of 25
    let picList = data.data.children;
    var currentPost = picList[randomPost];
    while (notImage && 25 < numChecks)
      {
        currentPost = picList[randomPost];
        if ($.inArray(currentPost.data.domain, allowedHosts) !== -1) {
          notImage = false;
        }
        // numChecks++;

      //check if correct domain - imgur or i.reddit.
      //ensure it's png/jpg/jpeg - mimetype?
      //then embed!
      }
      console.log(randomPost);
    console.log(picList);
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
