const { Router } = require("express");
const {getContacts,createContact,getContact,updateContact,deleteContact} = require("../controllers/contact.controller")
const validateToken = require("../middleware/validateTokenHandler")

const router = Router()

router.use(validateToken)
router
        .route("/")
        .get(getContacts)
        .post(createContact)

router  
        .route("/:id")
        .get(getContact)
        .put(updateContact)
        .delete(deleteContact)

module.exports = router