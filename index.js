require('dotenv').config();
const express = require("express");
const path = require("path");
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const {connectMongo} = require('./connect');
const cookieParser = require('cookie-parser');
const { checkauth } = require('./middlewares/auth');

const app = express();
const port = 8000;

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.use(checkauth("token"));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get('/',(req,res)=>{
    res.render("home",{
        user:req.user,
    });
})

connectMongo(process.env.MONGO)
    .then(()=>console.log("Db connected"))
    .catch((err)=>console.log("error",err))

app.listen(port,()=> console.log("connected at port 8000"));