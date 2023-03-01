const Post = require('../models/post')
const mongoose = require("mongoose")

// sort by new post first
exports.sort_getpost = (req, res, next)=>{

    
    Post.find().sort({created: -1})
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
}

// get by title
exports.title_get = (req, res, next)=>{

    
    Post.find({
        title: req.body.title,
    })
    .then(docs=>{
        const response = {
            count: docs.length
            

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
}
// get by content 


exports.content_get = (req, res, next)=>{

    const regex = new RegExp(req.body.content, 'i')

    
    Post.find({
        content: {$regex:regex},
    })
    .then(docs=>{
        const response = {
            count: docs.length

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
}
// get by category
exports.category_get = (req, res, next)=>{

    
    Post.find({
        categoryId: req.body.categoryId,
    })
    .then(docs=>{
        const response = {
            count: docs.length
            

        }
        //console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })


    })
}