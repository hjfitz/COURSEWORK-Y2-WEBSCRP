const
  newsApiKey          = "&apiKey=7ebe193132874eb7980037010dc43400",
  newsApiUrl          = " https://newsapi.org/v1/articles?source=",
  NewsApiSort         = "&sortBy=latest",
  sources             = ['bbc-news', 'ars-technica', 'national-geographic'],
  selSource           = Math.floor(Math.random() * 3) ,
  curSource           = window.localStorage.getItem('news-source') || sources[selSource],
  NEWSAPIGET          = newsApiUrl + curSource  + newsApiKey,
  newsSettingsBox     = document.getElementById('news-settings'),
  newsSettingsOverlay = document.getElementById('black-overlay-news'),
  newsSettingsContent = document.getElementById('news-content'),
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
  if (source === null) {
    Materialize.toast('Please pick a source from the dropdown!', 3000)
  } else {
    window.localStorage.setItem('news-source', source)
    newsSettings()
  }
}


function getNewNews() {
  let randArticle = Math.floor(Math.random() * 9)
  Util.getJSON(NEWSAPIGET, data => {
    let newsInfo = {
      "newsPic": data.articles[randArticle].urlToImage,
      "desc": data.articles[randArticle].description,
      "title": data.articles[randArticle].title,
      "url": data.articles[randArticle].url
    };
    putNewsInCard(newsInfo);
  });
}

function putNewsInCard(news) {
  let newsCard    = document.getElementById("news-content");
  let newsLink    = document.getElementById("news-link");
  let newsTitle   = document.getElementById("news-title");
  let newsImage   = document.getElementById("news-image");
  let newsPicLink = document.getElementById("news-image-link");
  let desc        = document.createElement("p");

  newsPicLink.href      = news.url;
  newsImage.src         = news.newsPic;
  newsLink.href         = news.url;
  newsTitle.textContent = news.title;
  desc.textContent      = news.desc;

  newsCard.appendChild(desc);
}
