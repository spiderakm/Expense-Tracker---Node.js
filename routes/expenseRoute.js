const express = require('express')
const router = express.Router()
const Userauthentication = require('../middlewares/auth.js')
const expenseController = require('../controllers/expenseController')



router.post("/add-expense",expenseController.addExpense)

router.get("/get-expense",Userauthentication.Authentication,expenseController.getExpense)

router.delete("/delete-expense/:id",expenseController.deleteExpense)


module.exports = router