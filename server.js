const express = require("express")
const app = express();
const morgan = require("morgan")
const bodyparser = require("body-parser")
const mongoose = require ('mongoose');
const dotenv = require('dotenv').config();




const userRoutes = require('./api/routes/user')
const postRoutes = require('./api/routes/post')
const publicRoutes = require('./api/routes/public')

const categoryRoutes = require('./api/routes/categories')
const bodyParser = require("body-parser");
mongoose.set('strictQuery', false)
mongoose.connect(process.env.PORT_URI,{
    useNewUrlparser: true,
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-control-Allow-origin', '*')
    res.header('Access-control-Allow-header', "origin, X-Requested-with,  content-type, Accept, Authorization")
    if(req.method==='OPTIONS'){
        req.header('Access-control-Allow-header', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//route for handling request

app.use('/user', userRoutes)
app.use("/post", postRoutes)
app.use("/category", categoryRoutes)
app.use('/public', publicRoutes )


app.use((req,res, next)=>{
    const error  = new Error('not found');
    error.status = 404;
    next(error)
})
app.use((error, req,res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })


})
module.exports = app;