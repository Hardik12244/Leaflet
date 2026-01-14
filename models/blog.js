const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const blogSchema = new Schema({
    title:{
        type:String,
        requried:true,
    },
    body:{
        type:String,
        requried:true,
    },
    coverImage:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true})

const Blog = model("blog",blogSchema);
module.exports = Blog;