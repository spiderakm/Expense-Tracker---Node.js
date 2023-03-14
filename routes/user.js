const express = require('express')
const router = express.Router();

const userController = require('../controllers/user');
//signup
router.get('/signup', userController.signupForm);

router.post('/signup', userController.createNewUser);

//signin

router.get('/login',userController.loginForm)
router.post('/login',userController.authenticateUser)


module.exports = router;