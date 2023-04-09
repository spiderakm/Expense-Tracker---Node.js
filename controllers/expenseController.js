const expensedatabase=require('../models/expenseModel')
const sequelize = require('../utils/db');
const userDb = require('../models/userModel')
const downloadDb = require('../models/downloadReport')
const S3service = require('../services/S3service')

//Adding the expense to the database
exports.addExpense=async(req,res)=>{
    const t = await sequelize.transaction()
    try{
        const {amount,description,category} = req.body;
        const data = await expensedatabase.create(
            { amount, description, category, UserId: req.user.id },
            { transaction: t }
          );
        const totalExpenses = Number(req.user.totalAmount) + Number(amount)
        await userDb.update(
            { totalAmount: totalExpenses },
            { where: { id: req.user.id }, transaction: t } 
          );
        await t.commit();
        res.json({newExpense:data})
    }
    catch(err){
        console.log(err)
        await t.rollback();
        res.json({Error:err})
    }
}

//Fetching all the expenses from the database
exports.getExpense=async(req,res)=>{

    try{
        totalamtdb=req.user
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

exports.UploadReport = async (req,res) => {
    try {
        if(req.user.premium === null){
            res.status(401).send("You are not eligble please take premium subscription")
        }else{
            const id = req.user.id
            const expense=await expensedatabase.findAll({where:{userId:id}})
        
            const stringFilezExpense = JSON.stringify(expense)
            const expenseFile = `Expense${id}/${new Date()}.txt`;
            const fileUrl = await S3service.uploadToS3(stringFilezExpense, expenseFile);
            console.log(fileUrl);
            const timedate = `${new Date()}`
            const data = await downloadDb.create({
                url: fileUrl,
                UserId: id,
                time: timedate
            })
            const fetchData=await downloadDb.findAll({where:{UserId:id}})

            res.json({url:fileUrl,alldata:fetchData,success:true})
        

        }

        


        
    } catch (error) {
        console.log("error in download file",err)
        res.json({Error:err})
    }


}



exports.paginateExpenses=async(req,res)=>{
    try{
        const page=req.query.page
        const pagesize=req.query.pagesize
        const limits=+pagesize
      const data=  await expensedatabase.findAll({
        offset:(page-1)*pagesize,
        limit:limits,
        where: { UserId:req.user.id }
    })
      res.json({Data:data})
    }catch(err){
        console.log("pagination error-->",err)
        res.json({Error:err})
    }
}