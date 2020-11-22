const axios = require('axios').default;
mongoCollections = require("./../config/mongoCollection")
const articles = mongoCollections.articles;
const { ObjectId } = require('mongodb')

async function create(url, keywords, wordCount, readTime, title, date){
  if(url == null || keywords == null || wordCount == null || readTime == null || title == null || date == null){
    throw "requires fields url, keywords, wordCount, readTime, title, date";
  }if(typeof url != 'string' || typeof title != 'string' || typeof date != 'string' || url == '' || title == '' || date == ''){
    throw "fields url, title, date must all be nonempty strings";
  }if(typeof wordCount != 'number' || typeof readTime != 'number'){
    throw "fields wordCount and readTime must be numbers.";
  }if(!(Array.isArray(keywords)) || keywords.length == 0){
    throw "keywords must be a nonempty array";
  }
  var keywordFail = true;
  for(i=0;i<keywords.length;i++){
    if(typeof keywords[i] == 'string' && keywords[i] != ''){
      keywordFail = false;
    }
  }if(keywordFail == true){
    throw "at least one element of keywords must be a nonempty string.";
  }
  const articlesCollection = await articles();
  let newArticle = {
    article_URL: url,
    keywords: keywords,
    number_of_words: wordCount,
    read_time: readTime,
    title: title,
    date_published: date
  }
  const insertInfo = await articlesCollection.insertOne(newArticle);
  if (insertInfo.insertedCount == 0){
    throw 'Could not add article';
  }
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

async function getAll() {
  const articlesCollection = await articles();
  const articlesList = await articlesCollection.find({}).toArray();
  return articlesList;
}

module.exports = {
  create: create,
  get: get,
  getAll: getAll
}
