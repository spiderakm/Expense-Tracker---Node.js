const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.Credentials(process.env.AWS_ACCESS_KEY, process.env.AWS_SECRET_KEY)
});
const dotenv = require('dotenv');

dotenv.config();




const uploadToS3 = (data,filename) => {
    
    try {
        const BUCKET_NAME = 'expensetrackrappdata';
        const IAM_USER_KEY = process.env.AWS_ACCESS_KEY
        const IAM_USER_SECERT = process.env.AWS_SECRET_KEY
        
    
        let s3bucket = new AWS.S3({
            accessKeyId:IAM_USER_KEY,
            secrectAccessKey:IAM_USER_SECERT
            
        })
    
            var params = {
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: data,
                ACL: 'public-read'
            }
            return new Promise((res,rej) => {
    
                s3bucket.upload(params, (err,s3response) => {
                    if(err){
                        rej('error in upload');
                        console.log(err);
    
                    }else{
                        
                        res(s3response.Location);
                        console.log(s3response.Location);
                        
                        
                    }
                })
        })
    
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    uploadToS3
}

