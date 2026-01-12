const {createHmac, randomBytes} = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    fullName:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required: true,
        unique: true,
    },
    salt:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"/images/profilePic.png"
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER",
    },

},{timestamps:true})

userSchema.pre("save", function(next){
    
    if(!this.user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})



const User = model('User',userSchema);

module.exports = User;