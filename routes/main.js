const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  res.render("differentPages/landingPage", {
    title: "This is the landing Page",
  });
});

router.get("/signup", async function (req, res) {
  res.render("differentPages/Signup");
});

router.post("/signup", async function (req, res) {
  let post = req.body;
  try {
    res.render("differentPages/landingPage");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
