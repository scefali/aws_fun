const path = require('path');
const express = require('express');
const utils = require('./utils');


const staticPage = (req, res) => {
    res.sendFile(path.join(__dirname, './../static/index.html'));
}


module.exports = app => {
    app.use((req, res, next) => {
        //console.log('got request in default handler', req)
        res.header("Access-Control-Allow-Origin", "https://s3-us-west-1.amazonaws.com");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    app.use('/static', express.static(__dirname + '../static'));

    //TODO: Use static path instead of html markup
    //app.use('/', express.static(path.join(__dirname, 'src')));
    app.get('/*', staticPage)

    app.post('/subscribeEmail', (req, res) => {
        utils.subscribeEmail(req, res);
    })

    app.post('/unsubscribeEmail', (req, res) => {
        utils.unsubscribeEmail(req, res);
    })

    app.post('/sendMessage', (req, res) => {
        utils.sendMessage(req, res);
    })

    //keep at bottom
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        var err = new Error(`Not Found at ${req.url}`);
        err.status = 404;
        next(err);
    });
}