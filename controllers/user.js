
const User = require('../models/userModel');
const bcrypt =  require('bcrypt')
const {
    validateName,
    validateEmail,
    validatePassword
  } = require('../utils/validate')



exports.createNewUser = async (req, res) => {
    try{
        const{name,email,password} = req.body;
        console.log(name,email,password)

        const user =  await User.findOne({
            where:{
                email
            }
        })
        
        
        if(!validateName(name)){
            res.json({success:false,message:"Invalid name plese enter a valid name"})
          }
      
          if(!validateEmail(email)){
            res.json({success:false,message:"Invalid name plese enter a valid email"})
          }
      
          if(!validatePassword(password)){
            res.json({success:false,message:"Invalid name plese enter a valid password"})
          }
        const Epassword = await bcrypt.hash(password,10)
        
        if(!user){
            User.create({
                name,
                email,
                password: Epassword
            }).then(() => {
                res.json({success:true,message:"Account Created Successfully"})
            }).catch((err) => console.log(err))
        }else{
            res.json({success:false,message:"Email Already Exist Please Login"})
        }
        

 
    }
    catch(err){
        console.error(err);
    }
}



exports.authenticateUser = async (req,res) => {
    try {
        const user = await User.findOne({
            where:{
                email:req.body.email
            }
        });
        if(!user){
            res.json({success:false,message:"User not found please Signup"})
        }else{
            const passwordMatch = await bcrypt.compare(req.body.password,user.password)
            if(passwordMatch){
                // res.redirect("http://localhost:4000/expense/add-expense")   
                res.json({success:"Successfully logged In"})
            }else{
                res.json({success:false,message:"Wrong Email or Password"})
            }
        }

    } catch (error) {
        console.log(error);
    }
}