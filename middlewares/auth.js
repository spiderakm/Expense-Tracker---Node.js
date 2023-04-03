
const User=require("../models/userModel")
const jwt=require("jsonwebtoken")


exports.userAuthontication= (req,res,next)=>{
  try{
      const token=req.header("Authorization")
      const user=jwt.verify(token,"44d210c98f36c60b0b0a336bd537fdd0305cefee41aa7e8d73aca3f150ab8f38265bb32731c2c3a296327027ce4ddf4a569d2aa9e5e9494badcb6e9eb66899ad")
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