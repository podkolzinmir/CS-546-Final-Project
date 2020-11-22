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
    const user1 = await usersData.create({firstname: "abc", lastname: "xyz"}, "abc@gmail.com", "what is your nickname", "alpha", "********");
    console.log(user1);
    const keyword1 = await keywordsData.create("news", ["url1", "url2", "url3"]);
    console.log(keyword1);
    const article1 = await articlesData.create("https://techcrunch.com/2020/10/27/wyze-launches-version-3-of-its-20-security-camera/", ["tech", "science"], 800, 7, "Wyze launches version 3 of its $20 security camera", "11/1/2020");
    console.log(article1);
    const updatedInterests = await usersData.addInterests(user1._id.toString(), ["tech", "science", "news"]);
    console.log(updatedInterests);
    const updatedURLs = await usersData.addUrls(user1._id.toString(), ["https://techcrunch.com/2020/10/27/wyze-launches-version-3-of-its-20-security-camera/"]);
    console.log(updatedURLs);
  }catch(e){
    console.log (e);
  }
}

//main();




module.exports = {
  validators: validators,
  users: usersData
};
