const express =require('express');
const app = express();
const port = 5000;

//mongodb+srv://sunjae:<password>@boilerplate-thzoj.mongodb.net/test?retryWrites=true&w=majority

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sunjae:wldmsl0516@boilerplate-thzoj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
}).then(()=> console.log("연결 성공")).catch(err => console.log(err));

app.get('/',(req,res) => res.send('hello'));

app.listen(port,()=>console.log('성공'));