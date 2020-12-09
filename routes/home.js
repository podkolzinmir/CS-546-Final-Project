const express = require('express');
const router = express.Router();
const news = require('gnews');

const getarticles = async (keyword) => {
  const starship = await news.search(keyword);
  
  return starship;
  // for (let article of starship) {
  //     console.log(article.pubDate + ' | ' + article.title + ' | ' + article.link + ' | ' + 'Tech');
  // }
};

router.get("/", async function (req, res) {
    // console.log(req.session.user,"I'm inside home route!!")
    let interests = req.session.user.interests;
    let articles=[];

    for(let item in interests){
      const ArticleData = await getarticles(interests[1]);
      articles = ArticleData;
    }
    res.render("differentPages/homePage",{articles: articles});
  });

router.get("/userprofile", async function(req, res){
  res.render("differentPages/EditProfile");
});
  module.exports = router