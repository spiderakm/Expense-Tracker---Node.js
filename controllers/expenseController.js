const expensedatabase=require('../models/expenseModel')
const sequelize = require('../utils/db');
const userDb = require('../models/userModel')

//Adding the expense to the database
exports.addExpense=async(req,res)=>{
    try{
        const amount=req.body.amount
        const description=req.body.description
        const category=req.body.category
        const Id = req.user.id
        
        const data=await expensedatabase.create({
            amount:amount,
            description:description,
            category:category,
            UserId:Id
        })
        const totalExpenses = Number(req.user.totalAmount) + Number(amount)
        userDb.update({
            totalAmount : totalExpenses
        },{
            where: {id:req.user.id}
        }
        )

        res.json({newExpense:data})
    }
    catch(err){
        console.log(err)
        res.json({Error:err})
    }
}

//Fetching all the expenses from the database
exports.getExpense=async(req,res)=>{

    try{
        const id = req.user.id
        const data=await expensedatabase.findAll({where:{userId:id}})
        res.json({allExpenses:data})
    }catch(err){

        res.json({Error:err})
    }
}

//deleting the expense from the database
exports.deleteExpense=async(req,res)=>{
    try{
        const deleteExpenseId=req.params.id
        const data= await expensedatabase.findByPk(deleteExpenseId)
        const amount= data.dataValues.amount
        const totalExpenses = Number(req.user.totalAmount) - Number(amount)
        userDb.update({
            totalAmount : totalExpenses
        },{
            where: {id:req.user.id}
        }
        )
        await expensedatabase.destroy({where:{id:deleteExpenseId,UserId:req.user.id}})

    }catch(err){
        console.log("error in delete expense database")
        res.json({Error:err})
    }
}