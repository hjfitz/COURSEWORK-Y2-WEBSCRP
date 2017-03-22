/**
* news.js - pulls from news APIs to display on the main page.
* Given a configuration item, different sources may be configured.
*
* Current ideas:
** ycombinator
** BBC news
** NOT /r/news
*/

const NEWSAPIKEY = "&apiKey=7ebe193132874eb7980037010dc43400";
const newsApiUrl = " https://newsapi.org/v1/articles?source=";
let source = "bbc-news";
let sources = ['bbc-news', 'ars-technica', 'national-geographic']
const NEWSAPISORT = "&sortBy=latest";
const curSource = sources[(Math.random() * 2).toFixed(0)]
// let curSource = source
console.log(curSource)
const NEWSAPIGET = newsApiUrl + curSource  + NEWSAPIKEY;

function getNewNews() {
  Util.getJSON(NEWSAPIGET, (data) => {
    let newsInfo = {
      "newsPic": data.articles[0].urlToImage,
      "desc": data.articles[0].description,
      "title": data.articles[0].title,
      "url": data.articles[0].url
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
