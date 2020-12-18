const dbConnection = require('../config/mongoConnection');
const mongoCollections = require("./../config/mongoCollection");
const data = require('../data/');
const usersData = require('../data/users');
//creating users for the database
async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    const hashedPasswordUser1 = "$2a$10$GPknC2bCYEDp/q49ypwLS.gxhW3Lq4VoOmjLAM9UGz6or6839lb.C";
    const user1= await usersData.create({firstname: "John", lastname: "Doe"}, "abc@gmail.com", "what is your nickname", "alpha",hashedPasswordUser1);
    const hashedPasswordUser2= "$2a$10$nqYwvDOmK77cHcjuCX7GNu3eQkCS6CzTmL5/hqVUmzyJN6uz8YX7a";
    const user2= await usersData.create({firstname: "Claire", lastname: "Ren"}, "claire@gmail.com","what is your favourite colour", "red", hashedPasswordUser2);
    const hashedPasswordUser3= "$2a$10$uEwk6lP7rLggSEjz3ADkVOoWqRE3cNCgFNrnuBJxqdnRSNQTpLuGW";
    const user3= await usersData.create({firstname: "Elizabeth", lastname: "Timana"}, "eli@gmail.com","what is favourity place", "Miami", hashedPasswordUser3);
    const hashedPasswordUser4= "$2a$10$QiRaV3JfvEiEJECZxYXLVus0yrbh7d6YtBN1QHZ6uaLe5k77AR1AO";
    const user4=await usersData.create({firstname: "Bella", lastname: "Iqbal"}, "bella@gmail.com","who is your favourite superhero", "batman", hashedPasswordUser4);
    const hashedPasswordUser5="$2a$10$RQWw.7b6Ivi52BMhF5dPOOjcXu8QJlJj7S3rhcIX2fTVR.0vZYuv2";
    const user5=await usersData.create({firstname: "Simon", lastname: "Cobwell"}, "cobwell.simon@gmail.com","favourite animal", "cat", hashedPasswordUser5); 
    const hashedPasswordUser6= "$2a$10$rWIxWmIOrel1nIak/NO2PuwADh75y8OftAqPgker8jmRsL1yB7YBe";
    const user6=await usersData.create({firstname: "Aiden", lastname: "Trent"}, "trenta98@gmail.com","favourite animal", "dog", hashedPasswordUser6); 
    const hashedPasswordUser7= "$2a$10$m.s6WcoeLKAjlP5gN8LBKu0X/1o1T4I3Wzrjnvu.qj2c.nFjCmMCe";
    await usersData.create({firstname: "Ayesha", lastname: "Parveen"}, "aparveen@stevens.edu","favourite animal", "parrot", hashedPasswordUser7); 
    const hashedPasswordUser8= "$2a$10$7Y5506rpb8Fbp5aRzSbv0.BQz45HNH6MI.7pYeIu6Y.lbwnR/HPSy";
    await usersData.create({firstname: "Rohan", lastname: "Ratwani"}, "ratwani.rohan@gmail.com","favourite subject", "web programming", hashedPasswordUser8); 
    const hashedPasswordUser9= "$2a$10$w6TunaKNRrOmROvYElx/Re1RW7kFwOkWOUOAGB3VKxeQKg8vyTvNi";
    await usersData.create({firstname: "Pratik", lastname: "Deo"}, "pdeo1@stevens.edu","what is your favourite wine", "merlot", hashedPasswordUser9); 
    const hashedPasswordUser10= "$2a$10$7MrV4.7Bh48nzH0Q191BoOCzSe5L7e7dol/75MpllrcEpEvt8SifG";
    await usersData.create({firstname: "John", lastname: "Dyer"}, "jdyer17@cbastudents.org","favourite ice cream flavour", "chocolate", hashedPasswordUser10); 
    //adding user interests for the database
    await usersData.updateInterests(user1._id.toString(), ["tech", "science", "news", "smartphones", "tv"]);
    await usersData.updateInterests(user2._id.toString(), ["tech", "science", "art"]);
    await usersData.updateInterests(user3._id.toString(), ["Art", "Covid-19", "news", "Music"]);
    await usersData.updateInterests(user4._id.toString(), ["Comics"]);
    await usersData.updateInterests(user5._id.toString(), ["Business","SpaceX","Politics"]);
    await usersData.updateInterests(user6._id.toString(), ["XDA Developers","Android","OnePlus"]);
    //console.log(updatedInterests);
    console.log('Done seeding database');
    await db.serverConfig.close();
}
main().catch(console.log);

