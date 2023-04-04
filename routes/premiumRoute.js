const express = require('express')
const router = express.Router()

const premiumController = require("../controllers/premium")
const AuthMiddleware = require('../middlewares/auth')

router.get("/leaderBoard",AuthMiddleware.userAuthontication,premiumController.getLeaderBoard)

module.exports = router