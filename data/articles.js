const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const articles = mongoCollections.articles;
const { ObjectId } = require('mongodb')
const keywords = mongoCollections.keywords;
keywordsData = require('./keywords');

async function addKeywords(keys1, keys2, url) {
  const keywordsCollection = await keywords();
  urls = []
  urls.push(url)
  for (const item1 of keys1) {
    keyFound = false;
    for (const item2 of keys2) {
      if(item1 == item2.keyword){
        keyFound = true;
        const keyword = await keywordsCollection.findOne({keyword: item2.keyword});
        const updatedKeyword = await keywordsData.addUrls(item2.keyword, urls);
      }
    }
    if(keyFound == false){
      const keyword = await keywordsData.create(item1);
      const updatedKeyword = await keywordsData.addUrls(item1, urls);
    }
  }
}

async function create(url, keywordsList,title, date){
  if(url == null || keywordsList == null || title == null || date == null){
    throw "requires fields url, keywordsList, wordCount, readTime, title, date";
  }if(typeof url != 'string' || typeof title != 'string' || typeof date != 'string' || url == '' || title == '' || date == ''){
    throw "fields url, title, date must all be nonempty strings";
  }
  // if(typeof wordCount != 'number' || typeof readTime != 'number'){
  //   throw "fields wordCount and readTime must be numbers.";
  // }
  if(!(Array.isArray(keywordsList)) || keywordsList.length == 0){
    throw "keywordsList must be a nonempty array";
  }
  var keywordFail = true;
  for(i=0;i<keywordsList.length;i++){
    if(typeof keywordsList[i] == 'string' && keywordsList[i] != ''){
      keywordFail = false;
    }
  }if(keywordFail == true){
    throw "at least one element of keywordsList must be a nonempty string.";
  }
  const keywordsCollection = await keywordsData.getAll();
  const articlesCollection = await articles();
  
  // for(i=0;i<articlesCollection.length;i++){
  //   if(articlesCollection[i].article_URL == url){
  //     throw "article url arleady in database";
  //   }
  // }

  
  let newArticle = {
    article_URL: url,
    keywords: keywordsList,
    title: title,
    date_published: date
  }
  const insertInfo = await articlesCollection.insertOne(newArticle);
  if (insertInfo.insertedCount == 0){
    throw 'Could not add article';
  }
  const updatedKeywords = await addKeywords(keywordsList, keywordsCollection, url);
  return await get(insertInfo.insertedId.toString());
}

async function get(id) {
    if (id == null || typeof id != 'string'){
      throw "id must be a string";
    }
    try{
      const objId = new ObjectId(id);
      const articlesCollection = await articles();
      const article = await articlesCollection.findOne({ _id: objId });
      if (article == null){
        throw "article not found";
      }
      return article;
  }catch(e){
    throw "article not found";
  }
}

async function getByUrl(url) {
    if (url == null || typeof url != 'string'){
      throw "requires argument url";
    }
    try{
      const articlesCollection = await articles();
      const article = await articlesCollection.findOne({ article_URL: url });
      if (article == null){
        return null;
        // throw "article not found";
      }
      return article;
  }catch(e){
    throw "article not found";
  }
}

async function getAll() {
  const articlesCollection = await articles();
  const articlesList = await articlesCollection.find({}).toArray();
  return articlesList;
}

module.exports = {
  create: create,
  get: get,
  getAll: getAll,
  getByUrl: getByUrl
}
