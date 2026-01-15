const Blog = require('../models/blog')
const Comment = require('../models/comment');

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
    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");
    console.log(comments);
    return res.render('eachBlog',{
        user:req.user,
        blog,
        comments,
    });
}

async function handleComment(req,res){
    await Comment.create({
        content : req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
}


module.exports={handleBlog,handleEachBlog,handleComment};