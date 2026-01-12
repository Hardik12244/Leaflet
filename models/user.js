const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type : String,
        requried : true,
    },
    email:{
        type : String,
        requried: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    }
    
},{timestamps:true})