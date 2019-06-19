const path = require('path')
const express = require('express')
const Sentry = require('@sentry/node')
const ejs = require('ejs');

const topics = require('./topics')
const subscriptions = require('./subscriptions')
const messages = require('./messages')



Sentry.init({ dsn: process.env.SENTRY_DSN });


const staticPage = (req, res) => {
    const indexPath = path.join(__dirname, '../../public/index.html')
    // res.sendFile(indexPath)
    res.render(indexPath, {sentryDsn: process.env.SENTRY_DSN})
}


module.exports = app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://www.awsfun.click")
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })


    app.use('/topics', topics)
    app.use('/subscriptions', subscriptions)
    app.use('/messages', messages)

    //FIXME: Use local server to delver HTML and assets
    app.get('/', staticPage)
    app.use('/dist', express.static('dist'))
    app.use('/public', express.static('public'))


    app.use(Sentry.Handlers.errorHandler());

    // Optional fallthrough error handler
    app.use(function onError(err, req, res, next) {
        console.error('error', err)
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(res.sentry + "\n");
    });


    //keep at bottom
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        var err = new Error(`Not Found at ${req.url}`)
        err.status = 404
        next(err)
    })
}