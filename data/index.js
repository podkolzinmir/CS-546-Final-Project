// import from different /data/ modules
const validators = require("./validators");
const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const users = mongoCollections.users;
usersData = require('./users');
const keywords = mongoCollections.keywords;
keywordsData = require('./keywords');
const articles = mongoCollections.articles;
articlesData = require('./articles');



async function main(){
  try{
    //const user1 = await usersData.create({firstname: "abc", lastname: "xyz"}, "abc@gmail.com", "what is your nickname", "alpha", "********");
    //console.log(user1);
    //const keyword1 = await keywordsData.create("tech");
    //console.log(keyword1);
    //const keyword2 = await keywordsData.create("science");
    //console.log(keyword2);
    //const article1 = await articlesData.create("https://techcrunch.com/2020/10/27/wyze-launches-version-3-of-its-20-security-camera/", ["tech", "science", "news"], 800, 7, "Wyze launches version 3 of its $20 security camera", "11/1/2020");
    //console.log(article1);
    //const updatedInterests = await usersData.addInterests(user1._id.toString(), ["tech", "science", "news", "smartphones", "tv"]);
    //console.log(updatedInterests);
    //const updatedURLs1 = await usersData.addUrls(user1._id.toString(), ["www.github.com", "www.xcode.com"]);
    //console.log(updatedURLs1);
    //const updatedURLs2 = await keywordsData.addUrls(user1._id.toString(), ["https://techcrunch.com/2020/10/27/wyze-launches-version-3-of-its-20-security-camera/"]);
    //console.log(updatedURLs2);
    const removedInterests = await usersData.updateInterests('5fb2b55c1b93094b145200dd', []);
    console.log(removedInterests);
    //const removedUrls = await usersData.removeUrls(user1._id.toString(), ["google", "www.github.com", "www.xcode.com"]);
    //console.log(removedUrls);
    //const getArticleByUrl = await articlesData.getByUrl('https://www.grandforksherald.com/business/6796568-Digi-Keys-executive-vice-president-recognized-as-Notable-Woman-in-Technology')
    //console.log(getArticleByUrl);


  }catch(e){
    console.log (e);
  }
}

main();




module.exports = {
  validators: validators,
  users: usersData
};
