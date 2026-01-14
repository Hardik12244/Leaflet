const express = require('express');
const router = express.Router();

router.get('/addBlog',(req,res)=>{
    return res.render('blog',{
        user:req.user,
    });
})

module.exports = router;