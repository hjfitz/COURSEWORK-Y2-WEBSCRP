const
  newsApiKey          = "&apiKey=7ebe193132874eb7980037010dc43400",
  newsApiUrl          = " https://newsapi.org/v1/articles?source=",
  NewsApiSort         = "&sortBy=latest",
  sources             = ['bbc-news', 'ars-technica', 'national-geographic'],
  selSource           = Math.floor(Math.random() * 3)
;
let
  curSource           = window.localStorage.getItem('news-source') || sources[selSource],
  NEWSAPIGET          = newsApiUrl + curSource  + newsApiKey,
  newsSettingsBox     = document.getElementById('news-settings'),
  newsSettingsOverlay = document.getElementById('black-overlay-news'),
  newsButton          = document.getElementById('set-news')
;

newsButton.addEventListener('click', setNews)
newsSettingsOverlay.addEventListener('click', newsSettings)

function newsSettings() {
  newsSettingsOverlay.classList.toggle('hide')
  newsSettingsBox.classList.toggle('hide')
}

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
