const express = require('express');
const route = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();


route.post("/createuser", [
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password','password length is too short').isLength({min: 5})
], async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const securePwd = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: securePwd
        })
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array() });
        }
        await user.save();
        console.log(`user created successfully: ${user}`);
        res.json({status: "success", user: user});

    }catch(err){
        console.log(err);
    }
    
})

route.post("/login", async (req, res)=>{
    const response = await User.findOne({email:req.body.email});
    console.log(response)
    if(!response){
        console.log("email id does not present in db");
        return res.status(400).json({errors: "invalid credentails"});
    }
    const passwordCompare = await bcrypt.compare(req.body.password, response.password);
    if(!passwordCompare){
        return res.status(400).json({errors: "invalid credentails"});
    }
    const userData = response.id;
    const authToken = jwt.sign(userData, process.env.SECRET_KEY)
    
    return res.json({success: true, authToken: authToken});


})

module.exports = route

