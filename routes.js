const path = require('path');
const express = require('express');




module.exports = app => {
    //TODO: Use static path instead of html markup
    //app.use('/', express.static(path.join(__dirname, 'src')));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'index.html'))
    });

}