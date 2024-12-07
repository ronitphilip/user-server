const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req,res) => {
    console.log('Inside Register controller')
    const { firstname, lastname, email, password, phonenumber } = req.body
    console.log(firstname, lastname, email, password, phonenumber)

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exists, please login!")
        }else{
            const newUser = new users({
                firstname, lastname, email, password, phonenumber
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req,res) => {
    console.log('Inside Login Controller')
    const { email, password } = req.body
    console.log(email, password)

    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // token generate
            const token = jwt.sign({userId:existingUser._id},process.env.JWTpassword)
            res.status(200).json({
                user : existingUser,
                token
            })
        }else{
            res.status(404).json("Invalid email/password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// Get all users
exports.getUsersController = async (req, res) => {
    console.log("Inside getUsersController");
    try {
        const allUsers = await users.find().select('-password');
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(401).json(err);
    }
}

// Get one user
exports.getOneUserController = async (req, res) => {
    console.log("Inside getOneUserController");
    const { email, password } = req.body
    console.log( email, password )
    try {
        const existingUser = await users.findOne({email}).select('-password')
        res.status(200).json(existingUser);
    } catch (err) {
        res.status(401).json(err);
    }
}