// import from different /data/ modules
const validators = require("./validators");
const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const users = mongoCollections.users;
usersData = require('./users');
const keywords = mongoCollections.keywords;
keywordsData = require('./keywords');



async function main(){
  try{
    const user1 = await usersData.create({firstname: "abc", lastname: "xyz"}, "abc@gmail.com", ["tech", "news", "automotive"], ["www.techcrunch.com", "www.nytimes.com"], "what is your nickname", "alpha", "********");
    console.log(user1);
    const keyword1 = await keywordsData.create("news", ["url1", "url2", "url3"]);
    console.log(keyword1);
  }catch(e){
    console.log (e);
  }
}

main();




module.exports = {
  validators: validators
};
