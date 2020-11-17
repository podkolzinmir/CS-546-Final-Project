const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const users = mongoCollections.users;
const { ObjectId } = require('mongodb')

async function create(name, email, sec_question, sec_answer, password){
  if(name == null || email == null || sec_question == null || sec_answer == null || password == null){
    throw "requires fields name, email, interests, urls, sec_question, sec_answer, password";
  }if(typeof email != 'string' || typeof sec_question != 'string' || typeof sec_answer != 'string' || typeof password != 'string' || password == '' || sec_answer == '' || sec_question == '' || email == ''){
    throw "fields email, sec_question, sec_answer, password must all be nonempty strings";
  }
  // if(!(Array.isArray(interests)) || interests.length == 0){
  //   throw "interests must be a nonempty array";
  // }if(!(Array.isArray(urls)) || urls.length == 0){
  //   throw "urls must be a nonempty array";
  // }
  // var interestFail = true;
  // for(i=0;i<interests.length;i++){
  //   if(typeof interests[i] == 'string' && interests[i] != ''){
  //     interestFail = false;
  //   }
  // }if(interestFail == true){
  //   throw "at least one element of interests must be a nonempty string.";
  // }
  // var urlFail = true;
  // for(i=0;i<urls.length;i++){
  //   if(typeof urls[i] == 'string' && urls[i] != ''){
  //     urlFail = false;
  //   }
  // }if(urlFail == true){
  //   throw "at least one element of urls must be a nonempty string.";
  // }
  if(typeof name != 'object'){
    throw "name must be an object."
  }if (name.firstname == null || typeof name.firstname != 'string' || name.firstname == ''){
    throw "name requires field firstname as a string.";
  }if(name.lastname == null || typeof name.lastname != 'string' || name.lastname == ''){
    throw "name requires field lastname as a string";
  }
  const usersCollection = await users();
  let newUser = {
    name: name,
    email: email,
    interests: [],
    URLs: [],
    security_question: sec_question,
    security_answer: sec_answer,
    password: password
  }
  const insertInfo = await usersCollection.insertOne(newUser);
  if (insertInfo.insertedCount == 0){
    throw 'Could not add user';
  }
  return await get(insertInfo.insertedId.toString());
}

async function get(id) {
    if (id == null || typeof id != 'string'){
      throw "id must be a string";
    }
    try{
      const objId = new ObjectId(id);
      const usersCollection = await users();
      const user = await usersCollection.findOne({ _id: objId });
      if (user == null){
        throw "user not found";
      }
      return user;
  }catch(e){
    throw "user not found";
  }
}

module.exports = {
  create: create,
  get: get
}
