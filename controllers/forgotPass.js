const Sib = require('sib-api-v3-sdk')
require('dotenv').config()

exports.forgotPassword = async (req,res) => {
    try {   
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.API_KEY
        const transEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email : 'spider.akm@gmail.com'
        }
        const receivers = [
            {
                email : 'spider.akm@gmail.com'
            }
        ]
        const data= await transEmailApi.sendTransacEmail({
            sender,
            to:receivers,
            subject:"forgot password link",
            textContent:"enter password"
        })
        console.log(data);


    } catch (error) {
        console.log(error);
    }
}

