const User = require('../models/userModel')
const Expense = require('../models/expenseModel')
const sequelize = require('../utils/db')


exports.getLeaderBoard = async (req,res) => {
    try {
        const userAggrigatedExpenses = await User.findAll({
            attributes:["id","name",[sequelize.fn("sum",sequelize.col("expenseDetails.amount")),"totalCost"]],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['User.id'],
            order: [['totalCost', 'DESC']]
        })




        console.log(userAggrigatedExpenses);
        res.status(200).json(userAggrigatedExpenses)
        


    } catch (error) {
        console.log(error);
    }
}

