const asyncHandler = require("express-async-handler")
const {Contact} = require("../models/contact.model")

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler (async (req,res)=> {
        //Get the result of all contacts related tu current user
        const contacts = await Contact.find({User:req.user.id})
        res.status(200).json(contacts)
})

const createContact = asyncHandler (async (req,res)=>{
        const { name, email, phone } = req.body;

        //Check the if all fields have been filled properly
        if (!(name && email && phone)) {
                res.status(400).json({message:"Please provide all required fields (name, email, and phone)"})
        }

        //Create a new contact and link it to current user
        const contact = new Contact({
                User: req.user.id, // Link the contact to the current user
                name,
                email,
                phone,
        })

        //Persist the newly created contact to database
        const createdContact = await contact.save()

        res.status(201).json(createdContact)
})

const getContact = asyncHandler (async (req,res)=>{
        //Get contact by Id for the current user
        const contact = await Contact.findById(req.params.id)

        //Error handling if contact is not found or contact is not linked to the current user id
        if (!(contact && contact.User.toString() == req.user.id)) {
                res.status(404).json({message:"Contact not found or you are not authorized to view this contact"})
        }

        res.status(200).json(contact)
})
const updateContact = asyncHandler (async (req,res)=>{
        //Get contact by id for current user
        const contact = await Contact.findById(req.params.id)

        //Error handling if contact is not found or contact is not linked to the current user id
        if (!(contact && contact.User.toString() == req.user.id)) {
                res.status(404).json({message:"Contact not found or you are not authorized to update this contact"})
        }

        //Update the contact info for the current user by contact id
        const updatedContact = await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
        );

        res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler (async (req,res)=>{
        //Get contact by id for current user
        const contact = await Contact.findById(req.params.id)

        //Error handling if contact is not found or contact is not linked to the current user id
        if (!(contact && contact.User.toString() == req.user.id)) {
                res.status(404).json({message:"Contact not found or you are not authorized to delete this contact"})
        }

        // Delete the contact for current user
        const deletedContact = await Contact.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Contact removed",info:deletedContact })
})

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact}