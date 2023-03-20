const express = require('express')
const router = express.Router();

const userController = require('../controllers/user');
//signup
router.post('/signup', userController.createNewUser);

//signin

router.post('/login',userController.authenticateUser)


module.exports = router;