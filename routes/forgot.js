const express = require('express')
const router = express.Router()
const forgotController = require('../controllers/forgotPass')

router.post("/forgotpassword",forgotController.forgotPassword)

module.exports = router