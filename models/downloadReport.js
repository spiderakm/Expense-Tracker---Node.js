const Sequelize = require('sequelize')
const sequelize = require('../utils/db')


const downloadDb = sequelize.define("Reports",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    url: {
        allowNull:false,
        type:Sequelize.STRING
    },time: Sequelize.STRING
})

module.exports = downloadDb;