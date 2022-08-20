const express = require("express");
const router = express.Router();
const jwtAuth = require("../lib/jwtAuth");
const User = require("../models/User");

router.put("/profile", (req, res) => {
    const data = req.body;
    console.log(data.user.user)
   
    User.findOne({_id:data.user.user._id})
    .then((user)=>{
        if(user === null){
            res.status(404).json({
                error: "User does not exist"
            })
        }
        if(data.name){
            user.name = data.name
        }
        if(data.email){
            user.email = data.email
        }
        if(data.password){
            user.password = data.password
        }
        user.save()
        .then(()=>{
            res.json({message: "User updated"})
        })

    }) 
    .catch((err) => {
        res.status(400).json(err);
      });
    
  });

router.post("/profile", (req, res) => {
    const data = req.body;
    User.find({ _id: data.user._id}, function (err, user) {
      res.json(user[0]);
    });
  });


module.exports = router;