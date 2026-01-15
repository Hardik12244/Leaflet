const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const commentSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"Blog",
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

const Comment = model("comment",commentSchema);
module.exports = Comment;