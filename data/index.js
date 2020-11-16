// import from different /data/ modules
const validators = require("./validators");
const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const users = mongoCollections.users;
usersData = require('./users')



async function main(){
  try{
    const user1 = await usersData.create({firstname: "abc", lastname: "xyz"}, "abc@gmail.com", ["tech", "news", "automotive"], ["www.techcrunch.com", "www.nytimes.com"], "what is your nickname", "alpha", "********");
    console.log(user1);
  }catch(e){
    console.log (e);
  }
}

main();




module.exports = {
  validators: validators
};
