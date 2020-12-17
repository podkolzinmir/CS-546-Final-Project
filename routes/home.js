const express = require('express');
const router = express.Router();
const news = require('gnews');
const data = require("../data");
const keyworddb =require("../data/keywords");
const articlesdb = require("../data/articles")
const { addUrls } = require("../data/users");;
const usersdb = require("../data/users");

var AYLIENTextAPI = require('aylien_textapi');
    var textapi = new AYLIENTextAPI({
    application_id: "YOUR_APP_ID",
    application_key: "YOUR_APP_KEY"
    });

let num = 10;
let sidearticles = [];
let newsheadline=[];
let business=[];
let technology = [];
let science = [];
let entertainment = [];
let sports = [];
let health = [];

const getarticles = async (keyword) => {
  const starship = await news.search(keyword,{n : num});
  
  return starship;

};

const getusnewsheadlines = async() => {
  newsheadline = await news.headlines({country: 'us', language: 'en', n: 10});
  return newsheadline;
}

const businessfunc = async() => {
  business = await news.topic('BUSINESS',{n:10});
  business.forEach(v => {v.keyword = "Business";});
  return business;
}
const technologyfunc = async() => {
  technology = await news.topic('TECHNOLOGY',{n:10});
  technology.forEach(v => {v.keyword = "Technology";});
  return technology;
}
const sciencefunc = async() => {
  science = await news.topic('SCIENCE',{n:10});
  science.forEach(v => {v.keyword = "Science";});
  return science;
}

const entertainmentfunc = async() => {
  entertainment = await news.topic('ENTERTAINMENT',{n:10});
  entertainment.forEach(v => {v.keyword = "Entertainment";});
  return entertainment;
}

const sportsfunc = async() => {
  sports = await news.topic('SPORTS',{n:10});
  sports.forEach(v => {v.keyword = "Sports";});
  return sports;
}

const healthfunc = async() => {
  health = await news.topic('HEALTH',{n:10});
  health.forEach(v => {v.keyword = "Health";});
  return health;
}

// const worldfunc = async() => {
//   world = await news.topic('WORLD',{n:10});
//   world.forEach(v => {v.keyword = "World";});
//   return world;
// }


let interests = [];

router.get("/", async function (req, res) {
    // console.log(req.session.user,"I'm inside home route!!")
    interests = req.session.user.interests;
    let articles=[];

    if (interests.length < 4){num = 5};
    if (interests.length >=4){num = 3};

    if(!interests || interests == null || interests.length==0){

      const ArticleData = await getusnewsheadlines();
      ArticleData.forEach(v => {v.keyword = "US News";});
      ArticleData.forEach(elements => articles.push(elements) );

    }
    
    
    for(let item in interests){
      
      const ArticleData = await getarticles(interests[item]);
      ArticleData.forEach(v => {v.keyword = interests[item];});
      ArticleData.forEach(elements => articles.push(elements) );
    }
    //console.log(articles)
    for (const i of articles)
    {
      let checkarticle = await articlesdb.getByUrl(i.link);
      if (!checkarticle){
        await articlesdb.create(i.link,[i.keyword], i.title,i.pubDate);
      }
    }
    res.render("differentPages/homePage",{articles: articles, interests_length: interests.length, interests:interests});
  });

router.get("/userprofile", async function(req, res){
  res.render("differentPages/EditProfile",{user:req.session.user});
});

router.get("/world",async function(req,res){
  res.render("differentPages/homePage",{articles: newsheadline, interests_length: interests.length})
});

router.get("/business",async function(req,res){
  const businessfeed = await businessfunc();
  res.render("differentPages/homePage",{articles: businessfeed, interests_length: interests.length})
});

router.get("/technology",async function(req,res){
  const technologyfeed = await technologyfunc();
  res.render("differentPages/homePage",{articles: technologyfeed, interests_length: interests.length})
});

router.get("/health",async function(req,res){
  const healthfeed = await healthfunc();
  res.render("differentPages/homePage",{articles: healthfeed, interests_length: interests.length})
});

router.get("/sports",async function(req,res){
  const sportsfeed = await sportsfunc();
  res.render("differentPages/homePage",{articles: sportsfeed, interests_length: interests.length})
});

router.get("/science",async function(req,res){
  const sciencefeed = await sciencefunc();
  res.render("differentPages/homePage",{articles: sciencefeed, interests_length: interests.length})
});

router.get("/entertainment",async function(req,res){
  const entertainmentfeed = await entertainmentfunc();
  res.render("differentPages/homePage",{articles: entertainmentfeed, interests_length: interests.length})
});

// router.get("/world",async function(req,res){
//   const worldfeed = await worldfunc();
//   res.render("differentPages/homePage",{articles: worldfeed, interests_length: interests.length})
// });


router.get("/us",async function(req,res){
  const usfeed = await getusnewsheadlines();
  usfeed.forEach(v => {v.keyword = "US-News";});
  res.render("differentPages/homePage",{articles: usfeed, interests_length: interests.length})
});

router.post("/updateint",async function(req,res){
  console.log(Object.keys(req.body)[0].split(','));
  let newintarray = Object.keys(req.body)[0].split(',');
  let updateduser = await usersdb.updateInterests(req.session.user._id, newintarray);
  console.log(updateduser);
  req.session.user.interests = updateduser.interests;
  res.render("differentPages/EditProfile",{user:updateduser});
})


router.post("/keywordsearch",async function(req,res){
  console.log(req.body.search);
  let searchkeyword = req.body.search;
  let listofarticles = [];

  let keyworddata = await keyworddb.getByKeyword(searchkeyword);
  
  
  if(!keyworddata || keyworddata == null){
    let articlelist = await news.search(searchkeyword,{n : 10});
    articlelist.forEach(v => {v.keyword = searchkeyword;});
    console.log(articlelist);
    return res.render("differentPages/homePage",{articles: articlelist, interests_length: interests.length});
  }

  else{
    
    for (let i of keyworddata.URLs){
      let articlebyurl = await articlesdb.getByUrl(i)
      listofarticles.push(articlebyurl);
    }
    console.log(listofarticles.slice(1,10));
    return res.render("differentPages/homePage",{articles: listofarticles.slice(1,10), interests_length: interests.length});

  }
  // res.render("differentPages/EditProfile",{user:updateduser});



})

router.post("/likeButton", async function(req, res){
  //req.body.link is a string
  console.log(req.body)
  try {
    id = req.session.user._id;
    await addUrls(id, req.body.link);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router

