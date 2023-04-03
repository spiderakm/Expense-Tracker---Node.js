const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")

const signup=require("./routes/user")
const expenseDetail=require("./routes/expenseRoute")
const orderRoute = require('./routes/order')

const sequelize=require("./utils/db")
const User=require("./models/userModel")
const Expense=require("./models/expenseModel")
const Order = require('./models/orderModel')

const app=express()
app.use(cors())
app.use(bodyParser.json())

app.use("/user",signup)
app.use("/expense",expenseDetail)
app.use("/purchase",orderRoute)




//create relations
User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)



sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch((err)=>console.log("sync err-->",err))