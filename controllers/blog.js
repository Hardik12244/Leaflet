const Blog = require('../models/blog')

async function handleBlog(req,res){
    const {title,body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImage:`/uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`)
}

async function handleEachBlog(req,res){
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    console.log(blog);
    return res.render('eachBlog',{
        user:req.user,
        blog,
    });
}
module.exports={handleBlog,handleEachBlog};