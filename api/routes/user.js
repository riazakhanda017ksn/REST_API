const express=require('express')
const router=express.Router()
const authenticate=require('../middleware/authenticate')
const userController=require('../controllers/user')
router.post('/login',userController.logInController)

router.post('/register',userController.registeredController)
router.get('/',authenticate,userController.getAllUser)

module.exports=router