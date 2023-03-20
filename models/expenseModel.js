const Sequelize = require('sequelize')
const sequelize = require("../utils/db")

const expensedb=sequelize.define("expenseDetail",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    amount:{
        type:Sequelize.BIGINT
    },
    description:{
        type:Sequelize.STRING
    },
    category:{
        type:Sequelize.STRING
    }
})

module.exports=expensedb