const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Post = require('../models/post')
const Publiccontroller = require("../controllers/public")

router.get('/', Publiccontroller.sort_getpost)

router.get('/title', Publiccontroller.title_get)

router.get('/content', Publiccontroller.content_get)

router.get('/category', Publiccontroller.category_get)

module.exports = router