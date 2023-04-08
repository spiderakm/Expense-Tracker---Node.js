const express = require('express')
const router = express.Router()
const Userauthentication = require('../middlewares/auth.js')
const expenseController = require('../controllers/expenseController')



router.post("/add-expense",Userauthentication.userAuthontication,expenseController.addExpense)

router.get("/get-expense",Userauthentication.userAuthontication,expenseController.getExpense)

router.delete("/delete-expense/:id",Userauthentication.userAuthontication,expenseController.deleteExpense)

router.get("/pagination",Userauthentication.userAuthontication,expenseController.paginateExpenses)


module.exports = router;