const express=require('express')
const router= express.Router()
const contactController=require('../controllers/contacts')
const authenticate = require('../middleware/authenticate')
//Get
router.get('/',contactController.getAllContactsController)

//post
router.post('/', authenticate,contactController.postNewContactsController)

router.get('/:id',contactController.getSingleContact)
router.put('/:id',authenticate,contactController.editContact)
router.delete('/:id',authenticate,contactController.deleteContact)

module.exports=router