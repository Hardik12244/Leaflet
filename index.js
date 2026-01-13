require('dotenv').config();
const express = require("express");
const path = require("path");
const userRoute = require('./routes/user')
const {connectMongo} = require('./connect');

const app = express();
const port = 8000;

app.use(express.urlencoded({extended:false}));

app.use('/user',userRoute)

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get('/',(req,res)=>{
    res.render("home");
})

connectMongo(process.env.MONGO)
    .then(()=>console.log("Db connected"))
    .catch((err)=>console.log("error",err))

app.listen(port,()=> console.log("connected at port 8000"));