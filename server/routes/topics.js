const path = require('path')
const express = require('express')

const sns = require('./../sns')
const utils = require('./../utils')


const createTopic = (req, res) => {
    const Name = req.body.topicName;
    if (Name.startsWith('bad')) {
        throw new Error(`Using ${Name} topic name`)
    }
    const topicParams = { Name }
    sns.createTopic(topicParams, function (err, data) {
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
    const topicParams = { TopicArn: utils.getTopicArn(req.query.topicName) }
    sns.deleteTopic(topicParams, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            res.status(500).send(err)
        } else {
            console.log(data); // successful response
            res.send(data)
        }
    });
}


const getTopics = (req, res) => {
    sns.listTopics({}, function (err, data) {
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
router.get('', getTopics);



module.exports = router;