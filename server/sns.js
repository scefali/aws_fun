const AWS = require('aws-sdk')




const sns = new AWS.SNS({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-west-1'
})



module.exports = sns