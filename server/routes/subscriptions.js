const path = require('path')
const express = require('express')

const sns = require('./../sns')
const utils = require('./../utils')



const subscribeEmail = (req, res) => {
    const TopicArn = utils.getTopicArn(req.body.topicName)

    const params = {
        Protocol: 'email',
        /* required */
        TopicArn,
        /* required */
        Endpoint: req.body.email
    };
    sns.subscribe(params, function(err, data) {
        if (err) {
            if (err.message === 'Topic does not exist') {
                err = err.message
            }
            console.log('subscribe err', err); // an error occurred
            res.status(500).send(err)
        } else {
            console.log(data); // successful response
            res.send(data)
        }
    });
}

const unsubscribeEmail = (req, res) => {
    const TopicArn = utils.getTopicArn(req.query.topicName)

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



const router = new express.Router();
router.post('', subscribeEmail);
router.delete('', unsubscribeEmail);



module.exports = router;