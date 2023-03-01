const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require('../models/user')
const Post = require('../models/post')

const Postcontroller = require('../controllers/post')

const Authentication = require("../middleware/check.auth")



router.post('/', Authentication, Postcontroller.create_posts)

router.get('/', Authentication, Postcontroller.get_posts)

router.patch('/:postId', Authentication, Postcontroller.update_post)

router.delete('/:postId', Authentication, Postcontroller.delete_post)


 module.exports = router;