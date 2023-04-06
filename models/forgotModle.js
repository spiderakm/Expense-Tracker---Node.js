const Sequelize = require('sequelize')
const sequelize = require('../utils/db')


const forgotPassword=sequelize.define("forgotPassword",{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    isactive:Sequelize.BOOLEAN
})





module.exports=forgotPassword