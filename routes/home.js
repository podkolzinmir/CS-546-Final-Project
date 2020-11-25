const express = require('express');
const router = express.Router();



router.get("/", async function (req, res) { 
  let i = req.session.user.interests.length;
  res.render("differentPages/homePage", {interests_length: i});
  });

router.get("/userprofile", async function(req, res){
  res.render("differentPages/EditProfile");
});
  module.exports = router