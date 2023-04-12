const dotenv = require('dotenv');
dotenv.config();

const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.PROCESS_MYSQL_DB_NAME,process.env.MYSQL_USER_NAME,process.env.MYSQL_PASSWORD,{
    dialect:process.env.MYSQL_DIALECT,
    host:process.env.MYSQL_HOST
})

module.exports = sequelize;