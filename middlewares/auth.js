
const User=require("../models/userModel")
const jwt=require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config();

exports.userAuthontication= (req,res,next)=>{
  try{
      const token=req.header("Authorization")
      const user=jwt.verify(token,process.env.JWT_SECRET_KEY)
      console.log("userid is ",user)
      User.findByPk(user.UserId).then(user => {
        console.log(JSON.stringify(user))
        req.user = user
        next()
      }).catch(err => console.log(err))
      
      
      
  }catch(err){
    
    console.log(err);
  }
  
}