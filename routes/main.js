const express = require("express");
const router = express.Router();
const data = require("../data");
var bcrypt = require('bcryptjs');
const validators = data.validators;
const userData = data.users;
router.get("/", async function (req, res) {
  res.render("differentPages/landingPage", {
    title: "landing Page",
  });
});

router.get("/signup", async function (req, res) {
  res.render("differentPages/Signup");
});

router.get("/signin", async function (req, res) {
    res.render("differentPages/SignIn");
  });

router.post("/signup", async function (req, res) {
  const errors = [];
  const {
    firstName,
    lastName,
    gender,
    email,
    password,
    passwordConfirm,
    sec_question,
    sec_answer
  } = req.body;
  if (!validators.isLettersOnly(firstName))
    errors.push("First name is missing");
  if (!validators.isLettersOnly(lastName)) errors.push("Last name is missing");
  if (!validators.isNonEmptyString(gender)) errors.push("Gender is missing");
  else if (!validators.validateGender(gender))
    errors.push("Gender provided is invalid");
  if (!validators.isNonEmptyString(email))
    errors.push("Email address is missing");
  else if (!validators.isValidEmail(email))
    errors.push("The provided emails is incorrect");
  if (!validators.isNonEmptyString(password))
    errors.push("Password is missing");
  else if (!validators.isValidPassword(password))
    errors.push("Password must be at least of length 8");
  if (!validators.isNonEmptyString(passwordConfirm))
    errors.push("Password confirmation is missing");
  if (password !== passwordConfirm)
    errors.push("Password and confirmation don't match");
  const hashedPassword = await bcrypt.hash(password, 10);

  let user = {
    firstName: firstName,
    lastName: lastName,
    email: email.toLowerCase(),
    hashedPassword,
    gender: gender,
    sec_question: sec_question,
    sec_answer: sec_answer
  };
  try {
    const newUser = await userData.create({firstname: user.firstName, lastname: user.lastName}, user.email, user.sec_question, user.sec_answer, user.hashedPassword);
    // res.json(newUser);
} catch (e) {
  res.status(400).json({ error: `Sign-Up Error!! ${e}`  });;
}


if (errors.length > 0) {
    return res.status(400).render("differentPages/Signup", { errors, user });
  } else {
    try {
    } catch (e) {
      return res
        .status(500)
        .render("differentPages/Signup", { errors: [e], user });
    }
  }
});

router.post("/signin", async function (req, res) {
    const errors = [];
    const {
      username,
      password
    } = req.body;
    if (!validators.isLettersOnly(username))
      errors.push("Username is missing");
    if (!validators.isNonEmptyString(password))
      errors.push("Password is missing");
   // const hashedPassword = await bcrypt.hash(password, 10);
  
    let user = {
      username: username,
      password: password
    };
    if (errors.length > 0) {
      return res.status(400).render("differentPages/SignIn", { errors, user });
    } else {
      try {
      } catch (e) {
        return res
          .status(500)
          .render("differentPages/SignIn", { errors: [e], user });
      }
    }
  });

module.exports = router;

module.exports = router;

