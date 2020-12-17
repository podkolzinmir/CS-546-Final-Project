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
    await usersData.create({firstname: "John", lastname: "Doe"}, "abc@gmail.com",["Technology", "Art", "Science"],[], "what is your nickname", "alpha", "$123down");
    await usersData.create({firstname: "Claire", lastname: "Ren"}, "claire@gmail.com",["Mucis", "Covid-19"], [],"what is your favourite colour", "red", "IceCream123#");
    await usersData.create({firstname: "Ayesha", lastname: "Parveen"}, "aparveen@stevens.edu",["Technology", "Art", "Science","Music"], [],"what is your dog's name", "bella", "$1235Bella");
    await usersData.create({firstname: "Rohan", lastname: "Ratwani"}, "ratwani.rohan@gmail.com",[],[], "what is your mother's maiden name", "seema", "$123Ronnie");
    await usersData.create({firstname: "Pratik", lastname: "Deo"}, "pdeo1@stevens.edu",["Music"],[], "what is favourite sport", "cricket", "Tech12$3");
    await usersData.create({firstname: "Elizabeth", lastname: "Timana"}, "eli@gmail.com",["Medicine","Politics"], [],"what is favourity place", "Miami", "Pain720#");
    await usersData.create({firstname: "Bella", lastname: "Iqbal"}, "bella@gmail.com",[], [],"who is your favourite superhero", "batman", "Tan#432");
    await usersData.create({firstname: "Simon", lastname: "Cobwell"}, "cobwell.simon@gmail.com",["Food"],[], "favourite animal", "cat", "#cheftan1234");
    
    console.log('Done seeding database');
​
    await db.serverConfig.close();
}
​
main();
