const path = require('path');
const express = require('express');
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



module.exports = app => {
    // catch 404 and forward to error handler


    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    app.use('/static', express.static(__dirname + '/static'));

    //TODO: Use static path instead of html markup
    //app.use('/', express.static(path.join(__dirname, 'src')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
    });

    app.post('/email', (req, res) => {
        console.log('got request', req.body);

        var params = {
            Message: 'STRING_VALUE',
            /* required */
            MessageAttributes: {
                '<String>': {
                    DataType: 'STRING_VALUE',
                    /* required */
                    BinaryValue: new Buffer('...') || 'STRING_VALUE',
                    StringValue: 'STRING_VALUE'
                },
                /* '<String>': ... */
            },
            MessageStructure: 'STRING_VALUE',
            PhoneNumber: '',
            Subject: 'STRING_VALUE',
            TargetArn: 'STRING_VALUE',
            TopicArn: TopicArn
        };
        sns.publish(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });

        res.send('HELLO');
    })

    //keep at bottom
    app.use((req, res, next) => {
        var err = new Error(`Not Found at ${req.url}`);
        err.status = 404;
        next(err);
    });
}

// const params = {
//     AWSAccountId: [ /* required */
//         account,
//         /* more items */
//     ],
//     ActionName: [ /* required */
//         'sns:Publish',
//         /* more items */
//     ],
//     Label: 'STRING_VALUE',
//     /* required */
//     TopicArn: TopicArn /* required */
// };
// sns.addPermission(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data); // successful response
// });