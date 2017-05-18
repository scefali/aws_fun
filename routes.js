const path = require('path');
const express = require('express');




module.exports = app => {
    //app.use('/static', express.static(__dirname + '/static'));

    //TODO: Use static path instead of html markup
    //app.use('/', express.static(path.join(__dirname, 'src')));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'index.html'))
    });

}