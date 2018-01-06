# aws_fun
A React Redux and NodeJS web app to create, subscribe, and post to AWS SNS topics
Deployment via server-less architecture using Lambda, S3, and Route 53 on AWS
Locally uses a traditional express archicture

## Run Locally
run "npm install"
set AWS_ACCOUNT_ID to your ID
run "npm run watch" at root level to run Webpack
run "npm start" to start Express server

## Deploy to AWS
The config is set up for the owner's AWS. If you want to deploy it yourself, you will need to delete the claudia.json, run Claudia start, and update the bash scripts and server CORS to point to your own S3 bucket