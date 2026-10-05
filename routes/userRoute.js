const express=require('express')
const { loginController, registerController } = require('../controllers/userController')

//router object
const router=express.Router()
const userController = require('../controllers/userController');

//routers
//POST|| LOGIN
router.post('/login',loginController)

//POST||REGISTER USER
router.post('/register',registerController)

module.exports=router