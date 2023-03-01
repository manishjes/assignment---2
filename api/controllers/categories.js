const Category = require('../models/category')
const mongoose = require("mongoose")

// create category

exports.create_category = (req,res, next)=>{
    const newCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryname: req.body.categoryname
        

    })
    newCategory.save().then(result=>{
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

// get category

exports.get_category = (req, res, next)=>{
    
    Category.find()
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

// update category

exports.update_category = (req, res, next)=>{
    
    const id = req.params.categoryId;
    
    Category.updateMany({ _id: id}, {$set: req.body})
    
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

// delete category

exports.delete_category = (req, res, next)=>{
    
    const id = req.params.categoryId;
    Category.findByIdAndRemove({_id: id}).exec().then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}