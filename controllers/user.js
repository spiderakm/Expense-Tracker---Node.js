const path = require('path');
const User = require('../models/userModel');

const rootDir = path.dirname(require.main.filename);

exports.signupForm = (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'signup.html'));
}

exports.loginForm = (req,res) => {
    res.sendFile(path.join(rootDir, 'public', 'login.html'));
}

exports.createNewUser = async (req, res) => {
    try{
        User.create({
            name: req.body.userName,
            email: req.body.userEmail,
            password: req.body.userPassword
        }).then(result => {
            res.send('User Created Successfully');
        }).catch(err => {
            res.send('Something went wrong!')
        }); 
    }
    catch(err){
        console.error(err);
    }
}

exports.checkUser = async (req, res) =>{
    try{
        if(await User.findOne({
            where : {
                email : req.params.userEmail
            }
        })){
            res.send(true);
        }
        else{
            res.send(false);
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
                email:req.body.userEmail
            }
        });
        if(!user){
            res.status(404).send("user not found please Signup")
        }else{
            if(user.password === req.body.userPassword){
                res.send("User logged in Succesfully")
            }else{
                res.status(401).send("user not authorized")
            }
        }
    } catch (error) {
        console.log(error);
    }
}