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
    const user1 = await usersData.get("ratwani.rohan@gmail.com");
    console.log(user1);
  }catch(e){
    console.log (e);
  }
}

// main();




module.exports = {
  validators: validators,
  users: usersData
};
