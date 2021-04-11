const express = require("express");
const router = express.Router();

//Register
router.get("/register", (req, res, next) => {
  res.send("REGISTER");
});

//Profile
router.get("/authenticate", (req, res, next) => {
  res.send("AUTHENTICATE");
});

//Profile
router.get("/profile", (req, res, next) => {
  res.send("PROFILE");
});

//Validate
router.get("/validate", (req, res, next) => {
  res.send("VALIDATE");
});

module.exports = router;
