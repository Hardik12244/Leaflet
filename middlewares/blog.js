const path = require('path');
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// const storage = multer.diskStorage({
//     destination : function (req,file,cb){
//         cb(null,path.resolve(`./public/uploads/`))
//     },
//     filename : function (req,file,cb){
//         const fileName=`${Date.now()}-${file.originalname}`;
//         cb(null,fileName);
//     }
// }); 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blogs',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
});

const upload = multer({storage:storage});

module.exports = upload;