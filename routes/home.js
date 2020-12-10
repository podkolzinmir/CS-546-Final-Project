const express = require('express');
const router = express.Router();
const news = require('gnews');

var AYLIENTextAPI = require('aylien_textapi');
    var textapi = new AYLIENTextAPI({
    application_id: "YOUR_APP_ID",
    application_key: "YOUR_APP_KEY"
    });



const getarticles = async (keyword) => {
  const starship = await news.search(keyword,{n : 3});
  
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
      
      const ArticleData = await getarticles(interests[item]);
      ArticleData.forEach(elements => articles.push(elements) );
      // console.log(articles)
    }

    // console.log(articles[0])
    // textapi.summarize({
    //   url: 'https://www.wsj.com/articles/populism-and-politics-in-peru-11606081128',
    //   sentences_number: 5
    // }, function(error, response) {
    //   if (error === null) {
    //     response.sentences.forEach(function(s) {
    //       console.log(s);
    //     });
    //   }
    // });


    res.render("differentPages/homePage",{articles: articles, keyword:"Politics"});
  });

router.get("/userprofile", async function(req, res){
  res.render("differentPages/EditProfile",{user:req.session.user});
});
  module.exports = router