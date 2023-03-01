const User = require('../models/user')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { request } = require('../../server')


// user signup

exports.signup_user = (req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if (user.length>=1){
            return res.status(409).json({
                message: 'mail exists'
            })
        } else{bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if (err){
                return res.status(500).json({
                    error:err
                    
                })
            } else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    token : " "

                })
                user
                .save()
                .then(result=>{
                    console.log(result)
                    res.status(201).json({
                        message: 'User is created'
                    })
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })

            }
        })

            
        }
    })
    
    
         
    
    }


    // user login

    exports.login_user = (req, res, next)=>{
        User.find({email: req.body.email})
        .exec()
        .then(user=>{
            if(user.length<1){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
           bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message : 'Auto failed'
                })
            }
            if(result){
               const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                )
                User.updateOne({_id: user[0]._id}, {token: token})
                .exec()
                .then(result=>{
                    console.log('Token saved to user:', user[0].email)
                    
                })
                .catch(err =>{
                    console.log('Error updating user:', err)
                })
                res.status(200).json({
                    message: 'auth successful',
                    token:token
                })
            }
            res.status(401)
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })

                

    }

    // user logout

    exports.logout_user = (req,res, next)=>{
        const userId = req.userData.userId;
        console.log(userId);
        User.findById(userId)
        .then(user =>{
            user.token = " ";
            user.save()
            .then(result=>{
                res.status(200).json({message: "User log out successfully"})
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({error:err})

            })
        })

            .catch(err =>{
                console.log(err)
                res.status(500).json({error: err})
            
        })
        
    }


    // user deleted

    exports.deleted_user = (req,res, next)=>{
        User.remove({_id: req.params.userId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'user deleted'
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

    