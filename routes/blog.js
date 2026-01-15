const express = require('express');
const router = express.Router();
const upload = require('../middlewares/blog');
const { handleBlog, handleEachBlog, handleComment } = require('../controllers/blog');


router.get('/addBlog',(req,res)=>{
    return res.render('blog',{
        user:req.user,
    });
})

router.post('/',upload.single("coverImage"),handleBlog);

router.get("/:id",handleEachBlog);

router.post('/comment/:blogId',handleComment);

module.exports = router;