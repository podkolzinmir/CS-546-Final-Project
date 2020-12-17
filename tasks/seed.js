const dbConnection = require('../config/mongoConnection');
const mongoCollections = require("./../config/mongoCollection")
const data = require('../data/');
const usersData = data.users;
//const usersData = require('./users');
​
//creating data for the database
​
async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    await usersData.create({firstname: "john", lastname: "doe"}, "abc@gmail.com",["Technology", "Art", "Science"],[], "what is your nickname", "alpha", "$123down");
    await usersData.create({firstname: "claire", lastname: "ren"}, "claire@gmail.com",["Mucis", "Covid-19"], [],"what is your favourite colour", "red", "IceCream123#");
    await usersData.create({firstname: "ayesha", lastname: "parveen"}, "aparveen@stevens.edu",["Technology", "Art", "Science","Music"], [],"what is your dog's name", "bella", "$1235Bella");
    await usersData.create({firstname: "rohan", lastname: "ratwani"}, "ratwani.rohan@gmail.com",[],[], "what is your mother's maiden name", "seema", "$123Ronnie");
    await usersData.create({firstname: "pratik", lastname: "deo"}, "pdeo1@stevens.edu",["Music"],[], "what is favourite sport", "cricket", "Tech12$3");
    await usersData.create({firstname: "elizabeth", lastname: "timana"}, "eli@gmail.com",["Medicine","Politics"], [],"what is favourity place", "Miami", "Pain720#");
    await usersData.create({firstname: "bella", lastname: "iqbal"}, "bella@gmail.com",[], [],"who is your favourite superhero", "batman", "Tan#432");
    await usersData.create({firstname: "simon", lastname: "cobwell"}, "cobwell.simon@gmail.com",["Food"],[], "favourite animal", "cat", "#cheftan1234");
    
    console.log('Done seeding database');
​
    await db.serverConfig.close();
}
​
main();
