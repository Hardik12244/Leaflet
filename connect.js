const mongoose = require("mongoose");
require('dotenv').config();

async function connectMongo(url){
    return mongoose.connect(url);
}

module.exports = {
    connectMongo,
}