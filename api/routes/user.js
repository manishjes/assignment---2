const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')

const dotenv = require("dotenv").config()
const Authentication = require("../middleware/check.auth")


const User = require('../models/user')
const Usercontroller = require("../controllers/user")


router.post('/signup', Usercontroller.signup_user)

router.post('/login', Usercontroller.login_user )
    
router.post('/logout', Authentication, Usercontroller.logout_user)

router.delete('/:userId',Authentication, Usercontroller.deleted_user )

    
   
module.exports= router;