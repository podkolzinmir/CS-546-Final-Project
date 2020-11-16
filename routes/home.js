const express = require('express');
const router = express.Router();



router.get("/", async function (req, res) {
    res.render("differentPages/homePage");
  });

router.get("/userprofile", async function(req, res){
  res.render("differentPages/EditProfile");
});
  module.exports = router