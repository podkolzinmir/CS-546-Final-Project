const axios = require('axios').default;
const mongoCollections = require("./../config/mongoCollection")
const keywords = mongoCollections.keywords;
const { ObjectId } = require('mongodb')

async function create(keyword){
  if(keyword == null){
    throw "requires field keyword";
  }if(typeof keyword != 'string' || keyword == ''){
    throw "field keyword must be nonempty strings";
  }
  /*if(!(Array.isArray(urls)) || urls.length == 0){
    throw "urls must be a nonempty array";
  }
  var urlFail = true;
  for(i=0;i<urls.length;i++){
    if(typeof urls[i] == 'string' && urls[i] != ''){
      urlFail = false;
    }
  }if(urlFail == true){
    throw "at least one element of urls must be a nonempty string.";
  }*/
  const keywordsCollection = await keywords();
  let newKeyword = {
    keyword: keyword,
    URLs: []
  }
  const insertInfo = await keywordsCollection.insertOne(newKeyword);
  if (insertInfo.insertedCount == 0){
    throw 'Could not add keyword';
  }
  return await get(insertInfo.insertedId.toString());
}

async function get(id) {
    if (id == null || typeof id != 'string'){
      throw "id must be a string";
    }
    try{
      const objId = new ObjectId(id);
      const keywordsCollection = await keywords();
      const keyword = await keywordsCollection.findOne({ _id: objId });
      if (keyword == null){
        throw "keyword not found";
      }
      return keyword;
  }catch(e){
    throw "keyword not found";
  }
}

async function getByKeyword(keyword) {
    if (keyword == null || typeof keyword != 'string'){
      throw "requires argument keyword";
    }
    try{
      const keywordsCollection = await keywords();
      const keywordFound = await keywordsCollection.findOne({ keyword: keyword });
      if (keywordFound == null){
        throw "keyword not found";
      }
      return keywordFound;
  }catch(e){
    throw "keyword not found";
  }
}

async function addUrls(keyword, newUrls){
  if (keyword == null || typeof keyword != 'string'){
    throw "keyword must be a string";
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
   const keywordsCollection = await keywords();
   const keywordFound = await keywordsCollection.findOne({ keyword: keyword });
   if (keywordFound == null){
     throw "keyword not found";
   }
   var urlFound;
   var updatedUrls = keywordFound.URLs
   for(i=0;i<newUrls.length;i++){
     urlFound = false;
     for(j=0;j<keywordFound.URLs.length;j++){
       if(newUrls[i]==keywordFound.URLs[j]){
         urlFound = true;
       }
     }
     if(urlFound==false){
       updatedUrls.push(newUrls[i]);
     }
   }
   let updatedKeyword = {
     URLs: updatedUrls
   }
   const updateResult = await keywordsCollection.updateOne({ keyword: keyword }, { $set: updatedKeyword });
   if(updateResult.modifiedCount == 0){
       throw "no new urls";
   }
   return getByKeyword(keyword);
  try{

  }catch(e){
    throw "failed to update keyword";
  }
}

async function getAll() {
  const keywordsCollection = await keywords();
  const keywordsList = await keywordsCollection.find({}).toArray();
  return keywordsList;
}

module.exports = {
  create: create,
  get: get,
  getAll: getAll,
  addUrls: addUrls
}
