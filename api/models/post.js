const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Postschema = mongoose.Schema(
    {
         _id: mongoose.Schema.Types.ObjectId,
        title:{
            type: String, 
            required: true,
            
        },
        categoryId:{
            type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true
        },
        content: {
            type: String, 
            required: true,

        },
        created: {

            type: Date, 
            // required: true,
            default: Date.now
        },
        createdBy:{
            type: String,
            required: true
        },

        slug: {
            type: String, 
            //required: true,
            slug: "content"
        }
        
        
        
        
    }
)





module.exports = mongoose.model("post", Postschema)