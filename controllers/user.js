const path = require('path');
const User = require('../models/userModel');

const rootDir = path.dirname(require.main.filename);

exports.signupForm = (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'signup.html'));
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

