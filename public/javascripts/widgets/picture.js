let
  subreddit,
  subredditFromLocalStor;

// if (!('picture_preferences' in window.localStorage)) {
//   Util.getJSON('/api/configuration/reddit', data => {
//     window.localStorage.setItem('picture_preferences', JSON.stringify(data))
//     subreddit = data.subreddit
//   })
// } else {
//   subredditFromLocalStor = window.localStorage.getItem('picture_preferences'),
//   subreddit              = JSON.parse(subredditFromLocalStor).subreddit;
// }

const
  apodUrl                = "https://api.nasa.gov/planetary/apod?api_key=zx2CHmoKEkOZl6YgpETGlgfjAvIcySy75iRMZMD3",
  // redditUrl              = "https://www.reddit.com/r/" + subreddit + "/top/.json",
  pictureOverlay         = document.getElementById('black-overlay-reddit'),
  pictureSettings        = document.getElementById('picture-settings'),
  pictureSetButton       = document.getElementById('set-pic'),
  pictureInput           = document.getElementById('pic-custom')
;

pictureOverlay.addEventListener('click', togglePictureSettings)
pictureSetButton.addEventListener('click', setPicture)

function setPicture() {
  let customInput = $('#pic-custom').val()
  let selectInput = $('#pic-select').val()
  let newSub = customInput || selectInput
  if (newSub == customInput) Materialize.toast("Warning, this could lead to unexpected behaviour!",3000)
  console.log(newSub)
//add a check for APOD
  let body = { 'subreddit': newSub }
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/reddit',
    data: body,
    success: data => {
      console.log(data)
      window.localStorage.setItem('picture_preferences', JSON.stringify(body))
    },
    error: console.error
  })
  togglePictureSettings()
  getRedditPic()
}

function togglePictureSettings() {
  pictureOverlay.classList.toggle('hide')
  pictureSettings.classList.toggle('hide')
}

//TODO IMPORTANT innit fam
//allow subreddit as parameter, can therefore call with our checks, thus removing the error thrown.
function getRedditPic(subreddit) {
  let redditUrl = "https://www.reddit.com/r/" + subreddit + "/top/.json"
  console.log(subreddit)
  console.log(redditUrl)
  Util.getJSON(redditUrl, data => {
    //random number for entry - constant length 25 thanks to reddit api
    let randomPost = (Math.random() * 25).toFixed(0);
    let numChecks = 0; //max bound of 25
    let picList = data.data.children;
    let currentPost = picList[randomPost];
    let notImage = true;
    while (notImage) {
      randomPost = (Math.random() * 25).toFixed(0);
      currentPost = picList[randomPost];
      try {
        let postUrl = "http://www.reddit.com" + currentPost.data.permalink;
        let imgUrl = currentPost.data.url;
        notImage = (imgUrl.match(/\.(jpeg|jpg|gif|png)$/) == null)
      } catch (err) {
        console.warn(err)
      }
    }
    let picData = {
      alt: currentPost.data.title,
      src: currentPost.data.url,
      title: currentPost.data.title,
      href: "https://www.reddit.com" + currentPost.data.permalink
    }
    putPicInCard(picData)
  })
}

function getAPOD() {
  Util.getJSON(APODAPIKEY, data => {
    let picData = {
      alt: data.explanation,
      src: data.url,
      title: data.title,
      href: data.url
    };
    putPicInCard(picData);
  });
}

//maybe change add callback then run the parser (random choice?)
function putPicInCard(picData) {
  let img = document.getElementById("pic-image")
  let p = document.getElementById("pic-title")
  let para = document.getElementById('pic-text')
  let a = document.getElementById("pic-image-link")
  para.textContent = picData.title
  img.src = picData.src
  img.title = picData.alt
  img.alt = picData.alt
  a.href = picData.href
  p.textContent = picData.title
}
