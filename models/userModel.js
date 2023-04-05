const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define('User',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNul : false
    },
    name : {
        type : Sequelize.STRING,
        allowNul : false
    },
    email : {
        type : Sequelize.STRING,
        unique : true,
        allowNul : false
    },
    password : {
        type : Sequelize.STRING,
        allowNul : false
    },
    premium:Sequelize.BOOLEAN,
    totalAmount:{
        type : Sequelize.BIGINT,
        defaultValue : 0
    }
})

module.exports = User;