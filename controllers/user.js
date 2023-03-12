const path = require('path')

const User = require('../models/userModel')
const rootDir = path.dirname(require.main.filename);

exports.createNewUser = async (req,res) => {
    try {
        User.create({
            name:req.body.userName,
            email : req.body.userEmail,
            password : req.body.userPassword

        }).then((result) => {
            console.log(req.body.username,req.body.email,req.body.password)
            res.send("user created successfully")
        })
    } catch (error) {
        console.log(error);
    }
}

exports.checkUser = async (req,res) => {
      try{
        if(await User.findOne({
            where : {
                email : req.body.userEmail
            }
        })){
            return true;
        }
        return false;
    }
    catch(err){
        console.error(err);
    }
}

exports.signUppage = (req,res) => {
    res.sendFile(path.join(rootDir, 'public', 'signup.html'));
}