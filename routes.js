const path = require('path');
const express = require('express');
const utils = require('./utils');





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

    app.post('/subscribeEmail', (req, res) => {
        utils.subscribeEmail(req, res);
        res.send('HELLO');
    })

    app.post('/sendEmail', (req, res) => {
        utils.sendEmail(req, res);
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