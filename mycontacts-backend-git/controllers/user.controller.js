const asyncHandler = require("express-async-handler")
const {User} = require("../models/user.model")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")


//@desc Register a user
//@route POST /api/users/register
//@access public

//User registration function
const registerUser = asyncHandler (async (req,res)=>{
        const {username, email, password} = req.body

        //Check if all the fields are filled properly
        if(!(username && email && password)){
                res.status(400).json({message:"All fields are mandatory"})
        }

        //Check if user's email had already been registered previously
        const userAvailable = await User.findOne({email})
        if(userAvailable){
                res.status(400).json({message:"User already registered"})
        }

        //Encrypt the user's password
        const hashedPassword = await bcrypt.hash(password,10)

        //Create a new user and display the password in encrypted form.
        const user = await User.create({
                username,
                email,
                password: hashedPassword
        })
        res.json(user)
})

//User login function
const loginUser = asyncHandler (async (req,res)=>{
        const {email,password} = req.body

        //Find user by email
        const user = await User.findOne({email})

        //Check whether user exist and if exist compare stored password with the user's input
        if(user && (await bcrypt.compare(password,user.password))){
                //Sign in the user and create and access token that expires in 15 min
                const accessToken = jwt.sign({
                        user:{
                                username: user.username,
                                email: user.email,
                                id: user.id
                        }
                },
                process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"}
                )
                res.status(200).json({accessToken})
        }else{
                res.status(401).json({message:"email or password is not valid"})
        }
})

//Current user info function
const currentUser = asyncHandler (async (req,res)=>{
        res.json(req.user)
})

module.exports = {registerUser,loginUser,currentUser}