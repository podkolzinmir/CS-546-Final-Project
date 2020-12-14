const express = require('express');
const router = express.Router();
const news = require('gnews');
const data = require("../data");
const keywordb = data.keywords;
const articlesdb = require("../data/articles");

var AYLIENTextAPI = require('aylien_textapi');
    var textapi = new AYLIENTextAPI({
    application_id: "YOUR_APP_ID",
    application_key: "YOUR_APP_KEY"
    });

let num = 0

const getarticles = async (keyword) => {
  const starship = await news.search(keyword,{n : num});
  
  return starship;
  // for (let article of starship) {
  //     console.log(article.pubDate + ' | ' + article.title + ' | ' + article.link + ' | ' + 'Tech');
  // }
};

router.get("/", async function (req, res) {
    // console.log(req.session.user,"I'm inside home route!!")
    let interests = req.session.user.interests;
    let articles=[];

    if (interests.length < 4){num = 5};
    if (interests.length >=4){num = 3};

    // if(!interests || interests == null){

    //   const ArticleData = await getarticles();
    //   ArticleData.forEach(v => {v.keyword = interests[item];});
    //   ArticleData.forEach(elements => articles.push(elements) );

    // }
    
    
    for(let item in interests){
      
      const ArticleData = await getarticles(interests[item]);
      ArticleData.forEach(v => {v.keyword = interests[item];});
      ArticleData.forEach(elements => articles.push(elements) );
    }
    console.log(articles)
    for (const i of articles)
    {
      let checkarticle = await articlesdb.getByUrl(i.link);
      if (!checkarticle){
        await articlesdb.create(i.link,[i.keyword], i.title,i.pubDate);
      }
    }
    res.render("differentPages/homePage",{articles: articles, interests_length: interests.length});
  });

router.get("/userprofile", async function(req, res){
  res.render("differentPages/EditProfile",{user:req.session.user});
});
  module.exports = router