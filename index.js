const express =require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {User}= require("./models/User");

//application/x--www-form-urlencoded 분석
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser);

//mongodb+srv://sunjae:<password>@boilerplate-thzoj.mongodb.net/test?retryWrites=true&w=majority

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sunjae:wldmsl0516@boilerplate-thzoj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
}).then(()=> console.log("연결 성공")).catch(err => console.log(err));

app.get('/',(req,res) => res.send('hello its me'));

app.post('/register',(req,res)=> {

    const user = new User(req.body);

    user.save((err,userInfo)=> {
        if(err) return res.json({success: false, err});

        return res.status(200).json({success:true});
    })

});

app.post('/login',(req,res)=> {
  
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

app.listen(port,()=>console.log('성공')); 