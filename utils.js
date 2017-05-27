const AWS = require('aws-sdk');



const account = process.env.AWS_ACCOUNT_ID;

const sns = new AWS.SNS({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-west-1'
});

const topicParams = {
    Name: 'TOPIC' /* required */
};

let TopicArn;

sns.createTopic(topicParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    TopicArn = data.TopicArn;
});



//TODO Finish
exports.subscribeEmail = (req, res) => {
    console.log('got request', req.body);

    var params = {
        Protocol: 'email',
        /* required */
        TopicArn: TopicArn,
        /* required */
        Endpoint: req.body.email
    };
    sns.subscribe(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
}


exports.sendEmail = (req, res) => {
    var params = {
        Message: req.body.message,
        /* required */
        // MessageAttributes: {
        //     '<String>': {
        //         DataType: 'STRING_VALUE',
        //         /* required */
        //         BinaryValue: new Buffer('...') || 'STRING_VALUE',
        //         StringValue: 'STRING_VALUE'
        //     },
        //     /* '<String>': ... */
        // },
        // MessageStructure: 'STRING_VALUE',
        // PhoneNumber: '',
        Subject: req.body.subject,
        // TargetArn: 'STRING_VALUE',
        TopicArn: TopicArn
    };
    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);
            res.send(data);
        } // successful response
    });
}