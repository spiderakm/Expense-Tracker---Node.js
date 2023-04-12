
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
        console.log("error in forgot password-")
        res.json({Error:err})
    }

}
exports.resetpasswor = async (req,res) => {
    const id = req.params.id;
    forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>
            <style>
            body{
               justify-content: center;
               text-align: center;   
           }
           input{
               border-radius: 15px;
               padding: 25px;
               margin-bottom: 10px;
               width:60%
           }
           button{
               color: white;
               background-color: rgb(73, 188, 73);
               padding: 10px 28px;
               text-align: center;
               font-family: inherit;
               font-weight: bold;
               font-size: large;
               border-radius: 20px;   
           }
           header{
               background-color: rgb(20, 117, 156);
               color: white;
               padding-top:86px ;
               margin-bottom:15px;
               height: 300px
           }
           label{
               font-family: inherit;
               font-size: 30px;
            }
            </style>
            <body>
               <header>
                   <h1>Enter your New Password<h1>
               </header>
            <form action="/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input><br><br>
                <button>reset password</button>
            </form>
            </body>
        </html>`
        )
            res.end()
        }
    })
}



exports.updatepassword=async (req,res)=>{
    try{
        const { newpassword } = req.query;
        const { resetpassword  }=req.params


        const findUser=  await forgotpassword.findOne({where:{id:resetpassword}})
        const data=await user.findOne({where:{id:findUser.UserId}})

       if(data){
        encrypt.hash(newpassword,10,async(err,hash)=>{
            if(err){
                res.json({Error:err})
            }     
            const data2=await data.update({password:hash}) 
             res.send("successfully updated")
        })
    }
    }catch(err){
        console.log("update passwor error-")
        res.json({Error:err})
    }
   
}