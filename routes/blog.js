const express = require('express');
const router = express.Router();
const upload = require('../middlewares/blog');
const { handleBlog } = require('../controllers/blog');

router.get('/addBlog',(req,res)=>{
    return res.render('blog',{
        user:req.user,
    });
})

router.post('/',upload.single("coverImage"),handleBlog);


module.exports = router;