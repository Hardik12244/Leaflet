const User = require('../models/user');

async function handleUserSignUp(req,res){
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    })
}
module.exports = {handleUserSignUp};