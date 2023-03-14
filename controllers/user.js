const path = require('path');
const User = require('../models/userModel');
const bcrypt =  require('bcrypt')
const rootDir = path.dirname(require.main.filename);

exports.signupForm = (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'signup.html'));
}

exports.loginForm = (req,res) => {
    res.sendFile(path.join(rootDir, 'public', 'login.html'));
}

exports.createNewUser = async (req, res) => {
    try{
        const user =  await User.findOne({
            where:{
                email:req.body.userEmail
            }
        })
        
        if(!user){
            encryptPassword = await bcrypt.hash(req.body.userPassword,10)

            User.create({
                name: req.body.userName,
                email: req.body.userEmail,
                password: encryptPassword
            }).then(result => {
                
                res.send('User Created Successfully');
            }).catch(err => {
                res.send('Something went wrong!')
            })
            
        }else{
            res.send("Email Already Exist Please Login")
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
            const passwordMatch = await bcrypt.compare(req.body.userPassword,user.password)
            if(passwordMatch){
                res.redirect("http://localhost:4000/expense/add-expense")   
                // res.send("User logged in Succesfully")
            }else{
                res.status(401).send("Wrong Email or Password")
            }
        }

    } catch (error) {
        console.log(error);
    }
}