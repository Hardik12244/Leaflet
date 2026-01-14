const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

function createToken(user){
    const payload = {
        _id: user._id,
        email:user.email,
        role:user.role,
        profileImage:user.profilePicture
    }
    const token = jwt.sign(payload,SECRET);
    return token;
}

function checkToken(token){
    const payload = jwt.verify(token,SECRET)
    return payload;
}

module.exports={
    createToken,
    checkToken
}