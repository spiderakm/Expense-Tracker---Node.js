const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")

const signup=require("./routes/user")
const expenseDetail=require("./routes/expenseRoute")
const sequelize=require("./utils/db")

const User=require("./models/userModel")
const Expense=require("./models/expenseModel")

const app=express()
app.use(cors())
app.use(bodyParser.json())

app.use("/user",signup)

app.use("/expense",expenseDetail)

//create relations
User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch((err)=>console.log("sync err-->",err))