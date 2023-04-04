const Razorpay = require('razorpay')
const orderDb = require('../models/orderModel')
const jwt = require('jsonwebtoken')
exports.getPremium = async (req,res,next) =>{
    try {
        const Razor = new Razorpay({
            key_id:"rzp_test_MBxgSv9nzhBJfJ",
            key_secret:"a2uTbklHT3RyfS8D0xIQ1ix5"
        })
        const amount = 3000
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
        console.log(error);
    }
}
function genrateToken(id,premium){
    return jwt.sign({ UserId : id,premium },"44d210c98f36c60b0b0a336bd537fdd0305cefee41aa7e8d73aca3f150ab8f38265bb32731c2c3a296327027ce4ddf4a569d2aa9e5e9494badcb6e9eb66899ad")
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
        console.log(error);
    }
}