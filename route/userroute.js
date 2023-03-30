require("dotenv").config();
const express = require('express')
const AppRoute = express.Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = require("../authconfig/jwt.config.js");



const userInstance = require("../models/user.model.js")


// creating user and saving it to db.

AppRoute.post("/api/register", async(req, res)=>{
    try {
            const {name, email, password} = req.body

            if (!(name && email && password)){
                res.status(400).json("All Field Required")
            }

            isUserExist = await userInstance.findOne({email})

            if(isUserExist){
                res.status(409).json("User Exist")
            }
                encryptedPassword = await bcrypt.hash(password, 10);

                const user = await userInstance.create({
                    password : encryptedPassword,
                    name : name,
                    email : email.toLowerCase()
                })

                res.status(201).json(user) 
            } catch(err){
                res.status(409).json("could not create profile")
            }           
})

// login route
AppRoute.post("/api/login", async (req, res)=>{
        const {email, password} = req.body
        try{
            const user_info =  await userInstance.findOne({email})
        if (user_info ){
            const is_password_vaild = await bcrypt.compare(password, user_info.password);
            if (is_password_vaild){
            const token = jwt.sign(
            {user_id: user_info._id, email },
            process.env.JWT_KEY,
            {expiresIn: "24h"}
            );
            // save user token to db
            user_info.token = token;

            res.status(200).json({
                "email" : user_info.email,
                "token" : user_info.token,
                "name" : user_info.name,
            });

            }else{
                res.status(400).json("Invalid Passwor or Email");
            }

        }else{
            res.status(400).json("email does not exist");

        }

        }catch(err){
            res.status(400).json(err)
        }
        

        
})



module.exports = AppRoute



