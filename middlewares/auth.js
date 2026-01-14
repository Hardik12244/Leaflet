const { checkToken } = require("../services/auth");

function checkauth(cookie){
  return(req,res,next) =>{
    const tokenCookie = req.cookies[cookie];
    if(!tokenCookie) {
        return next();
    }
        try{
            const payload = checkToken(tokenCookie)
            req.user = payload;
            console.log(tokenCookie,cookie,payload);
        } catch(error){}
        return next();
  } 
}
module.exports = {
    checkauth,
}