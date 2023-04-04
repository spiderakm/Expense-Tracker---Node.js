const User = require('../models/userModel')
const Expense = require('../models/expenseModel')
const sequelize = require('../utils/db')
const { use } = require('../routes/user')

exports.getLeaderBoard = async (req,res) => {
    try {
        const users = await User.findAll()
        const expenses = await Expense.findAll()
        const userAggrigatedExpenses = {}
        expenses.forEach(expense => {
            if(userAggrigatedExpenses[expense.UserId]){
                userAggrigatedExpenses[expense.UserId] = userAggrigatedExpenses[expense.UserId] + expense.amount
            }else{
                userAggrigatedExpenses[expense.UserId] = expense.amount
            }
            
        });
        var userLeaderBoardDetails = []
        users.forEach((user) => {
            userLeaderBoardDetails.push({name:user.name,totalCost : userAggrigatedExpenses[user.id]})
        })


        console.log(userLeaderBoardDetails);
        res.status(200).json(userLeaderBoardDetails)
        


    } catch (error) {
        console.log(error);
    }
}

