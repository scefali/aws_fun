const path = require('path')
const express = require('express')

const utils = require('./../utils')
const topics = require('./topics')
const subscriptions = require('./subscriptions')
const messages = require('./messages')


const staticPage = (req, res) => {
    const indexPath = path.join(__dirname, '../../dist/index.html')
    res.sendFile(indexPath)
}


module.exports = app => {
    app.use((req, res, next) => {
        //console.log('got request in default handler', req)
        //res.header("Access-Control-Allow-Origin", "https://s3-us-west-1.amazonaws.com,http://awsfun.click")
        res.header("Access-Control-Allow-Origin", "*")
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })

    app.get('/', staticPage)

    app.use('/topics', topics)
    app.use('/subscriptions', subscriptions)
    app.use('/messages', messages)

    app.use('/dist', express.static('dist'))


    //keep at bottom
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        var err = new Error(`Not Found at ${req.url}`)
        err.status = 404
        next(err)
    })
}