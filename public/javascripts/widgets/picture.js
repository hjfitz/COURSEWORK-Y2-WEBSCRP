

const
  apodUrl                = "https://api.nasa.gov/planetary/apod?api_key=zx2CHmoKEkOZl6YgpETGlgfjAvIcySy75iRMZMD3",
  pictureOverlay         = document.getElementById('black-overlay-reddit'),
  pictureSettings        = document.getElementById('picture-settings'),
  pictureSetButton       = document.getElementById('set-pic'),
  pictureInput           = document.getElementById('pic-custom')
;

//add event listeenrs
pictureOverlay.addEventListener('click', togglePictureSettings)
pictureSetButton.addEventListener('click', setPicture)

//invoked when the options box is up, and items have been selected from the dropdown.
function setPicture() {
  //get the inputs
  let customInput = $('#pic-custom').val()
  let selectInput = $('#pic-select').val()
  //if there's been a custom subreddit, use that. warn the user
  let newSub = customInput || selectInput
  if (newSub == customInput) Materialize.toast("Warning, this could lead to unexpected behaviour!",3000)
  console.log(newSub)
  //pass this to the server via PATCH
  let body = { 'subreddit': newSub }
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/reddit',
    data: body,
    success: data => {
      window.localStorage.setItem('picture_preferences', JSON.stringify(body))
    },
    error: console.error
  })
  togglePictureSettings()

  if (!('picture_preferences' in window.localStorage)) {
    Util.getJSON('/api/configuration/reddit', data => {
      window.localStorage.setItem('picture_preferences', JSON.stringify(data))
      getRedditPic(data.subreddit)
    })
  } else {
    let subredditFromLocalStor = window.localStorage.getItem('picture_preferences')
    let subreddit              = JSON.parse(subredditFromLocalStor).subreddit
    console.log(subreddit)
    getRedditPic(subreddit)
  }
}

//hide or show the settings, depending on whether they're hidden or not.
function togglePictureSettings() {
  pictureOverlay.classList.toggle('hide')
  pictureSettings.classList.toggle('hide')
}



function getPicture() {
  //if there's no preferences, GET from server and save. get the picture with that.
  //otherwise, get preferences from LS and get the image with that
  if (!('picture_preferences' in window.localStorage)) {
    Util.getJSON('/api/configuration/reddit', data => {
      window.localStorage.setItem('picture_preferences', JSON.stringify(data))
      getRedditPic(data.subreddit)
    })
  } else {
    let subredditFromLocalStor = window.localStorage.getItem('picture_preferences')
    let subreddit              = JSON.parse(subredditFromLocalStor).subreddit
    console.log(subreddit)
    getRedditPic(subreddit)
  }
}

function getRedditPic(subreddit) {
  console.log(subreddit)
  let redditUrl = "https://www.reddit.com/r/" + subreddit + "/top/.json"
  Util.getJSON(redditUrl, data => {
    //random number for entry - constant length 25 thanks to reddit api
    let randomPost = (Math.random() * 24).toFixed()
    let picList = data.data.children
    let currentPost = picList[randomPost]
    let notImage = true
    //loop through all images until we've got a valid one - see RegEx in notImage
    //continue to pick a random image
    let count = 0
    while (notImage && count < 50) {
      count++
      randomPost = (Math.random() * 24).toFixed()
      currentPost = picList[randomPost]
      try {
        let postUrl = "http://www.reddit.com" + currentPost.data.permalink;
        let imgUrl = currentPost.data.url;
        notImage = (imgUrl.match(/\.(jpeg|jpg|gif|png)$/) == null)
      } catch (err) {
        //catch the error so that the dashboard doesn't halt.
        console.warn(err)
      }
    }
    let picData = {
      alt: currentPost.data.title,
      src: currentPost.data.url,
      title: currentPost.data.title,
      href: "https://www.reddit.com" + currentPost.data.permalink
    }
    //stick the image in the card.
    putPicInCard(picData)
  })
}

//unused, not enough time. gets the astronomy picture of the day and puts it the card.
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

//get and change the corresponding elements.
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
