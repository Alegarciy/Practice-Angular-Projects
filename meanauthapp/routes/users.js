const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../config/database");

//Register
router.post("/register", (req, res, next) => {
  console.log("This is the user name" + req.body.name);
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: "User registered" });
    }
  });
});

//Authenticate
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User 404 not found" });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800, //1 week
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.usename,
            email: user.email,
          },
        });
      } else {
        return res.json({ succes: false, msg: "Wrong password" });
      }
    });
  });
});

//Profile Protected
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

//Validate
router.get("/validate", (req, res, next) => {
  res.send("VALIDATE");
});

module.exports = router;
