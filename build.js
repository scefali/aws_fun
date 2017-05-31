const AWS = require('aws-sdk');



const account = process.env.AWS_ACCOUNT_ID;
const service = 's3-us-west-1';
const bucket = 'test-bucket-steve';
const region = 'us-west-1';



const s3Options = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region
}

const s3 = new AWS.S3(s3Options);

//console.log('s3', s3);

var putObjectParams = {
    Body: 'test',
    Bucket: bucket,
    Key: "exampleobject",
    ServerSideEncryption: "AES256",
};
s3.putObject(putObjectParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    /*
    data = {
     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
     ServerSideEncryption: "AES256", 
     VersionId: "Ri.vC6qVlA4dEnjgRV4ZHsHoFIjqEMNt"
    }
    */
});