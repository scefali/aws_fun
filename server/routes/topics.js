const path = require('path')
const express = require('express')
const sns = require('./../sns')

console.log('sns', sns)



const account = process.env.AWS_ACCOUNT_ID
const getTopicArn = topicName => {
    return `arn:aws:sns:us-west-1:${account}:${topicName}`;
}


const createTopic = (req, res) => {
    const topicParams = { Name: req.body.topicName }
    console.log('createTopic', topicParams)
    sns.createTopic(topicParams, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            res.status(500).send(err)
        } else {
            console.log(data); // successful response
            res.send(data)
        }
    });
}

const deleteTopic = (req, res) => {
    const topicParams = { TopicArn: getTopicArn(req.query.topicName) }
    console.log('delete', topicParams)
    sns.deleteTopic(topicParams, function(err, data) {
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
router.post('', createTopic);
router.delete('', deleteTopic);



module.exports = router;