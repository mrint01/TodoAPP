const express = require("express");
const router = express.Router();
const jwtAuth = require("../lib/jwtAuth");
const User = require("../models/User");

router.put("/profile",jwtAuth, (req, res) => {
    const data = req.body;
    const user = req.user;
   
    User.findOne({_id:user._id})
    .then((user)=>{
        if(user === null){
            res.status(404).json({
                message: "User does not exist"
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


module.exports = router;