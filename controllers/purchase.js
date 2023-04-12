const Razorpay = require('razorpay')
const orderDb = require('../models/orderModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

exports.getPremium = async (req,res,next) =>{
    try {
        const Razor = new Razorpay({
            key_id : process.env.RAZOR_PAY_KEY_ID,
            key_secret : process.env.RAZOR_PAY_KEY_SECRET
        })
        const amount = process.env.RAZOR_PAy_AMOUNT;
        Razor.orders.create({amount,currency:"INR"},async(err,order) => {
            if(err){
                throw new Error("Error while starting order")
            }
            await orderDb.create(
                {
                    orderId:order.id,
                    status:"pending",
                    UserId:req.user.id
                }
            )
            res.json({order,key_id:Razor.key_id})
        })



    } catch (error) {
        console.log("error in getpremium");
    }
}
function genrateToken(id,premium){
    return jwt.sign({ UserId : id,premium },process.env.JWT_SECRET_KEY)
}


exports.updatePremiumStatus = async (req,res,next) => {
    try {
        const paymentid=req.body.payment_id
        const orderid=req.body.order_id
        
        const result=await orderDb.findOne({where:{orderId:orderid}})
        
        if(paymentid===null){
            res.json({message:"payment is failed"})
          return  result.update({paymentId:paymentid,status:"FAILED"})
        }
        function updateTable(result){
           return new Promise((resolve)=>{
                resolve(result.update({paymentId:paymentid,status:"SUCCESS"}))
           }) 
        }
        function updateUserTable(){
            return new Promise((resolve)=>{
               resolve(req.user.update({premium:true}))
            })
        }
        Promise.all([updateTable(result),updateUserTable()]).then(()=>{
            res.json({success:true,message:"Premium purchased successfully You are now a premium user",token:genrateToken(req.user.id,true)})
        })




    } catch (error) {
        console.log("error in updatepremium");
    }
}