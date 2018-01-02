const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const app = express();
module.exports = app;


const router = express.Router();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(awsServerlessExpressMiddleware.eventContext())

require('./routes/routes')(router);