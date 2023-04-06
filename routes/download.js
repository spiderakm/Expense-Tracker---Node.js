const express = require('express')
const router = express.Router()
const authenticateUser = require('../middlewares/auth')
const expenseController = require('../controllers/expenseController')


router.get('/download',authenticateUser.userAuthontication,expenseController.downloadReport)


module.exports = router