const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const allDetails = sequelize.define("allExpenses",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    amount:{
        type:Sequelize.BIGINT,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }


})

module.exports = allDetails