const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const keywords = mongoCollections.keywords;
const { ObjectId } = require('mongodb')

async function create(keyword, urls){
  if(keyword == null || urls == null){
    throw "requires fields keyword, urls";
  }if(typeof keyword != 'string' || keyword == ''){
    throw "field keyword must be nonempty strings";
  }if(!(Array.isArray(urls)) || urls.length == 0){
    throw "urls must be a nonempty array";
  }
  var urlFail = true;
  for(i=0;i<urls.length;i++){
    if(typeof urls[i] == 'string' && urls[i] != ''){
      urlFail = false;
    }
  }if(urlFail == true){
    throw "at least one element of urls must be a nonempty string.";
  }
  const keywordsCollection = await keywords();
  let newKeyword = {
    keyword: keyword,
    URLs: urls
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

module.exports = {
  create: create,
  get: get
}
