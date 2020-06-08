const {User} = require("../models/User");

let auth = (req, res,next) => {

    //인증처리
    let token =req.cookies.cookies;

    User.findByToken(token,(err,user)=> {
        if(err) throw err;

        if(!uesr) return res.json({isAuth: false, error:true});

        req.token = token;
        req.user = user;

        next();
    })
     
}


module.exports = {auth};