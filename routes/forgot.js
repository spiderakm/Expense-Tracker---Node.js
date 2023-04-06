const express = require('express')
const router = express.Router()
const forgotController = require('../controllers/forgotPass')

router.post('/forgotpassword', forgotController.forgotpassword)

router.get('/resetpassword/:id',forgotController.resetpasswor)

router.get("/updatepassword/:resetpassword",forgotController.updatepassword)

module.exports = router