const mongoose = require("mongoose")
const {Schema,model} = mongoose

//Schema for users
const userSchema = new Schema({
        username:{
                type: String,
                required: [true,"Please add the username"]
        },
        email:{
                type: String,
                unique: true,
                required: [true,"Please add the user email address"],
                
        },
        password:{
                type: String,
                required: [true,"Please add the user password"]
        },
        timestamp:{
                type: Date,
                required: true,
                default: Date.now
        }
})

//Model for users
const User = model("user",userSchema)

module.exports = {User}