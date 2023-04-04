const User = require('../models/userModel')
const Expense = require('../models/expenseModel')
const sequelize = require('../utils/db')
const { use } = require('../routes/user')

exports.getLeaderBoard = async (req,res) => {
    try {
        const users = await User.findAll({
            attributes: ['id','name']
        })
        const userAggrigatedExpenses = await Expense.findAll({
            attributes: ['UserId',[sequelize.fn('sum',sequelize.col('expenses.amount')),'totalCost']],
            group: ['UserId']
        })

        
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

