const mongoose = require("mongoose")
const {Schema,model} = mongoose

//Schema for Contacts
const contactSchema = new Schema({
        User:{
                type: mongoose.Schema.Types.ObjectId,    
                required: true,
        },
        name:{
                type: String,
                required: [true,"Please add the contact name"]
        },
        email:{
                type: String,
                required: [true,"Please add the contact email address"],
                match: [
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        "Please enter a valid email address"
                      ]
        },
        phone:{
                type: String,
                required: [true,"Please add the contact phone number"]
        },
        timestamp:{
                type: Date,
                required: true,
                default: Date.now
        }
})

//Model for Contacts
const Contact = model("Contact",contactSchema)

module.exports = {Contact}