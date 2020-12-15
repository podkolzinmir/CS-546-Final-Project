const express = require("express");
const router = express.Router();
const data = require("../data");
var bcrypt = require('bcryptjs');
const { addInterests } = require("../data/users");
const validators = data.validators;
const userData = data.users;
let validCookies =[];


router.get("/", async function (req, res) {
  res.render("differentPages/landingPage", {
    title: "landing Page",
  });
});

router.get("/signup", async function (req, res) {
  if (!validCookies.includes(req.sessionID)) {
    res.render("differentPages/SignUp");
    return;

} else {
    res.redirect("/home");
}
});

router.get("/login", async function (req, res) {
      if (!validCookies.includes(req.sessionID)) {
        res.render("differentPages/SignIn");
        return;

    } else {
        res.redirect("/home");
    }
      
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

  // const checkuser = await userData.get(email.toLowerCase);

  // if(checkuser){
  //   res.status(401).render("differentPages/SignUp", {hasErrors: true, errors: "Email-ID already exists!!"});
  //   return;
  // }


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
    return res.redirect("/login");
    
} catch (e) {
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
}

});

router.post("/signin", async function (req, res) {
    // console.log(req.body,"Checking Body")
    // let errors = [];
    // let hasErrors = false;
    const {
      username,
      password
    } = req.body;
    if (!validators.isValidEmail(username)){
      res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Enter valid Email-ID!!"});
      return;
    }
    if (!validators.isNonEmptyString(password)){
      res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Enter valid Password!!"});
      return;
    }
    let user = {
      username: username,
      password: password
    };

    try {
      const checkuser = await userData.get(user.username);
      // res.json(newUser);
      // console.log(checkuser,"AA")
      // console.log(user,"BB")
      
      if (!req.body.username || !req.body.password) {
        res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Please enter Username and Password"});
        return;
    }
    
    else if (!checkuser) {
        res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Incorrect Username!!"});
        return;
    }

    // else if(checkuser.hashedPassword == undefined || req.body.username == undefined || req.body.password== undefined) {
        // res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Please enter Username and Password or Incorrect Username!!"});
        // return;
    // }
    
    else {
        const pwd = await bcrypt.compare(req.body.password, checkuser.password);
        if (!pwd) {
            res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Error: Entered password does not match"});
            return;
        }
        validCookies.push(req.sessionID);
        req.session.user = checkuser;
        res.redirect("/home");
        return;
        

    }

  } catch (e) {
    res.status(400).json({ error: `User not found!! ${e}`  });;
  }


  //   if (errors.length > 0) {
  //     return res.status(400).render("differentPages/SignIn", { errors, user });
  //   } else {
  //     try {
  //     } catch (e) {
  //       return res
  //         .status(500)
  //         .render("differentPages/SignIn", { errors: [e], user });
  //     }
  //   }
  });


router.get("/logout", async(req, res) => {
    res.clearCookie("AuthCookie");
    for (i = 0; i < validCookies.length; i++) {
        if (validCookies[i] == req.sessionID) {
            delete validCookies[i];
        }
    }
    req.session.user = "";
    req.session.destroy();
    res.redirect("/login");
    return;
});


router.post("/signin", async function (req, res) {
    // console.log(req.body,"Checking Body")
    // let errors = [];
    // let hasErrors = false;
    const {
      username,
      password
    } = req.body;
    if (!validators.isValidEmail(username)){
      res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Enter valid Email-ID!!"});
      return;
    }
    if (!validators.isNonEmptyString(password)){
      res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Enter valid Password!!"});
      return;
    }
    let user = {
      username: username,
      password: password
    };

    try {
      const checkuser = await userData.get(user.username);
      // res.json(newUser);
      // console.log(checkuser,"AA")
      // console.log(user,"BB")
      
      if (!req.body.username || !req.body.password) {
        res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Please enter Username and Password"});
        return;
    }
    
    else if (!checkuser) {
        res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Incorrect Username!!"});
        return;
    }

    // else if(checkuser.hashedPassword == undefined || req.body.username == undefined || req.body.password== undefined) {
        // res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Please enter Username and Password or Incorrect Username!!"});
        // return;
    // }
    
    else {
        const pwd = await bcrypt.compare(req.body.password, checkuser.password);
        if (!pwd) {
            res.status(401).render("differentPages/SignIn", {hasErrors: true, errors: "Error: Entered password does not match"});
            return;
        }
        validCookies.push(req.sessionID);
        req.session.user = checkuser;
        res.redirect("/home");
        return;
        

    }

  } catch (e) {
    res.status(400).json({ error: `User not found!! ${e}`  });;
  }


  //   if (errors.length > 0) {
  //     return res.status(400).render("differentPages/SignIn", { errors, user });
  //   } else {
  //     try {
  //     } catch (e) {
  //       return res
  //         .status(500)
  //         .render("differentPages/SignIn", { errors: [e], user });
  //     }
  //   }
  });


router.get("/logout", async(req, res) => {
    res.clearCookie("AuthCookie");
    for (i = 0; i < validCookies.length; i++) {
        if (validCookies[i] == req.sessionID) {
            delete validCookies[i];
        }
    }
    req.session.user = "";
    req.session.destroy();
    res.redirect("/login");
    return;
});



// router.post("/addInterests", async(req, res) => {
//   try {
//     id = req.session.user._id;
//     interests = [];
//     if(req.body.interests1){
//       interests.push(req.body.interests1);
//     }
//     if(req.body.interests2){
//       interests.push(req.body.interests2);
//     }
//     if(req.body.interests3){
//       interests.push(req.body.interests3);
//     }
//     await addInterests(id,interests);
//     res.redirect("/userprofile");
//   } catch (error) {
//     console.log(error);
//   }
// });


module.exports = router;
