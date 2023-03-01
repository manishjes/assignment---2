const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require('../models/user')
const Category = require('../models/category')
const Categorycontroller = require('../controllers/categories')

const Authentication = require("../middleware/check.auth")


router.post('/', Authentication, Categorycontroller.create_category )

router.get('/', Authentication, Categorycontroller.get_category)

router.patch('/:categoryId',Authentication, Categorycontroller.update_category)

router.delete('/:categoryId',Authentication, Categorycontroller.delete_category)


module.exports = router;
