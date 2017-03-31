const
  newsApiKey          = "&apiKey=7ebe193132874eb7980037010dc43400",
  newsApiUrl          = "https://newsapi.org/v1/articles?source=",
  NewsApiSort         = "&sortBy=latest",
  sources             = ['bbc-news', 'ars-technica', 'national-geographic'],
  selSource           = Math.floor(Math.random() * 3)
;
let
  //set a random source if we don't have one. create the url and get our elements
  curSource           = window.localStorage.getItem('news-source') || sources[selSource],
  NEWSAPIGET          = newsApiUrl + curSource  + newsApiKey,
  newsSettingsBox     = document.getElementById('news-settings'),
  newsSettingsOverlay = document.getElementById('black-overlay-news'),
  newsButton          = document.getElementById('set-news')
;

//add event listeners
newsButton.addEventListener('click', setNews)
newsSettingsOverlay.addEventListener('click', newsSettings)

function newsSettings() {
  //hide or show the overlay and the container
  newsSettingsOverlay.classList.toggle('hide')
  newsSettingsBox.classList.toggle('hide')
}

// save the news options. get a value from the select and set localStorage. recreate the newsapi url.
//send the news to the api, put new news in the card and hide the box.
function setNews() {
  let source = $('#news-select').val()
  window.localStorage.setItem('news-source', source)
  curSource = source
  NEWSAPIGET = newsApiUrl + curSource  + newsApiKey
  if (source === null) {
    Materialize.toast('Please pick a source from the dropdown!', 3000)
  } else {
    newsSettings()
    getNewNews()
    sendNews(source)
  }
}


//PATCH the new news source to the api
function sendNews(source) {
  let body = { 'provider': source }
  $.ajax({
    type: "PATCH",
    url: '/api/configuration/news',
    data: body,
    success: console.log,
    error: console.error
  })
}

//get the news artivles, and from that, pick a random article. put this stuff in the card.
function getNewNews() {
  let randArticle = Math.floor(Math.random() * 9)
  console.log(NEWSAPIGET)
  Util.getJSON(NEWSAPIGET, data => {
    let newsInfo = {
      "newsPic": data.articles[randArticle].urlToImage,
      "desc": data.articles[randArticle].description,
      "title": data.articles[randArticle].title,
      "url": data.articles[randArticle].url
    }
    putNewsInCard(newsInfo);
  })
}

//set attributes corresponding to those in the json object passed.
function putNewsInCard(news) {
  let
    newsCard    = document.getElementById("news-content"),
    newsDesc    = document.getElementById('news-text'),
    newsTitle   = document.getElementById("news-title"),
    newsImage   = document.getElementById("news-image"),
    newsPicLink = document.getElementById("news-image-link")
  ;

  newsPicLink.href      = news.url
  newsImage.src         = news.newsPic
  newsTitle.textContent = news.title
  newsDesc.textContent = news.desc
}
