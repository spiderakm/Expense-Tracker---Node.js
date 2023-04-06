const sib=require("sib-api-v3-sdk")
const uuid=require("uuid")
const sgMail = require('@sendgrid/mail')
const encrypt=require("bcrypt")
require("dotenv").config()


const user = require('../models/userModel')
const forgotpassword = require('../models/forgotModle')

exports.forgotpassword=async(req,res)=>{
    try{
        const { email } =  req.body;
        
        const userFound=await user.findOne({where:{email:email}})
        if(userFound){
            // console.log(userFound.__proto__)
                const id=uuid.v4()
                userFound.createForgotPassword({
                        id,
                        isactive:true
                })
                sgMail.setApiKey(process.env.SENGRID_API_KEY)
            
                const msg = {
                    to: email, // Change to your recipient
                    from: 'spider.akm@gmail.com', // Change to your verified sender
                    subject: 'Reset Password link',
                    text: 'click the reset password button to reset the password',
                    html: `<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`,
                }
                sgMail
                .send(msg)
                .then((response) => {
    
                    console.log(response[0].statusCode)

                    return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})
    
                })
                .catch((error) => {
                    throw new Error(error);
                })
        }
 
            

    }catch(err){
        console.log("error in forgot password-->",err)
        res.json({Error:err})
    }

}
exports.updatepassword=async (req,res)=>{
    try{
        const { newpassword } = req.query;
        const {resetpassword}=req.params
        const findUser=  await forgotpassword.findOne({where:{id:resetpassword}})
        const data=await user.findOne({where:{id:findUser.userId}})
       if(data){
        encrypt.hash(newpassword,10,async(err,hash)=>{
            if(err){
                res.json({Error:err})
            }     
            const data2=await data.update({password:hash}) 
             res.json({data:data2})
        })
    }
    }catch(err){
        console.log("update passwor error-->",err)
        res.json({Error:err})
    }
   
}