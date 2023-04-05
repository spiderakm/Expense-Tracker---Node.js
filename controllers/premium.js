const User = require('../models/userModel')
const Expense = require('../models/expenseModel')
const sequelize = require('../utils/db')


exports.getLeaderBoard = async (req,res) => {
    try {
        const userAggrigatedExpenses = await User.findAll({


            order: [['totalAmount', 'DESC']]
        })




        res.status(200).json(userAggrigatedExpenses)
        


    } catch (error) {
        console.log(error);
    }
}

