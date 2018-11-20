
//need expresso coffee
const express=require('express');
//body  is cut half (parse) and seprate into   part 
const bodyParser=require('body-parser');
//cookies is divided into pieces 
const cookieParser=require('cookie-parser');
// apple is making expresso
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
mongoose.Promise=global.Promise;
//mongoose is process connecting ...datadonkey 
mongoose.connect(process.env.DATABASE)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());

//========================
//      USERS
//========================
const port=process.env.PORT || 3002

const {User}=require('./models/user')
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,doc)=>{
        if(err) return res.json({sucess:false,err});
         res.status(200).json({
              sucess: true,
              userdata: doc

         })
    })
})

app.post('api/users/login',function(req,res){
    User.findOne({'email': req.body.email},(err,usar)=>{
        if(!user) return res.json({loginSucess: flase , message:'Auth fail email not found '});
    })
  


})

app.listen(port,()=>{
console.log(`server is running on ${port}`)
})
 