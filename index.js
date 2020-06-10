const express =require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User}= require("./models/User");
const {auth} = require("./middleware/auth")

//application/x--www-form-urlencoded 분석
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

//mongodb+srv://sunjae:<password>@boilerplate-thzoj.mongodb.net/test?retryWrites=true&w=majority

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sunjae:wldmsl0516@boilerplate-thzoj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
}).then(()=> console.log("연결 성공")).catch(err => console.log(err));

app.get('/',(req,res) => res.send('hello its me'));

app.post('/api/users/register',(req,res)=> {

    const user = new User(req.body);

    user.save((err,userInfo)=> {
        if(err) return res.json({success: false, err});

        return res.status(200).json({success:true});
    })

});

app.post('/api/users/login',(req,res)=> {
  
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message: "등록된 이메일이 없습니다."
            });
        }

        user.comparePassword(req.body.password, (err, isMatch)=> {
            if(!isMatch)
            {
            
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                });
            }

            user.generateToken((err, user)=> {
                if(err) return res.status(400).send(err);
                
                
                //토큰 저장
                res.cookie("cookie",user.token).status(200).json({loginSuccess:true, userId: user._id});
            })
        });
    });

});

app.get('/api/users/auth',auth,(req,res)=> {

    res.status(200).json({

        _id: req.user.id,
        isAdmin:req.user.role === 0 ? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image

    })

});

app.get('/api/users/logout',auth,(req,res)=> {
    console.log("테스트");

    User.findOneAndUpdate({_id:req.user._id},
        {token: ""},
        (err,user)=> {
            if(err) return res.json({success:false, err});

            return res.status(200).send({
                success:true
            })
        });
});

app.listen(port,()=>console.log('성공')); 