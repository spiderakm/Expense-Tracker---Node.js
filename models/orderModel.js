const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const orderDb = sequelize.define("order",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING
})

module.exports = orderDb;