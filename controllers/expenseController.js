const expensedatabase=require('../models/expenseModel')
const sequelize = require('../utils/db');
const userDb = require('../models/userModel')
const AWS = require('aws-sdk')

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
        const id = req.user.id
        const expense=await expensedatabase.findAll({where:{userId:id}})
    
        const stringFilezExpense = JSON.stringify(expense)
        const expenseFile = '/tmp/uploadtos3.txt'
        const fileName = await uploadToS3(stringFilezExpense, expenseFile);
        console.log(fileName);
        res.status(201).json({ fileName, success:true })
    } catch (error) {
        console.log('error in file download',error);
    }


}

function uploadToS3(data,filename) {
    
    try {
        const BUCKET_NAME = 'expensetrackrappdata';
        const IAM_USER_KEY = process.env.IAM_USER_KEY
        const IAM_USER_SECERT = process.env.IAM_USER_SECERT
        
    
        let s3bucket = new AWS.S3({
            accessKeyId:IAM_USER_KEY,
            secrectAccessKey:IAM_USER_SECERT
        })
    
            var params = {
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: data
            }
            return new Promise((res,rej) => {
    
                s3bucket.upload(params, (err,s3response) => {
                    if(err){
                        rej('error in upload');
    
                    }else{
                        console.log("kjbcdjk");
                        res('success',s3response);
                        
                    }
                })
        })
    
    } catch (error) {
        console.log(error);
    }

}