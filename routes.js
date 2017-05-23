const path = require('path');
const express = require('express');




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
        res.send('HELLO');
    })

    //keep at bottom
    app.use((req, res, next) => {
        var err = new Error(`Not Found at ${req.url}`);
        err.status = 404;
        next(err);
    });
}