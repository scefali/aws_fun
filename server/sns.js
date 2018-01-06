const AWS = require('aws-sdk')




const sns = new AWS.SNS({
    region: 'us-west-1'
})



module.exports = sns