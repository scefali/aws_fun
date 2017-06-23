const path = require('path')
const express = require('express')

const utils = require('./../utils')
const topics = require('./topics')
const subscriptions = require('./subscriptions')


const staticPage = (req, res) => {
    const indexPath = path.join(__dirname, '../static/index.html')
    console.log('path', indexPath)
    res.sendFile(indexPath)
}


module.exports = app => {
    app.use((req, res, next) => {
        //console.log('got request in default handler', req)
        res.header("Access-Control-Allow-Origin", "https://s3-us-west-1.amazonaws.com")
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })

    app.get('/*', staticPage)

    app.post('/sendMessage', (req, res) => {
        utils.sendMessage(req, res)
    })

    app.use('/topics', topics)
    app.use('/subscriptions', subscriptions)

    //keep at bottom
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        var err = new Error(`Not Found at ${req.url}`)
        err.status = 404
        next(err)
    })
}