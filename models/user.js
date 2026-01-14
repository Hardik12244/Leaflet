const {createHmac, randomBytes} = require("crypto");
const mongoose = require("mongoose");
const { createToken } = require("../services/auth");
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
    const user = this;
    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(this.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})


userSchema.static("matchPassword",async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found")

    const salt = user.salt;
    const hashedPassword = user.password;

    const reHashing = createHmac("sha256",salt).update(password).digest("hex");
    
    if(reHashing!==hashedPassword) throw new Error("Incorrect password")
    
    const token = createToken(user)
    return token;
})


const User = model('User',userSchema);

module.exports = User;