const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const dotenv = require('dotenv');
dotenv.config();
const fs=require("fs")
const path=require("path")
const helmet = require('helmet')



const signup=require("./routes/user")
const expenseDetail=require("./routes/expenseRoute")
const orderRoute = require('./routes/order')
const premiumRoute = require('./routes/premiumRoute')
const forgotRoute = require('./routes/forgot')
const downloadReport = require('./routes/download')



const sequelize=require("./utils/db")
const User=require("./models/userModel")
const Expense=require("./models/expenseModel")
const Order = require('./models/orderModel')
const ForgotPassword = require('./models/forgotModle')
const downloadReportModel = require('./models/downloadReport')


const app=express()





app.use(cors())
app.use(bodyParser.json())

app.use("/user",signup)
app.use("/expense",expenseDetail)
app.use("/purchase",orderRoute)
app.use("/premium",premiumRoute)
app.use("/password",forgotRoute)
app.use("/user",downloadReport)



app.use((req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,`views/${req.url}`))
})



//create relations
User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User)

User.hasMany(downloadReportModel)
downloadReportModel.belongsTo(User)


sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT || 4000)
})
.catch((err)=>console.log("sync err-->",err))


