const AWS = require('aws-sdk');


const account = process.env.AWS_ACCOUNT_ID;

const sns = new AWS.SNS({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-west-1'
});

// const topicParams = {
//     Name: 'TOPIC' /* required */
// };

// let TopicArn;

// sns.Topic(topicParams, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data); // successful response
//     TopicArn = data.TopicArn;
// });

//TopicArn = `arn:aws:sns:us-west-1:${account}:TOPIC`;


//TODO Finish
exports.subscribeEmail = (req, res) => {
    const TopicArn = getTopicArn(req.body.topicName)
    const params = {
        Protocol: 'email',
        /* required */
        TopicArn,
        /* required */
        Endpoint: req.body.email
    };
    sns.subscribe(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            res.status(500).send(err)
        } else {
            console.log(data); // successful response
            res.send(data)
        }
    });
}

exports.unsubscribeEmail = (req, res) => {
    const TopicArn = getTopicArn(req.body.topicName)
    var params = {
        Protocol: 'email',
        /* required */
        TopicArn,
        /* required */
        Endpoint: req.body.email
    };
    sns.unsubscribe(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            res.status(500).send(err)
        } else {
            console.log(data); // successful response
            res.send(data)
        }
    });
}



exports.sendMessage = (req, res) => {
    console.log('got request in send email', req.body);
    const TopicArn = getTopicArn(req.body.topicName)
    var params = {
        Message: req.body.message,
        Subject: req.body.subject,
        TopicArn
    };
    sns.publish(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            res.status(400).send(err)
        } else {
            console.log(data);
            //TODO: better response
            res.send({
                origin: req.headers.origin,
                host: req.headers.host
            })
        }
    });
}