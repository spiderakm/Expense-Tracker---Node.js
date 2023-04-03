const express = require('express')
const router = express.Router()

const purchaseController = require('../controllers/purchase')
const authMiddleware = require('../middlewares/auth')

router.get("/premium-membership",authMiddleware.userAuthontication,purchaseController.getPremium)

router.post("/updatePremium",authMiddleware.userAuthontication,purchaseController.updatePremiumStatus)

module.exports=router;
