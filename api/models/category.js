const mongoose= require("mongoose")
const { stringify } = require("querystring")

const Categoryschema = new mongoose.Schema(
    {
        categoryname:{
            type: String,
            required: true

        }

})



module.exports = mongoose.model("category", Categoryschema)