const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const SALT_I=10;
require('dotenv').config();
const userSchema=mongoose.Schema({
    email:{
        type: String,
        require:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        require:true,
        minlenth:5
    },
    name:{
      type:String,
      require:true,
       maxlength:100,

    },
    lastname:{
        type:String,
        require:true,
        maxlength:100
    },
    cart:{
        type:Array,
        default:[]
    },
    history:{
      type:Array,
      default:[]
    },
    role:{
     type:Number,
     default:0
    },
   token:{
       type:String
   }    
})
userSchema.pre('save',function(next){
   var user=this;
   if(user.isModified('password')){
    bcrypt.genSalt(SALT_I,function(err,salt){
        if(err)return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) return next(err);
            user.password=hash;
            next();
        })
        })
   }else{
       next()
   }
 

})

userSchema.methods.comparePassword=function(password,cb){
    bcrypt.compare(password,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,ismatch);
    })
  }
  userSchema.methods.generateToken=function(){
    var user=this;
    //var token=jwt.sign(user._id.teHexString(),process.env.SECRET)
    
  }
const User=mongoose.model('User',userSchema);
module.exports={User}