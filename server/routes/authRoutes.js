const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const passport = require("passport");




router.post("/signup", (req, res) => {
    const data = req.body;
    if(data.password === data.password2){
      let user = new User({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      user
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            user: data,
          });
        }).catch((err) => {
          res.status(400).send({ message: "User with given email does exist!" });
        });
    }else{
      res.json({message : "password does not match"})
    }
      
  });
  

  router.post("/login", (req, res, next) => {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json(info);
          return;
        }
        // Token
        const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
        res.json({
          token: token,
          user: user,
        });
      }
    )(req, res, next);
  });


  module.exports = router;