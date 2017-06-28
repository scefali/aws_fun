const path = require('path')
const express = require('express')

const sns = require('./../sns')
const utils = require('./../utils')






const sendMessage = (req, res) => {
    const TopicArn = utils.getTopicArn(req.body.topicName)

    const params = {
        Message: req.body.message,
        Subject: req.body.subject,
        TopicArn
    }
    console.log('received message', params)
    sns.publish(params, function(err, data) {
        if (err) {
            if (err.message === 'Topic does not exist') {
                err = err.message
            }
            console.log('send message err', err) // an error occurred
            res.status(500).send(err)
        } else {
            console.log(data) // successful response
            res.send(data)
        }
    })
}



const router = new express.Router()
router.post('', sendMessage)


module.exports = router