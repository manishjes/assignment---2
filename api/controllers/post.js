const Post = require('../models/post')
const mongoose = require("mongoose")


// create post
exports.create_posts = (req,res, next)=>{
    const newPost = new Post({
        _id:  mongoose.Types.ObjectId(),
        categoryId: req.body.categoryId,
        title: req.body.title,
        content: req.body.content,
        createdBy: req.body.createdBy,
        created: req.body.created,
        slug: req.body.slug
        

    })
    newPost.save().then(result=>{
        console.log(result);
        res.status(201).json({result})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })

    
}

//get post
exports.get_posts = (req, res, next)=>{

    
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
// update post 
exports.update_post = (req, res, next)=>{
    
    const id = req.params.postId;
    
    Post.updateMany({ _id: id}, {$set: req.body})
    
    .then(result=>{
        console.log(result)
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

}

// delete post

exports.delete_post = (req, res, next)=>{
    
    const id = req.params.postId;
    Post.remove({_id: id}).exec().then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}