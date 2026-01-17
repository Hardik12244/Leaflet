require('dotenv').config();
const express = require("express");
const path = require("path");
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const { connectMongo } = require('./connect');
const cookieParser = require('cookie-parser');
const { checkauth } = require('./middlewares/auth');
const blog = require('./models/blog');

const app = express();
const port = 8000;
app.use(express.static(path.resolve('./public')))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkauth("token"));
app.use('/user', userRoute)
app.use('/blog', blogRoute)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', async (req, res) => {
    const allBlog = await blog.find({}).sort({ createdAt: -1 });;
    res.render("home", {
        user: req.user,
        blogs: allBlog,
    });
})
console.log("MONGO =", process.env.MONGO);

connectMongo(process.env.MONGO)
    .then(() => {
        app.listen(port, () => console.log("Server running on port 8000"));
        console.log("Db connected")
    })
    .catch((err) => console.log("error", err))

