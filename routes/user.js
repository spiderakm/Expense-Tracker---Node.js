const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/user')



router.get('/signup',controllerUser.signUppage)
router.post('/signup',controllerUser.createNewUser)
router.post('/checkUser',controllerUser.checkUser)



module.exports = router;