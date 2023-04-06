const express = require('express')
const router = express.Router()
const forgotController = require('../controllers/forgotPass')

router.post('/forgotpassword', forgotController.forgotpassword)

routes.get("/resetpassword/:id",forgotPassword.resetpassword)

routes.get("/updatepassword/:resetpassword",forgotPassword.updatepassword)

module.exports = router