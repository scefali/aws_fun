const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const app = express();
module.exports = app;


const router = express.Router();
app.use(express.static(path.join(__dirname, '../static')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(router);
app.use(awsServerlessExpressMiddleware.eventContext())

require('./routes')(router);