const Blog = require('../models/blog')

async function handleBlog(req,res){
    const {title,body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImage:`uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`)
}

module.exports={handleBlog};