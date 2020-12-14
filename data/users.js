const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const users = mongoCollections.users;
const { ObjectId } = require('mongodb')

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function create(name, email, sec_question, sec_answer, password){
  if(name == null || email == null || sec_question == null || sec_answer == null || password == null){
    throw "requires fields name, email, interests, urls, sec_question, sec_answer, password";
  }if(typeof email != 'string' || typeof sec_question != 'string' || typeof sec_answer != 'string' || typeof password != 'string' || password == '' || sec_answer == '' || sec_question == '' || email == ''){
    throw "fields email, sec_question, sec_answer, password must all be nonempty strings";
  }
  /* if(!(Array.isArray(interests)) || interests.length == 0){
     throw "interests must be a nonempty array";
   }if(!(Array.isArray(urls)) || urls.length == 0){
     throw "urls must be a nonempty array";
   }
   var interestFail = true;
   for(i=0;i<interests.length;i++){
     if(typeof interests[i] == 'string' && interests[i] != ''){
       interestFail = false;
     }
   }if(interestFail == true){
     throw "at least one element of interests must be a nonempty string.";
   }
   var urlFail = true;
   for(i=0;i<urls.length;i++){
     if(typeof urls[i] == 'string' && urls[i] != ''){
       urlFail = false;
     }
   }if(urlFail == true){
     throw "at least one element of urls must be a nonempty string.";
   }*/
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
  return await get(insertInfo.ops[0].email);
}

async function get(emailaddress) {
    if (emailaddress == null || typeof emailaddress != 'string'){
      throw "Email should be entered!!";
    }
    try{
      // const objId = new ObjectId(id);
      const usersCollection = await users();
      const user = await usersCollection.findOne({ email: emailaddress });
      if (user == null){
        throw "user not found";
      }
      return user;
  }catch(e){
    throw "user not found";
  }
}

async function getById(id) {
    if (id == null || typeof id != 'string'){
      throw "id must be a string";
    }try{
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

async function updateInterests(id, newInterests){
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
    let updatedUser = {
      interests: newInterests
    }
    const updateResult = await usersCollection.updateOne({ _id: objId }, { $set: updatedUser });
    return getById(id);
  }catch(e){
    throw "failed to update user";
  }
}

async function updatePassword(id, newPass){
  if (id == null || typeof id != 'string' || newPass == null || typeof newPass != 'string'){
    throw "id and newPass must be strings";
  }
  try{
    const objId = new ObjectId(id);
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: objId });
    if (user == null){
      throw "user not found";
    }
    let updatedUser = {
      password: newPass
    }
    const updateResult = await usersCollection.updateOne({ _id: objId }, { $set: updatedUser });
    return getById(id);
  }catch(e){
    throw "failed to update password";
  }
}

async function addUrls(id, newUrls){
  if (id == null || typeof id != 'string'){
    throw "id must be a string";
  }if(!(Array.isArray(newUrls)) || newUrls.length == 0){
     throw "urls must be a nonempty array";
   }
   var urlFail = true;
   for(i=0;i<newUrls.length;i++){
     if(typeof newUrls[i] == 'string' && newUrls[i] != ''){
       urlFail = false;
     }
   }if(urlFail == true){
     throw "at least one element of urls must be a nonempty string.";
   }
   const objId = new ObjectId(id);
   const usersCollection = await users();
   const user = await usersCollection.findOne({ _id: objId });
   if (user == null){
     throw "user not found";
   }
   var urlFound;
   var updatedUrls = user.URLs
   for(i=0;i<newUrls.length;i++){
     urlFound = false;
     for(j=0;j<user.URLs.length;j++){
       if(newUrls[i]==user.URLs[j]){
         urlFound = true;
       }
     }
     if(urlFound==false){
       updatedUrls.push(newUrls[i]);
     }
   }
   let updatedUser = {
     URLs: updatedUrls
   }
   const updateResult = await usersCollection.updateOne({ _id: objId }, { $set: updatedUser });
   if(updateResult.modifiedCount == 0){
       throw "no new urls";
   }
   return getById(id);
  try{

  }catch(e){
    throw "failed to update user";
  }
}

async function removeUrls(id, urlsToRemove){
  if (id == null || typeof id != 'string'){
    throw "id must be a string";
  }if(!(Array.isArray(urlsToRemove)) || urlsToRemove.length == 0){
     throw "urls must be a nonempty array";
   }
   var urlFail = true;
   for(i=0;i<urlsToRemove.length;i++){
     if(typeof urlsToRemove[i] == 'string' && urlsToRemove[i] != ''){
       urlFail = false;
     }
   }if(urlFail == true){
     throw "at least one element of urls must be a nonempty string.";
   }
   const objId = new ObjectId(id);
   const usersCollection = await users();
   const user = await usersCollection.findOne({ _id: objId });
   if (user == null){
     throw "user not found";
   }
   var urlFound;
   var updatedUrls = user.URLs;
   var urlsIndex = [];
   for(i=0;i<user.URLs.length;i++){
     for(j=0;j<urlsToRemove.length;j++){
       if(user.URLs[i]==urlsToRemove[j]){
         updatedUrls.remove(user.URLs[i])
       }
     }
   }
   let updatedUser = {
     URLs: updatedUrls
   }
   const updateResult = await usersCollection.updateOne({ _id: objId }, { $set: updatedUser });
   if (updateResult.modifiedCount == 0) {
       throw "no new urls";
   }
   return getById(id);
  try{


  }catch(e){
    throw "failed to update user";
  }
}

async function getAll() {
  const usersCollection = await users();
  const usersList = await usersCollection.find({}).toArray();
  return usersList;
}

module.exports = {
  create: create,
  get: get,
  getAll: getAll,
  addUrls: addUrls,
  updateInterests: updateInterests,
  updatePassword: updatePassword,
  removeUrls: removeUrls
}
