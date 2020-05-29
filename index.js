const express =require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const {User}= require("./models/User");

//application/x--www-form-urlencoded 분석
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

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

app.listen(port,()=>console.log('성공')); 