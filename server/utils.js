const AWS = require('aws-sdk');


const account = process.env.AWS_ACCOUNT_ID

exports.getTopicArn = topicName => {
    return `arn:aws:sns:us-west-1:${account}:${topicName}`;
}